import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import { SearchIcon, TicketIcon } from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import { fetchAllSlots } from '../../../redux/features/slot';
import { Slot } from '../../../redux/models/slot.model';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import {
  saveFromSlotNum,
  saveStartDay,
  saveToday,
  saveToSlotNum, step1BookingLongTerm,
  step1ScheduleRoomBooking,
} from '../../../redux/features/room-booking/slice';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import DateSelect from './date-select';
import RequestRoomBookingHeader from './header';
import RequestRoomBookingRecentlySearch from './recently-search';
import SlotSelect from './slot-select';
import {
  fetchRoomFreeByMultiSlotAndDay
} from "../../../redux/features/room-booking/thunk/fetch-room-free-by-multi-day-and-slot.thunk";

const ScheduleRoomBookingLater: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  const Today = new Date().toJSON().slice(0, 10);
  const [slotSelections, setSlotSelections] = useState([]);
  const [slotStart, setSlotStart] = useState<number>();
  const [slotEnd, setSlotEnd] = useState<number>();

  const [isMultiDateChecked, setMultiDateChecked] = useState<boolean>(false);
  const [isMultiSlotChecked, setMultiSlotChecked] = useState<boolean>(false);

  const fromDay = useAppSelector(
    (state) => state.roomBooking.addRoomBooking.fromDay
  );
  const toDay = useAppSelector(
    (state) => state.roomBooking.addRoomBooking.toDay
  );

  useEffect(() => {
    dispatch(fetchAllSlots())
      .unwrap()
      .then((val) => {
        transformSlotsToSlotPicker(val);
      });
    dispatch(saveToday(Today));
    dispatch(saveStartDay(Today));
    return () => {
      setSlotSelections([]);
    };
  }, []);



  const transformSlotsToSlotPicker = (val: Slot[]) => {
    const slotSelections = val.map((slot) => {
      return {
        value: slot.id,
        label: `${slot.name} (${slot.timeStart.slice(0,5)} - ${slot.timeEnd.slice(0,5)})`,
        slotNum: slot.slotNum,

      };
    });
    setSlotSelections(slotSelections);
    handleSetSlotStart(slotSelections[0].value);
    handleSetSlotEnd(slotSelections[0].value);
  };

  const handleNextStep = () => {
    const slotStartName = slotSelections.find(
      (slot) => slot.value === slotStart
    ), slotEndName = slotSelections.find((slot) => slot.value === slotEnd), slotStartNum = slotSelections.find(
      (slot) => slot.value === slotStart
    ), slotEndNum = slotSelections.find((slot) => slot.value === slotEnd);
    dispatch(saveFromSlotNum({ fromSlotNum: slotStartNum.slotNum }));
    dispatch(saveToSlotNum({ toSlotNum: slotEndNum.slotNum }));
    dispatch(
      step1ScheduleRoomBooking({
        fromSlotName: slotStartName.label,
        toSlotName: slotEndName.label,
        fromDay: fromDay,
        toDay: isMultiDateChecked ? toDay : null,
        fromSlot: slotStart,
        toSlot: slotEnd,
      })
    );
    setTimeout(() => {
      navigate.navigate('ROOM_BOOKING_CHOOSE_SLOT');
    }, 0);
  };

  const handleSetSlotEnd = (value) => {
    if (!value) {
      return setSlotEnd(1);
    }
    setSlotEnd(value);
  };

  const handleSetSlotStart = (value) => {
    if (!value) {
      return setSlotStart(1);
    }
    setSlotStart(value);
  };

  const handleLongTermBooking = () => {
    const slotStartName = slotSelections.find(
      (slot) => slot.value === slotStart
    );
    const slotEndName = slotSelections.find((slot) => slot.value === slotEnd);
    const slotStartNum = slotSelections.find(
      (slot) => slot.value === slotStart
    );
    const slotEndNum = slotSelections.find((slot) => slot.value === slotEnd);

    dispatch(saveFromSlotNum({ fromSlotNum: slotStartNum.slotNum }));
    dispatch(saveToSlotNum({ toSlotNum: slotEndNum.slotNum }));
    dispatch(
      step1BookingLongTerm({
        fromSlotName: slotStartName.label,
        toSlotName: slotEndName.label,
        fromDay: fromDay,
        toDay: isMultiDateChecked ? toDay : null,
        fromSlot: slotStart,
        toSlot: slotEnd,
        isMultiLongTerm: true
      })
    );

    dispatch(fetchRoomFreeByMultiSlotAndDay({
      dateStart: fromDay || Today,
      dateEnd: toDay|| Today,
      checkinSlot: slotStart,
      checkoutSlot: slotEnd
    })).unwrap().then(() => {
      navigate.navigate('ROOM_BOOKING_LONG_TERM_CHOOSE_ROOM');
    })

  }

  const getContainerHeightBasedOnMultiChecks = () => {
    if (!isMultiDateChecked && !isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 3 : 250,
      };
    } else if (isMultiDateChecked && isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 1.6 : 490,
      };
    } else if (isMultiDateChecked || isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 2.2 : 340,
      };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <RequestRoomBookingHeader />
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={[styles.container, getContainerHeightBasedOnMultiChecks()]}
          >
            <DateSelect
              isChecked={isMultiDateChecked}
              handleCheck={() => setMultiDateChecked(!isMultiDateChecked)}
            />
            <SlotSelect
              isChecked={isMultiSlotChecked}
              handleCheck={() => setMultiSlotChecked(!isMultiSlotChecked)}
              handleChangeSlotStart={(val) => setSlotStart(val)}
              handleChangeSlotEnd={(val) => setSlotEnd(val)}
              slotStart={slotStart}
              slotEnd={slotEnd}
              slotSelections={slotSelections}
            />
            {isMultiSlotChecked && isMultiDateChecked ? (
              <TouchableOpacity
                onPress={() => handleLongTermBooking()}
                style={styles.searchButton}
              >
                <TicketIcon color={WHITE} size={deviceWidth / 14} />
                <Text style={styles.searchButtonText}>
                  Long-term booking room
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => handleNextStep()}
              style={styles.searchButton}
            >
              <SearchIcon color={WHITE} size={deviceWidth / 14} />
              <Text style={styles.searchButtonText}>
                Search for booking room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <RequestRoomBookingRecentlySearch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    marginTop: 10,
    elevation: 7,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    height: 50,
    width: deviceWidth / 1.2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    color: WHITE,
    flexWrap: 'wrap',
  },
});

export default ScheduleRoomBookingLater;
