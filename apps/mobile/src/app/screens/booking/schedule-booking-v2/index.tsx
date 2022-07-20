import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import { CalendarIcon } from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import SelectSlots from './select-slot';
import { fetchAllSlots } from '../../../redux/features/slot';
import { Slot } from '../../../redux/models/slot.model';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import {
  saveFromSlotNum,
  saveStartDay,
  saveToday,
  saveToSlotNum,
  step1ScheduleRoomBooking,
} from '../../../redux/features/room-booking/slice';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import { CheckIcon } from 'react-native-heroicons/solid';

const ScheduleRoomBookingLater: React.FC<any> = (props) => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  const Today = new Date().toJSON().slice(0, 10);
  const [isMultiDays, setMultiDays] = useState<boolean>(false);
  const [slotSelections, setSlotSelections] = useState([]);
  const [slotStart, setSlotStart] = useState<string>();
  const [slotEnd, setSlotEnd] = useState<string>();

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
    const slotSelections = val.map((slot, index) => {
      return {
        value: slot.id,
        label: slot.name,
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
    );
    const slotEndName = slotSelections.find((slot) => slot.value === slotEnd);
    const slotStartNum = slotSelections.find(
      (slot) => slot.value === slotStart
    );
    const slotEndNum = slotSelections.find((slot) => slot.value === slotEnd);

    dispatch(saveFromSlotNum({ fromSlotNum: slotStartNum.slotNum }));
    dispatch(saveToSlotNum({ toSlotNum: slotEndNum.slotNum }));
    dispatch(
      step1ScheduleRoomBooking({
        fromSlotName: slotStartName.label,
        toSlotName: slotEndName.label,
        fromDay: fromDay,
        toDay: isMultiDays ? toDay : null,
        fromSlot: slotStart,
        toSlot: slotEnd,
      })
    );
    setTimeout(() => {
      navigate.navigate('ROOM_BOOKING_CHOOSE_SLOT');
    }, 0);
  };

  const handleSetSlotEnd = (value) => {
    if (value === undefined || value === null) {
      setSlotEnd('1');
    } else {
      setSlotEnd(value);
    }
  };

  const handleSetSlotStart = (value) => {
    if (value === undefined || value === null) {
      setSlotStart('1');
    } else {
      setSlotStart(value);
    }
  };

  const MultiDayCheckBox = () => {
    return (
      <View style={styles.slotContainer}>
        <Text style={styles.title}>Multi Days</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => setMultiDays(!isMultiDays)}
          >
            {isMultiDays ? (
              <CheckIcon color={FPT_ORANGE_COLOR} />
            ) : (
              <CheckIcon color={WHITE} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.startDayContainer}>
          <View style={styles.inputStartDay}>
            <Text style={styles.title}>Start day</Text>
            <TouchableOpacity
              style={styles.bookingNowContainer}
              onPress={() => {
                navigate.navigate('ROOM_BOOKING_CHOOSE_START_DAY');
              }}
            >
              <Text style={styles.bookingNowButtonText}>
                {props.route.params
                  ? props.route.params.dayStart
                    ? props.route.params.dayStart.length > 1
                      ? props.route.params.dayStart
                      : Today
                    : Today
                  : Today}
              </Text>
              <CalendarIcon size={25} color={FPT_ORANGE_COLOR} />
            </TouchableOpacity>
          </View>
          <MultiDayCheckBox />
        </View>

        {isMultiDays ? (
          <>
            <Text style={styles.title}>End Day</Text>
            <TouchableOpacity
              style={styles.bookingNowContainer}
              onPress={() => {
                navigate.navigate('ROOM_BOOKING_CHOOSE_END_DAY');
              }}
            >
              <Text style={styles.bookingNowButtonText}>
                {props.route.params
                  ? props.route.params.dayEnd
                    ? props.route.params.dayEnd.length > 1
                      ? props.route.params.dayEnd
                      : Today
                    : Today
                  : Today}
              </Text>
              <CalendarIcon size={25} color={FPT_ORANGE_COLOR} />
            </TouchableOpacity>
          </>
        ) : null}
        <SelectSlots
          handleSetSlotStart={(val) => setSlotStart(val)}
          handleSetSlotEnd={(val) => setSlotEnd(val)}
          slotStart={slotStart}
          slotEnd={slotEnd}
          slotSelections={slotSelections}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => handleNextStep()}
          style={styles.continueBookingButton}
        >
          <Text style={styles.continueBookingButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  bookingNowContainer: {
    width: deviceWidth / 1.5,
    height: deviceHeight / 13,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: WHITE,
    fontSize: 20,
    fontWeight: '600',
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
  },
  bookingNowButtonText: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '700',
    marginBottom: 5,
  },
  bookingLaterContainer: {
    width: 250,
    height: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bookingLaterButtonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: deviceWidth / 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  continueBookingButton: {
    height: 50,
    width: deviceWidth / 1.25,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  continueBookingButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 21,
    fontWeight: '600',
  },
  slotContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
  startDayContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputStartDay: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default ScheduleRoomBookingLater;
