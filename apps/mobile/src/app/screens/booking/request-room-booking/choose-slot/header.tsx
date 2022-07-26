import React from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { useAppSelector } from '../../../../hooks/use-app-selector.hook';
import { Text, TouchableOpacity, View } from 'react-native';
import { FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { deviceWidth } from 'apps/mobile/src/app/utils/device';

interface ChooseSlotHeaderProps {
  currentDate: string;
  minDate: string;
  maxDate: string;
  handleOnDayPress(val: string): void;
  handleSetFilterRoomId(val: string): void;
}

const ChooseSlotHeader: React.FC<ChooseSlotHeaderProps> = (props) => {
  const { rooms } = useAppSelector((state) => state.room);

  return (
    <CalendarProvider date={props.currentDate} style={{ marginBottom: -250 }}>
      <WeekCalendar
        minDate={props.minDate}
        maxDate={props.maxDate}
        onDayPress={(day) => props.handleOnDayPress(day.dateString)}
        firstDay={1}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
        animateScroll={true}
      />
      <View
        style={{
          height: 80,
          backgroundColor: WHITE,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <RNPickerSelect
          style={{
            viewContainer: {
              width: deviceWidth / 1.5,
              backgroundColor: GRAY,
              borderRadius: 8,
              height: 50,
              alignSelf: 'center',
            },
          }}
          onValueChange={(e) => props.handleSetFilterRoomId(e)}
          items={rooms.map((room) => {
            return {
              value: room.id,
              label: room.name,
            };
          })}
        />
        <TouchableOpacity
          style={{
            height: 35,
            width: 70,
            backgroundColor: FPT_ORANGE_COLOR,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => props.handleSetFilterRoomId(undefined)}
        >
          <Text
            style={{
              fontSize: deviceWidth / 26,
              fontWeight: '500',
              color: WHITE,
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    </CalendarProvider>
  );
};

export default ChooseSlotHeader;
