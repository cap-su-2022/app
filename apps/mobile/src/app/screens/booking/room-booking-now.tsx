import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {HeartIcon, LibraryIcon, TicketIcon} from "react-native-heroicons/outline";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, PINK, WHITE } from "@app/constants";
import { fetchAllBookingRooms } from "../../redux/features/room-booking/thunk/fetch-all";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTimeDetailBySlotNumber } from "../../utils/slot-resolver.util";
import { deviceWidth } from "../../utils/device";
import { SearchIcon, SortAscendingIcon } from "react-native-heroicons/solid";
import { addToRoomBookingWishlist } from "../../redux/features/room-booking/thunk/add-to-wishlist.thunk";

const RoomBookingNow: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const bookingRooms = useAppSelector(state => state.roomBooking.bookingRooms);

  const dispatch = useAppDispatch();

  const [searchRoomName, setSearchRoomName] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllBookingRooms()).unwrap().then((e) => {

    }).catch((e) => {
      console.log("dead");
      console.log(e);
    });
  }, []);

  const handleAddToWishlist = (roomId, slot) => {
    dispatch(addToRoomBookingWishlist({roomId, slot})).unwrap().then(() => alert("success"));
  };

  const handleBookRoom = (roomId, slot) => {
    setTimeout(() => {
      navigate.navigate("ROOM_BOOKING_2");
    }, 0);
  }

  const Filtering: React.FC = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeaderText}>
          FILTERING
        </Text>
        <View style={styles.filterBodyContainer}>
          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <SearchIcon color={BLACK}/>
            </View>
            <View style={styles.filterInput}>
              <TextInput value={searchRoomName}
                         onChangeText={(text) => setSearchRoomName(text)}
                         placeholder="Search by room name"/>
            </View>
          </View>
          <TouchableOpacity
            style={styles.filterSortButton}>
            <SortAscendingIcon color={BLACK}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{
      flex: 1,

    }}>
    <Filtering/>
      <ScrollView style={{flex: 1}}>
        {bookingRooms?.map((bookingRoom) =>
          <View style={styles.roomBookingItemContainer}>
            <View style={styles.roomBookingItem}>
              <View style={styles.libraryIconContainer}>
                <LibraryIcon color={FPT_ORANGE_COLOR}/>
              </View>
              <View style={styles.roomBookingDetail}>
                <Text style={styles.roomText}>
                  Library Room
                </Text>
                <Text style={styles.roomCodeOuterText}>
                  Room Code: {bookingRoom.roomName}
                </Text>
                <Text style={{
                  fontSize: 18
                }}>Time:
                  <Text style={{
                    fontWeight: '600'
                  }}> Slot {bookingRoom.slot} ({getTimeDetailBySlotNumber(bookingRoom.slot).startTime} - {getTimeDetailBySlotNumber(bookingRoom.slot).endTime})
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.roomBookActionContainer}>
              <TouchableOpacity
                onPress={() => handleAddToWishlist(bookingRoom.roomId, bookingRoom.slot)}
                style={styles.addToWishListContainer}>
                <View style={styles.addToWishListButtonContainer}>
                  <HeartIcon color={PINK}/><
                  Text style={styles.addToWishListButtonText}>
                  Add to wish list
                </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleBookRoom(bookingRoom.roomId, bookingRoom.slot)}
                style={styles.bookNowContainer}>
                <View style={styles.bookNowButtonContainer}>
                  <TicketIcon color={WHITE}/>
                  <Text style={styles.bookNowButtonText}>
                    Book this room now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-around'
  },
  filterInputContainer: {
    display: 'flex',
    flexDirection: 'row'
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
    width: deviceWidth / 1.6,
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
    flexDirection: 'row'
  },
  roomBookingItemContainer: {
    borderRadius: 8,
    backgroundColor: WHITE,
    margin: 10,
    height: 235
  },
  roomBookingDetail: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
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
    marginTop: 10
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
    borderColor: PINK
  },
  addToWishListButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    flexDirection: 'row'
  },
  bookNowButtonText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '600',
    color: WHITE
  },
  roomText: {
    fontSize: 20,
    fontWeight: '600',
    color: BLACK
  },
  roomCodeOuterText: {
    fontSize: 18
  },
  roomCodeInnerText: {
    marginLeft: 5,
    fontWeight: '600'
  }
});

export default RoomBookingNow;
