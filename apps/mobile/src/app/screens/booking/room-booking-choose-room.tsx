import React, {useEffect, useState} from 'react';
import {ListRenderItemInfo, SafeAreaView, StyleSheet, View, VirtualizedList} from "react-native";
import ChooseRoomBookingHeader from "./ChooseRoom/header";
import ChooseRoomItem from "./ChooseRoom/ChooseRoomItem";
import ChooseRoomBookingFooter from "./ChooseRoom/footer";
import {useAppSelector} from "../../hooks/use-app-selector.hook";
import {useAppDispatch} from "../../hooks/use-app-dispatch.hook";
import {fetchChoosingBookingRoom} from "../../redux/features/room-booking/thunk/fetch-choosing-booking-room.thunk";
import {ChoosingBookingRoom} from "../../redux/models/choosing-booking-room.model";
import {deviceHeight, deviceWidth} from '../../utils/device';

const RoomBookingChooseRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const choosingBookingRooms = useAppSelector((state) => state.roomBooking.choosingBookingRooms);

  const [roomName, setRoomName] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");
  const [sortRoomName, setSortRoomName] = useState<string>("ASC");
  const [sortRoomType, setSortRoomType] = useState<string>("ASC");


  const [roomId, setRoomId] = useState<string>(undefined);

  useEffect(() => {
    dispatch(fetchChoosingBookingRoom({
      roomType: {
        name: roomType,
        sort: sortRoomType
      },
      roomName: {
        name: roomName,
        sort: sortRoomName
      }
    }));
  }, [roomName, roomType, sortRoomName, sortRoomType]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ChooseRoomBookingHeader
            roomName={roomName}
            setRoomName={(val) => setRoomName(val)}
            roomType={roomType}
            setRoomType={(val) => setRoomType(val)}
            sortRoomName={sortRoomName}
            sortRoomType={sortRoomType}
            setSortRoomName={(val) => setSortRoomName(val)}
            setSortRoomType={(val) => setSortRoomType(val)}
          />
          <VirtualizedList
            style={{
              height: deviceHeight / 1.55,
            }}
            data={choosingBookingRooms}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={(item: ListRenderItemInfo<ChoosingBookingRoom>) =>
            <ChooseRoomItem
              roomId={roomId}
              setRoomId={(id) => setRoomId(id)}
              item={item.item}/>
          }/>
        </View>
        <ChooseRoomBookingFooter
          roomId={roomId}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    flexGrow: 1,
    flex: 1
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',

  },

});

export default RoomBookingChooseRoom;
