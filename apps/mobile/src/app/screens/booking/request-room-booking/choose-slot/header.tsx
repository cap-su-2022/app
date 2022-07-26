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
  handleClear(): void;
}

const ChooseSlotHeader: React.FC<ChooseSlotHeaderProps> = (props) => {
  const { rooms } = useAppSelector((state) => state.room);

  return (
    <CalendarProvider date={props.currentDate} style={{ marginBottom: -140 }}>
      <WeekCalendar
        minDate={props.minDate}
        maxDate={props.maxDate}
        onDayPress={(day) => props.handleOnDayPress(day.dateString)}
        firstDay={1}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
        animateScroll={true}
      />
      <View>
        <Text
          style={{
            fontSize: deviceWidth / 21,
            fontWeight: '600',
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          FILTER ROOM
        </Text>
      </View>
      <View
        style={{
          backgroundColor: WHITE,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginHorizontal: 10,
          marginTop: 10,
          paddingVertical: 10,
          borderRadius: 8
        }}
      >

        <RNPickerSelect
          style={{
            viewContainer: {
              width: deviceWidth / 1.5,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
              height: 50,
              alignSelf: 'center',
              marginTop: 10,
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
      </View>
    </CalendarProvider>
  );
};

export default ChooseSlotHeader;
