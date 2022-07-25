import React from 'react';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';

interface ChooseSlotHeaderProps {
  currentDate: string;
  minDate: string;
  maxDate: string;
  handleOnDayPress(val: string): void;
}

const ChooseSlotHeader: React.FC<ChooseSlotHeaderProps> = (props) => {
  return (
    <CalendarProvider date={props.currentDate} style={{ marginBottom: -450 }}>
      <WeekCalendar
        minDate={props.minDate}
        maxDate={props.maxDate}
        onDayPress={(day) => props.handleOnDayPress(day.dateString)}
        firstDay={1}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
        animateScroll={true}
      />
    </CalendarProvider>
  );
};

export default ChooseSlotHeader;
