import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {deviceWidth} from "../../../utils/device";
import {BLACK, FPT_ORANGE_COLOR, WHITE} from "@app/constants";
import {InformationCircleIcon, LibraryIcon} from "react-native-heroicons/outline";
import {ChoosingBookingRoom} from "../../../redux/models/choosing-booking-room.model";
import {useAppNavigation} from "../../../hooks/use-app-navigation.hook";

interface ChooseRoomItemProps {
  item: ChoosingBookingRoom;
  roomId: string;
  setRoomId(val: string): void;
}
const ChooseRoomItem: React.FC<ChooseRoomItemProps> = (props) => {

  const navigate = useAppNavigation();

  console.log(props.roomId === props.item.id);

  const handleViewRoomDetail = (id: string) => {
    navigate.pop();
  }

  return (
    <TouchableOpacity
      onPress={() => props.setRoomId(props.item.id)}
      style={[styles.container, (props.roomId === props.item.id) ? {
        borderWidth: 2,
        borderColor: FPT_ORANGE_COLOR
      } : null]}>
      <View style={styles.wrapper}>
        <View style={styles.roomIconContainer}>
          <LibraryIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 18}/>
        </View>
        <View style={styles.roomInfoContainer}>
          <Text style={styles.roomInfoTitle}>
            Room {props.item.name}
          </Text>
          <Text style={styles.roomInfoType}>
            Room type: {props.item.type}
          </Text>
        </View>
      </View>
      <View style={styles.roomActionContainer}>
        <TouchableOpacity
          onPress={() => handleViewRoomDetail(props.item.id)}
          style={styles.roomViewMoreButton}>
          <InformationCircleIcon color={WHITE} size={deviceWidth / 23}/>
          <Text style={styles.roomViewMoreButtonText}>
            View more
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 80,
    width: deviceWidth / 1.05,
    backgroundColor: WHITE,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrapper: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 0.1
  },

  roomIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  roomInfoContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  roomInfoTitle: {
    fontWeight: '600',
    fontSize: deviceWidth / 25,
    color: BLACK
  },
  roomInfoType: {
    color: BLACK,
    fontWeight: '400',
    fontSize: deviceWidth / 30
  },

  roomActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0.1,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  roomViewMoreButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: deviceWidth / 4.2,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8
  },
  roomViewMoreButtonText: {
    fontWeight: '600',
    color: WHITE,
    fontSize: deviceWidth / 30
  }
});
export default ChooseRoomItem;
