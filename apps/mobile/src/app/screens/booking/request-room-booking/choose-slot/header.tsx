import React from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import { useAppSelector } from '../../../../hooks/use-app-selector.hook';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  WHITE,
} from '@app/constants';
import { LibraryIcon } from 'react-native-heroicons/outline';
import { deviceWidth } from '../../../../utils/device';

interface ChooseSlotHeaderProps {
  currentDate: string;
  minDate: string;
  maxDate: string;
  handleOnDayPress(val: string): void;
  handleSetFilterRoomId(val: string): void;
  handleClear(): void;
  filteredRoomId: string;
}

const ChooseSlotHeader: React.FC<ChooseSlotHeaderProps> = (props) => {
  const { rooms } = useAppSelector((state) => state.room);

  const RoomFilter = () => {
    return (
      <>
        <Text style={styles.roomFilterTitle}>FILTER ROOM</Text>

        <View style={styles.roomFilterContainer}>
          <View style={styles.roomFilterIcon}>
            <LibraryIcon color={GRAY} size={deviceWidth / 10} />
          </View>
          <RNPickerSelect
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
            style={pickerStyle}
            value={props.filteredRoomId}
            onValueChange={(e) => props.handleSetFilterRoomId(e)}
            items={rooms.map((room) => {
              return {
                value: room.id,
                label: room.name,
              };
            })}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <CalendarProvider
        date={props.currentDate}
        style={{
          maxHeight: 80,
          backgroundColor: WHITE,
        }}
      >
        <WeekCalendar
          minDate={props.minDate}
          maxDate={props.maxDate}
          markedDates={{
            [props.currentDate]: {
              selected: true,
              selectedColor: FPT_ORANGE_COLOR,
            },
          }}
          onDayPress={(day) => props.handleOnDayPress(day.dateString)}
          firstDay={1}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}
          animateScroll={true}
        />
      </CalendarProvider>
      <RoomFilter />
    </>
  );
};

const pickerStyle: PickerStyle = {
  inputAndroidContainer: {
    width: deviceWidth / 1.75,
    backgroundColor: LIGHT_GRAY,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  inputAndroid: {
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    color: GRAY,
    alignSelf: 'center',
  },
  inputIOS: {
    alignSelf: 'center',
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    color: GRAY,
  },

  placeholder: {
    color: BLACK,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: deviceWidth / 19,
  },
};

const styles = StyleSheet.create({
  roomFilterTitle: {
    fontSize: deviceWidth / 21,
    fontWeight: '600',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  roomFilterIcon: {
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GRAY,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: INPUT_GRAY_COLOR,
    borderRightWidth: 1,
  },
  roomFilterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    flexDirection: 'row',
    height: 80,
    marginHorizontal: 10,
    borderRadius: 8,
  },
});

export default ChooseSlotHeader;
