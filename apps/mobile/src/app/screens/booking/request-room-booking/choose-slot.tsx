import React, { useEffect, useState } from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import { BookingRoom } from '../../../redux/models/booking-room.model';
import { getTimeDetailBySlotNumber } from '../../../utils/slot-resolver.util';
import {
  HeartIcon,
  LibraryIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
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

const ChooseSlot: React.FC<any> = (props) => {
  const fromSlotId = useAppSelector(
    (state) => state.roomBooking.addRoomBooking.fromSlot
  );
  const addRoomBooking = useAppSelector(
    (state) => state.roomBooking.addRoomBooking
  );
  const bookedRequest = useAppSelector(
    (state) => state.bookedRequest.bookedRequests
  );
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
  const [slotAndRoom, setSlotAndRoom] = useState([])



  useEffect(() => {
    dispatch(
      fetchBookedRequestByDayAndSlot({
        checkoutSlotId: addRoomBooking.toSlot,
        date: Today,
        checkinSlotId: addRoomBooking.fromSlot,
      })
    )
      .unwrap()
      .then((val) => {
        console.log('1');
      });
    dispatch(fetchAllRooms())
      .unwrap()
      .then((val) => {
        console.log('2');
      }).then(() => {
      const transformToData = () => {
        const result = [];
        for (let i = 0; i < bookedRequest.length; i++) {
          const data = bookedRequest[i];
          for (let j = data.slotStart; j <= data.slotEnd; j++) {
            result.push({ roomName: data.roomName, roomId: data.id, slot: j });
          }
        }
        return result;
      };

      const bookedData = transformToData();
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
              slotName: slotsFromState[i].name
            });
          }
        }
      }
      setSlotAndRoom(result)
    });

  }, []);


  const handleAddToWishlist = (roomId, slot) => {
    dispatch(addToRoomBookingWishlist({ roomId, slot }))
      .unwrap()
      .then(() => alert('success'))
      .catch((e) => {
        setErrorMessage(e.message.message);
        setModalOpen(true);
      });
  };

  const handleBookRoom = (item) => {
    dispatch(
      step1ScheduleRoomBooking({
        fromSlot: item.slotId,
        fromDay: selectedDay,
        roomId: item.roomID,
        roomName: item.roomName,
      })
    );
    setTimeout(() => {
      navigate.navigate('ROOM_BOOKING_2');
    }, 0);
  };

  const SlotAndRoom = ({ item }) => {
    return (
      <View key={`${item.roomId} ${item.slotId}`} style={styles.roomBookingItemContainer}>
        <View style={styles.roomBookingItem}>
          <View style={styles.libraryIconContainer}>
            <LibraryIcon color={FPT_ORANGE_COLOR} />
          </View>
          <View style={styles.roomBookingDetail}>
            <Text style={styles.roomText}>Library Room</Text>
            <Text style={styles.roomCodeOuterText}>
              Room Code: {item.roomName}
            </Text>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Time:
              <Text
                style={{
                  fontWeight: '600',
                }}
              >
                {item.slotName}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.roomBookActionContainer}>
          <TouchableOpacity
            onPress={() => handleAddToWishlist(item.roomName, item.slot)}
            style={styles.addToWishListContainer}
          >
            <View style={styles.addToWishListButtonContainer}>
              <HeartIcon color={PINK} />
              <Text style={styles.addToWishListButtonText}>
                Add to wish list
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleBookRoom(item);
            }}
            style={styles.bookNowContainer}
          >
            <View style={styles.bookNowButtonContainer}>
              <TicketIcon color={WHITE} />
              <Text style={styles.bookNowButtonText}>Book this room now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const WeekAgendaScreen = () => (
    <CalendarProvider
      date={selectedDay || addRoomBooking.fromDay || Today}
      style={{ marginBottom: -450 }}
    >
      <WeekCalendar
        minDate={addRoomBooking.fromDay || Today}
        maxDate={addRoomBooking.toDay}
        onDayPress={(day) => setSelectedDay(day.dateString)}
        firstDay={1}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
        animateScroll={true}
      />
    </CalendarProvider>
  );


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
        <WeekAgendaScreen />

        <VirtualizedList
          style={{ flex: 1 }}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          data={slotAndRoom}
          renderItem={(item) => (
            <SlotAndRoom key={item.index} item={item.item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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

export default ChooseSlot;
