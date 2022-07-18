import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { deviceWidth } from '../../utils/device';
import {
  CalendarIcon,
  ChevronDoubleRightIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import CalendarDateSelect from './calendar-select';

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  { id: 4 },
];

const slotData = [
  {
    value: '1',
    label: 'Slot 1',
  },
  {
    value: '2',
    label: 'Slot 2',
  },
  {
    value: '3',
    label: 'Slot 3',
  },
];

const TrackBookingRoom: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const calendarStartDate = useRef<React.ElementRef<typeof CalendarDateSelect>>(
    {
      date: '01/01/2022',
      rawDate: '',
    }
  );
  const calendarEndDate = useRef<React.ElementRef<typeof CalendarDateSelect>>({
    date: '01/01/2022',
    rawDate: '',
  });

  const [slotStart, setSlotStart] = useState('1');
  const [slotEnd, setSlotEnd] = useState('1');
  const [dateStart, setDateStart] = useState(calendarStartDate.current.date);
  const [dateEnd, setDateEnd] = useState(calendarEndDate.current.date);

  const BookingRequestItem: React.FC<any> = (props) => {
    return (
      <TouchableOpacity
        onPress={() => navigate.navigate('ACCEPT_ROOM_BOOKING')}
        style={{
          height: 50,
          backgroundColor: WHITE,
          width: deviceWidth / 1.05,
          borderRadius: 8,
          marginTop: 10,
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            color: BLACK,
          }}
        >
          {props.item.id}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          color: GRAY,
          fontWeight: '600',
          fontSize: deviceWidth / 23,
          marginLeft: 10,
        }}
      >
        FILTER
      </Text>
      <View
        style={{
          height: 140,
          width: deviceWidth / 1.05,
          backgroundColor: WHITE,
          borderRadius: 8,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigate.navigate('CALENDAR_SELECT')}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <View style={styles.leftIconSlotFilter}>
              <CalendarIcon color={GRAY} size={deviceWidth / 16} />
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: GRAY,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                height: 35,
                width: deviceWidth / 3.4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: GRAY,
                  marginLeft: 10,
                  fontWeight: '500',
                  fontSize: deviceWidth / 32,
                }}
              >
                {dateStart}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSlotStart(slotEnd);
              setSlotEnd(slotStart);
            }}
            style={styles.switchIconContainer}
          >
            <ChevronDoubleRightIcon color={GRAY} size={deviceWidth / 16} />
          </TouchableOpacity>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.leftIconSlotFilter}>
              <CalendarIcon color={GRAY} size={deviceWidth / 16} />
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: GRAY,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                height: 35,
                width: deviceWidth / 3.4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: GRAY,
                  marginLeft: 10,
                  fontWeight: '500',
                  fontSize: deviceWidth / 32,
                }}
              >
                {dateStart}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.leftIconSlotFilter}>
              <ClockIcon color={GRAY} size={deviceWidth / 16} />
            </View>
            <RNPickerSelect
              value={slotStart}
              style={slotFilterContainer}
              onValueChange={(e) => setSlotStart(e)}
              items={slotData}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setSlotStart(slotEnd);
              setSlotEnd(slotStart);
            }}
            style={styles.switchIconContainer}
          >
            <ChevronDoubleRightIcon color={GRAY} size={deviceWidth / 16} />
          </TouchableOpacity>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.leftIconSlotFilter}>
              <ClockIcon color={GRAY} size={deviceWidth / 16} />
            </View>
            <RNPickerSelect
              value={slotEnd}
              style={slotFilterContainer}
              onValueChange={(e) => setSlotEnd(e)}
              items={slotData}
            />
          </View>
        </View>
        <ScrollView
          style={{
            marginTop: 10,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 8 }]}
          >
            <Text style={styles.filterTypeText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 5 }]}
          >
            <Text style={styles.filterTypeText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 5 }]}
          >
            <Text style={styles.filterTypeText}>Booked</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 4 }]}
          >
            <Text style={styles.filterTypeText}>Checked In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 3.7 }]}
          >
            <Text style={styles.filterTypeText}>Checked Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTypeButton, { width: deviceWidth / 4 }]}
          >
            <Text style={styles.filterTypeText}>Cancelled</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <VirtualizedList
        showsVerticalScrollIndicator={false}
        data={data}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={(item) => <BookingRequestItem item={item} />}
      />
    </SafeAreaView>
  );
};

const slotFilterContainer: PickerStyle = {
  viewContainer: {
    borderWidth: 2,
    borderColor: GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 35,
    width: deviceWidth / 3.4,
    display: 'flex',
    justifyContent: 'center',
  },
  placeholder: {
    color: GRAY,
  },
  inputIOS: {
    color: GRAY,
    marginLeft: 10,
    fontWeight: '500',
    fontSize: deviceWidth / 32,
  },
  inputAndroid: {
    color: GRAY,
    marginLeft: 10,
    fontWeight: '500',
    fontSize: deviceWidth / 32,
  },
};

const styles = StyleSheet.create({
  leftIconSlotFilter: {
    height: 35,
    width: 35,
    borderTopColor: GRAY,
    borderLeftColor: GRAY,
    borderBottomColor: GRAY,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchIconContainer: {
    height: 35,
    width: 35,
    borderWidth: 2,
    borderColor: GRAY,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTypeButton: {
    marginLeft: 10,
    borderRadius: 50,
    height: 30,
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTypeText: {
    color: FPT_ORANGE_COLOR,
    fontWeight: '600',
    fontSize: deviceWidth / 30,
  },
});

export default TrackBookingRoom;
