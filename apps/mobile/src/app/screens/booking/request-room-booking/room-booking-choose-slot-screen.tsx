import React, { useEffect, useState } from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import {
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import {
  HeartIcon,
  LibraryIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  PINK,
  WHITE,
} from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import { addToRoomBookingWishlist } from '../../../redux/features/room-booking/thunk/add-to-wishlist.thunk';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import { step1ScheduleRoomBooking } from '../../../redux/features/room-booking/slice';
import { fetchBookedRequestByDayAndSlot } from '../../../redux/features/room-booking-v2/thunk/fetch-booked-request.thunk';
import { fetchAllRooms } from '../../../redux/features/room/thunk/fetch-all';
import { LOCAL_STORAGE } from '../../../utils/local-storage';
import { BookedRequest } from '../../../redux/models/booked-request.model';
import { RoomModel } from '../../../redux/models/room.model';
import ChooseSlotHeader from './choose-slot/header';
import ChooseSlotItem from './choose-slot/item';

const transformToData = (bookedRequest) => {
  const result = [];
  for (let i = 0; i < bookedRequest.length; i++) {
    const data = bookedRequest[i];
    for (let j = data.slotStart; j <= data.slotEnd; j++) {
      result.push({
        roomName: data.roomName,
        roomId: data.id,
        slot: j,
      });
    }
  }
  return result;
};

const filterBookingRoom = (bookedData, slotsFromState, roomsFromState) => {
  const result = [];

  for (let i = 0; i < slotsFromState.length; i++) {
    for (let j = 0; j < roomsFromState.length; j++) {
      if (
        bookedData.some(
          (data) =>
            data.slot !== slotsFromState[i] &&
            data.roomName !== roomsFromState[j].name
        )
      ) {
        result.push({
          roomName: roomsFromState[j].name,
          roomId: roomsFromState[j].id,
          slotId: slotsFromState[i].id,
          slotName: slotsFromState[i].name,
        });
      }
    }
  }
  return result;
};

const filterBookingRoomElse = (slotsFromState, roomsFromState) => {
  const result = [];
  for (let i = 0; i < roomsFromState.length; i++) {
    for (let j = 0; j < slotsFromState.length; j++) {
      result.push({
        roomName: roomsFromState[i].name,
        roomId: roomsFromState[i].id,
        slotId: slotsFromState[j].id,
        slotName: slotsFromState[j].name,
      });
    }
  }
  return result;
};
const addRecentlySearchRoom = (item, username, selectedDay) => {
  const historySearch = LOCAL_STORAGE.getString(username);
  const historyArray = historySearch.split(',');
  historyArray.push(
    JSON.stringify({
      fromDay: selectedDay,
      roomName: item.roomName,
      roomId: item.roomId,
      slotId: item.slotId,
      slotName: item.slotName,
    })
  );
  LOCAL_STORAGE.set(username, historyArray.toString());
};

const firstAddRoomRecentlySearch = (item, username, selectedDay) => {
  LOCAL_STORAGE.set(
    username,
    JSON.stringify({
      fromDay: selectedDay,
      roomName: item.roomName,
      slotName: item.slotName,
      roomId: item.roomId,
      slotId: item.slotId,
    })
  );
};

const RoomBookingChooseSlotScreen: React.FC<any> = (props) => {
  const fromSlotId = useAppSelector(
    (state) => state.roomBooking.addRoomBooking.fromSlot
  );
  const addRoomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );

  const [filteredRoomId, setFilteredRoomId] = useState<string>();

  const slotsFromState = useAppSelector((state) => state.slot.slots);
  const roomsFromState = useAppSelector((state) => state.room.rooms);
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();
  const Today = new Date().toJSON().slice(0, 10);

  const [selectedDay, setSelectedDay] = useState(
    addRoomBooking.fromDay || Today
  );
  const [isModalOpened, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [slotAndRoom, setSlotAndRoom] = useState([]);
  const [slotAndRoomFilter, setSlotAndRoomFilter] = useState([]);

  const handleTransformBookingRoomData = (
    bookingRooms: BookedRequest[],
    rooms: RoomModel[]
  ) => {
    const bookedData = transformToData(bookingRooms);

    let result;
    if (bookingRooms.length > 1) {
      result = filterBookingRoom(bookedData, slotsFromState, rooms);
    } else {
      result = filterBookingRoomElse(slotsFromState, rooms);
    }

    setSlotAndRoom(result);
  };

  const handleFetchAllRooms = (bookedRequests) => {
    dispatch(fetchAllRooms())
      .unwrap()
      .then((rooms) => handleTransformBookingRoomData(bookedRequests, rooms));
  };

  useEffect(() => {
    dispatch(
      fetchBookedRequestByDayAndSlot({
        checkoutSlotId: addRoomBooking.toSlot || addRoomBooking.fromSlot,
        date: Today,
        checkinSlotId: addRoomBooking.fromSlot,
      })
    )
      .unwrap()
      .then((val) => handleFetchAllRooms(val));
  }, [selectedDay]);

  const handleAddToWishlist = (roomId, slotId) => {
    dispatch(addToRoomBookingWishlist({ roomId, slotId }))
      .unwrap()
      .then(() => alert('success'))
      .catch((e) => {
        setErrorMessage(e.message.message);
        setModalOpen(true);
      });
  };

  const handleAddRoomRecentlySearch = (item) => {
    const user = LOCAL_STORAGE.getString('user');
    const username = JSON.parse(user).username;
    const historySearch = LOCAL_STORAGE.getString(JSON.parse(user).username);
    return typeof historySearch !== 'undefined'
      ? addRecentlySearchRoom(item, username, selectedDay)
      : firstAddRoomRecentlySearch(item, username, selectedDay);
  };

  const handleBookRoom = (item) => {
    handleAddRoomRecentlySearch(item);
    dispatch(
      step1ScheduleRoomBooking({
        fromSlot: item.slotId,
        fromDay: selectedDay,
        roomId: item.roomId,
        roomName: item.roomName,
      })
    );
    setTimeout(() => {
      navigate.navigate('ROOM_BOOKING_2');
    }, 0);
  };

  useEffect(() => {
    dispatch(
      fetchBookedRequestByDayAndSlot({
        checkoutSlotId: addRoomBooking.toSlot || addRoomBooking.fromSlot,
        date: Today,
        checkinSlotId: addRoomBooking.fromSlot,
      })
    )
      .unwrap()
      .then((val) => {
        handleFetchAllRooms(val);
        const filterArrayByRoom = slotAndRoom.filter(
          (room) => room.roomId === filteredRoomId
        );
        setSlotAndRoomFilter(filterArrayByRoom);
      });
  }, [filteredRoomId]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexGrow: 1,
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <>
          <ChooseSlotHeader
            filteredRoomId={filteredRoomId}
            handleSetFilterRoomId={(val) => setFilteredRoomId(val)}
            handleClear={() => setSlotAndRoomFilter([])}
            currentDate={selectedDay || addRoomBooking.fromDay || Today}
            minDate={addRoomBooking.fromDay || Today}
            maxDate={addRoomBooking.toDay}
            handleOnDayPress={(val) => setSelectedDay(val)}
          />

          <VirtualizedList
            style={{ flex: 1 }}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            data={
              slotAndRoomFilter.length === 0 ? slotAndRoom : slotAndRoomFilter
            }
            renderItem={(item: ListRenderItemInfo<any>) => (
              <ChooseSlotItem
                handleAddWishlist={() =>
                  handleAddToWishlist(item.item.roomId, item.item.slotId)
                }
                handleRequestRoomBooking={() => handleBookRoom(item.item)}
                key={item.index}
                item={item.item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
        <View
          style={{
            height: 80,
            backgroundColor: WHITE,
            borderTopWidth: 1,
            borderTopColor: INPUT_GRAY_COLOR,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigate.pop()}
            style={{
              borderRadius: 8,
              backgroundColor: FPT_ORANGE_COLOR,
              height: 50,
              width: deviceWidth / 1.35,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: WHITE,
                fontSize: deviceWidth / 19,
                fontWeight: '600',
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slotRoomContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: WHITE,
    height: 100,
    borderRadius: 8,
  },
  filterHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 10,
  },
  filterBodyContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterInputIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: LIGHT_GRAY,
  },
  filterInput: {
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
    width: deviceWidth / 4,
  },
  filterSortButton: {
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomBookingItem: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  roomBookingItemContainer: {
    borderRadius: 8,
    backgroundColor: WHITE,
    margin: 10,
    height: 235,
  },
  roomBookingDetail: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  libraryIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: FPT_ORANGE_COLOR,
    marginRight: 10,
    marginTop: 10,
  },
  roomBookActionContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToWishListContainer: {
    width: 250,
    height: 50,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PINK,
  },
  addToWishListButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToWishListButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: PINK,
    marginLeft: 5,
  },
  bookNowContainer: {
    marginTop: 10,
    width: 250,
    height: 50,
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookNowButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bookNowButtonText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '600',
    color: WHITE,
  },
  roomText: {
    fontSize: 20,
    fontWeight: '600',
    color: BLACK,
  },
  roomCodeOuterText: {
    fontSize: 18,
  },
  roomCodeInnerText: {
    marginLeft: 5,
    fontWeight: '600',
  },
});

export default RoomBookingChooseSlotScreen;
