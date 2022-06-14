import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllWishlistRooms } from "../../redux/features/room-booking/thunk/fetch-all-wishlist.thunk";
import { SearchIcon, SortAscendingIcon } from "react-native-heroicons/solid";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, RED, WHITE } from "@app/constants";
import { deviceWidth } from "../../utils/device";
import { RoomWishListResponse } from "../../redux/models/wishlist-booking-room.model";
import { LibraryIcon, TicketIcon, XIcon } from "react-native-heroicons/outline";
import { getTimeDetailBySlotNumber } from "../../utils/slot-resolver.util";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RoomBookingWishlistProps {

}

const RoomBookingWishlist: React.FC<RoomBookingWishlistProps> = () => {

  const wishlistBookingRooms = useAppSelector((state) => state.roomBooking.wishlistBookingRooms);
  const dispatch = useAppDispatch();

  const [searchRoomName, setSearchRoomName] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllWishlistRooms(searchRoomName));
    }, 400);
  }, [searchRoomName]);

  const RoomWishlistItem: React.FC<RoomWishListResponse> = (item) => {
    const duration = getTimeDetailBySlotNumber(item.slot);
    return (
      <View style={styles.roomWishlistContainer}>
        <View style={styles.libraryHeaderContainer}>
          <View style={styles.roomLibraryIconContainer}>
            <LibraryIcon color={FPT_ORANGE_COLOR}/>
          </View>
          <View style={styles.libraryInfoContainer}>
            <Text style={styles.libraryRoomText}>Library Room</Text>
            <Text style={{ fontSize: deviceWidth / 25, }}>Room Code: {item.roomname}</Text>
            <Text style={{ fontSize: deviceWidth / 25, }}>Time: Slot {item.slot} ({duration.startTime} - {duration.endTime})</Text>
          </View>
        </View>
        <View style={styles.roomWishlistButtonContainer}>
          <TouchableOpacity style={styles.removeFromWishlistButton}>
            <XIcon color={RED} size={deviceWidth / 15}/>
            <Text style={styles.removeFromWishlistButtonText}>
              Remove from wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookThisRoomButtonContainer}>
            <TicketIcon color={WHITE} size={deviceWidth / 15}/>
            <Text style={styles.bookThisRoomButtonText}>
            Book this room now
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );

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
              <SearchIcon color={BLACK}/>
            </View>
            <View style={styles.filterInput}>
              <TextInput value={searchRoomName}
                         onChangeText={(text) => setSearchRoomName(text)}
                         placeholder="Search by room name"/>
            </View>
          </View>
          <TouchableOpacity style={styles.filterSortButton}>
            <SortAscendingIcon color={BLACK}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <Filtering/>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <VirtualizedList
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          data={wishlistBookingRooms}
          renderItem={({ item }: {item: RoomWishListResponse}) => <RoomWishlistItem roomname={item.roomname}
                                     id={item.id}
                                     slot={item.slot}
                                     roomid={item.roomid}
                                     stt={item.stt}/>
          }/>
      </View>
    </SafeAreaView>
  );

}

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
  roomWishlistContainer: {
    backgroundColor: WHITE,
    width: deviceWidth / 1.05,
    height: 220,
    borderRadius: 8,
  },
  roomLibraryIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  libraryRoomText: {
    color: BLACK,
    fontSize: deviceWidth / 22,
    fontWeight: '600'
  },
  roomWishlistButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1
  },
  bookThisRoomButtonContainer: {
    backgroundColor: FPT_ORANGE_COLOR,
    height: 50,
    borderRadius: 8,
    width: deviceWidth / 1.6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  bookThisRoomButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 20,
    fontWeight: '600'
  },
  libraryInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  },
  libraryHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },
  removeFromWishlistButton: {
    borderWidth: 2,
    borderColor: RED,
    borderRadius: 8,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: deviceWidth / 1.6,
  },
  removeFromWishlistButtonText: {
    color: RED,
    fontSize: deviceWidth / 20,
    fontWeight: '600'
  }
});

export default RoomBookingWishlist;
