import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ClockIcon, ExclamationCircleIcon,
  ExclamationIcon,
  HeartIcon,
  LibraryIcon,
  SortDescendingIcon,
  TicketIcon
} from "react-native-heroicons/outline";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, PINK, WHITE } from "@app/constants";
import { fetchAllBookingRooms } from "../../redux/features/room-booking/thunk/fetch-all";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTimeDetailBySlotNumber } from "../../utils/slot-resolver.util";
import { deviceWidth } from "../../utils/device";
import { SearchIcon, SortAscendingIcon } from "react-native-heroicons/solid";
import { addToRoomBookingWishlist } from "../../redux/features/room-booking/thunk/add-to-wishlist.thunk";
import RNPickerSelect from "react-native-picker-select";
import { BookingRoom } from "../../redux/models/booking-room.model";
import AlertModal from "../../components/modals/alert-modal.component";
import { useFormik } from "formik";
import DelayInput from "react-native-debounce-input";
import Empty from "../../components/empty.svg";


const slots = [
  {
    label: "Slot 1",
    value: 1
  },
  {
    label: "Slot 2",
    value: 2
  },
  {
    label: "Slot 3",
    value: 3
  },
  {
    label: "Slot 4",
    value: 4
  },
  {
    label: "Slot 5",
    value: 5
  },
  {
    label: "Slot 6",
    value: 6
  }
];

const RoomBookingNow: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const bookingRooms = useAppSelector(state => state.roomBooking.bookingRooms);

  const dispatch = useAppDispatch();

  const [searchRoomName, setSearchRoomName] = useState<string>("");
  const [sorting, setSorting] = useState<string>("ASC");
  const [slot, setSlot] = useState<number>(1);
  const [isModalOpened, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");


  useEffect(() => {
    dispatch(fetchAllBookingRooms({
      sorting: sorting,
      search: searchRoomName,
      slot: slot
    }))
      .unwrap().then((e) => {
      console.log(e);
    }).catch((e) => {
      setErrorMessage(e.message.message);
      setModalOpen(true);
    });
  }, [sorting, searchRoomName, slot, dispatch]);

  const handleAddToWishlist = (roomId, slot) => {
    dispatch(addToRoomBookingWishlist({ roomId, slot }))
      .unwrap().then(() => alert("success"))
      .catch((e) => {
        setErrorMessage(e.message.message);
        setModalOpen(true);

      });
  };
  const handler = useCallback((value) => {
    setTimeout(() => {
      setSearchRoomName(value);
    }, 400);
  }, []);

  const handleBookRoom = (roomId, slot) => {
    setTimeout(() => {
      navigate.navigate("ROOM_BOOKING_2");
    }, 0);
  };

  const Filtering: React.FC = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeaderText}>
          FILTERING
        </Text>
        <View style={styles.filterBodyContainer}>

          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <SearchIcon color={BLACK} />
            </View>
            <View style={styles.filterInput}>
              <DelayInput value={searchRoomName}
                          onChangeText={(value) => handler(value)}
                          placeholder="ex: LB12" />
            </View>

          </View>

          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <ClockIcon color={BLACK} />
            </View>
            <View style={styles.filterInput}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                value={slot}
                onValueChange={(value) => setSlot(value)}
                items={slots} />
            </View>
          </View>


          {sorting === "ASC"
            ? <TouchableOpacity
              onPress={() => setSorting("DESC")}
              style={styles.filterSortButton}>
              <SortAscendingIcon color={BLACK} />
            </TouchableOpacity>
            : <TouchableOpacity
              onPress={() => setSorting("ASC")}
              style={styles.filterSortButton}>
              <SortDescendingIcon color={BLACK} />
            </TouchableOpacity>}
        </View>
        <MessageModal message={errorMessage} />
      </View>
    );
  };

  const MessageModal: React.FC<{ message: string }> = (props) => {
    return (
      <AlertModal
        isOpened={isModalOpened}
        toggleShown={() => setModalOpen(false)}
        height={deviceWidth / 1.5}
        width={deviceWidth / 1.3}
      >
        <View style={messageModalStyles.container}>
          <View style={messageModalStyles.textWrapper}>
            <ExclamationCircleIcon size={deviceWidth / 8.5}
                                   color={FPT_ORANGE_COLOR} />
            <View style={messageModalStyles.textBody}>
              <Text style={messageModalStyles.textContent}>
                Failed to add to wishlist
              </Text>
              <Text style={messageModalStyles.textContent}>
                {props.message}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalOpen(false)}
                            style={messageModalStyles.closeButton}>
            <Text style={messageModalStyles.closeButtonText}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </AlertModal>
    );
  };

  const BookingRoomRender = ({ item }: { item: BookingRoom }) => {
    const startTime = getTimeDetailBySlotNumber(item.slot).startTime;
    const endTime = getTimeDetailBySlotNumber(item.slot).endTime;
    return (
      <View key={item.stt} style={styles.roomBookingItemContainer}>
        <View style={styles.roomBookingItem}>
          <View style={styles.libraryIconContainer}>
            <LibraryIcon color={FPT_ORANGE_COLOR} />
          </View>
          <View style={styles.roomBookingDetail}>
            <Text style={styles.roomText}>
              Library Room
            </Text>
            <Text style={styles.roomCodeOuterText}>
              Room Code: {item.roomName}
            </Text>
            <Text style={{
              fontSize: 18
            }}>Time:
              <Text style={{
                fontWeight: "600"
              }}> Slot {item.slot} ({startTime} - {endTime})
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.roomBookActionContainer}>
          <TouchableOpacity
            onPress={() => handleAddToWishlist(item.roomId, item.slot)}
            style={styles.addToWishListContainer}>
            <View style={styles.addToWishListButtonContainer}>
              <HeartIcon color={PINK} /><
              Text style={styles.addToWishListButtonText}>
              Add to wish list
            </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleBookRoom(item.roomId, item.slot)}
            style={styles.bookNowContainer}>
            <View style={styles.bookNowButtonContainer}>
              <TicketIcon color={WHITE} />
              <Text style={styles.bookNowButtonText}>
                Book this room now
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1

    }}>
      <Filtering />
      <VirtualizedList
        data={bookingRooms}
        keyExtractor={(data, index) => String(data.stt)}
        getItemCount={() => bookingRooms.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }: { item: BookingRoom }) => <BookingRoomRender item={item} />} />

    </SafeAreaView>
  );
};

const messageModalStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  textBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textContent: {
    fontSize: deviceWidth / 23,
    color: BLACK,
    fontWeight: "600"
  },
  closeButton: {
    height: 50,
    width: deviceWidth / 1.5,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButtonText: {
    color: WHITE,
    fontWeight: "600",
    fontSize: deviceWidth / 23
  }
});

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    backgroundColor: WHITE,
    height: 100,
    borderRadius: 8
  },
  filterHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 25,
    fontWeight: "600",
    marginTop: 5,
    marginLeft: 10
  },
  filterBodyContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  filterInputContainer: {
    display: "flex",
    flexDirection: "row"
  },
  filterInputIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: LIGHT_GRAY
  },
  filterInput: {
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
    width: deviceWidth / 4
  },
  filterSortButton: {
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  roomBookingItem: {
    margin: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  roomBookingItemContainer: {
    borderRadius: 8,
    backgroundColor: WHITE,
    margin: 10,
    height: 235
  },
  roomBookingDetail: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  libraryIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: FPT_ORANGE_COLOR,
    marginRight: 10,
    marginTop: 10
  },
  roomBookActionContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  addToWishListContainer: {
    width: 250,
    height: 50,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: PINK
  },
  addToWishListButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  addToWishListButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: PINK,
    marginLeft: 5
  },
  bookNowContainer: {
    marginTop: 10,
    width: 250,
    height: 50,
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bookNowButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  bookNowButtonText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "600",
    color: WHITE
  },
  roomText: {
    fontSize: 20,
    fontWeight: "600",
    color: BLACK
  },
  roomCodeOuterText: {
    fontSize: 18
  },
  roomCodeInnerText: {
    marginLeft: 5,
    fontWeight: "600"
  }
});

export default RoomBookingNow;
