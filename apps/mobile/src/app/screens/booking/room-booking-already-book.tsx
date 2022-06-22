import React, {useEffect, useState} from "react";
import {
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList
} from "react-native";
import {deviceHeight, deviceWidth} from "../../utils/device";
import { BLACK, FPT_ORANGE_COLOR, GREEN, LIGHT_GRAY, LIME, PINK, RED, TEAL, WHITE } from "@app/constants";
import { useAppDispatch } from "../../hooks/use-app-dispatch.hook";
import { useAppNavigation } from "../../hooks/use-app-navigation.hook";
import DelayInput from "react-native-debounce-input";
import { LibraryIcon, SearchIcon, TagIcon } from "react-native-heroicons/outline";
import {useAppSelector} from "../../hooks/use-app-selector.hook";
import {fetchCurrentBookingRoomList} from "../../redux/features/room-booking/thunk/fetch-current-booking-list.thunk";
import AlreadyBookItem from "./AlreadyBook/AlreadyBookItem";
import {ChoosingBookingRoom} from "../../redux/models/choosing-booking-room.model";
import {CurrentBookingRoom} from "../../redux/models/current-booking-room.model";
import WarningModal from "./AlreadyBook/WarningModal";
import AlreadyBookFilter from "./AlreadyBook/already-book-filter";
/*
*         <Text style={{
          fontWeight: '600',
          fontSize: deviceWidth / 23,
          color: BLACK
        }}>You already booked the the following room(s)</Text>
* */
const RoomBookingAlreadyBook: React.FC = () => {

  const currentBookingRooms = useAppSelector((state) => state.roomBooking.currentBookingRooms);

  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const [isWarningModalShown, setWarningModalShown] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchCurrentBookingRoomList());
  }, []);

  const [search, setSearch] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
          <AlreadyBookFilter
            search={search}
            setSearch={(val) => setSearch(val)}
          />
          <VirtualizedList
            style={{
              marginBottom: 10
            }}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={(item: ListRenderItemInfo<CurrentBookingRoom>) =>
              <AlreadyBookItem item={item.item}/>}
            data={currentBookingRooms}/>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigate.navigate("ROOM_BOOKING_1")}
            style={styles.continueBookingButton}>
            <Text style={styles.continueBookingButtonText}>Continue booking</Text>
          </TouchableOpacity>
        </View>

      </View>
      <WarningModal
        isShown={isWarningModalShown}
        toggleShown={() => setWarningModalShown(!isWarningModalShown)}
        message="You have room(s) are in booking progress! Please review again before booking a new room"
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },

  footerContainer: {
    height: 90,
    backgroundColor: WHITE,
    width: deviceWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  continueBookingButton: {
    height: 50,
    width: deviceWidth / 1.25,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  continueBookingButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 21,
    fontWeight: "600"
  }
});

export default RoomBookingAlreadyBook;
