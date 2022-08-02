import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BLACK, FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import {
  ExclamationCircleIcon,
  SearchIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import { fetchAllSlots } from '../../../redux/features/slot';
import { Slot } from '../../../redux/models/slot.model';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import {
  saveFromSlotNum,
  saveMultiDate,
  saveStartDay,
  saveToday,
  saveToSlotNum,
  step1BookingLongTerm,
  step1ScheduleRoomBooking,
} from '../../../redux/features/room-booking/slice';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import DateSelect from './date-select';
import RequestRoomBookingHeader from './header';
import RequestRoomBookingRecentlySearch from './recently-search';
import SlotSelect from './slot-select';
import { fetchRoomFreeByMultiSlotAndDay } from '../../../redux/features/room-booking/thunk/fetch-room-free-by-multi-day-and-slot.thunk';
import { checkOverSlot } from '../../../redux/features/room-booking/thunk/check-over-slot.thunk';
import AlertModal from '../../../components/modals/alert-modal.component';

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
        label: `${slot.name} (${slot.timeStart.slice(
          0,
          5
        )} - ${slot.timeEnd.slice(0, 5)})`,
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
      ),
      slotEndName = slotSelections.find((slot) => slot.value === slotEnd),
      slotStartNum = slotSelections.find((slot) => slot.value === slotStart),
      slotEndNum = slotSelections.find((slot) => slot.value === slotEnd);
    dispatch(
      checkOverSlot({
        date: fromDay || Today,
        slotin: slotStartName.value,
      })
    )
      .unwrap()
      .then((value) => {
        if (value === true) {
          setGenericMessage(
            'This slot is already passed. Please choose the next slot or the next day and try again.'
          );
          setGenericModalShown(!isGenericModalShown);
        } else {
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
              isMultiSlotChecked: isMultiSlotChecked,
            })
          );
          setTimeout(() => {
            navigate.navigate('ROOM_BOOKING_CHOOSE_SLOT');
          }, 0);
        }
      });
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
        isMultiLongTerm: true,
        isMultiSlotChecked: isMultiSlotChecked,
      })
    );

    dispatch(
      fetchRoomFreeByMultiSlotAndDay({
        dateStart: fromDay || Today,
        dateEnd: toDay || Today,
        checkinSlot: slotStart,
        checkoutSlot: slotEnd,
      })
    )
      .unwrap()
      .then(() => {
        navigate.navigate('ROOM_BOOKING_LONG_TERM_CHOOSE_ROOM');
      });
  };

  const getContainerHeightBasedOnMultiChecks = () => {
    if (!isMultiDateChecked && !isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 3 : 260,
      };
    } else if (isMultiDateChecked && isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 1.6 : 490,
      };
    } else if (isMultiDateChecked || isMultiSlotChecked) {
      return {
        height: Platform.OS === 'android' ? deviceHeight / 2.2 : 350,
      };
    }
  };
  const [genericMessage, setGenericMessage] = useState<string>();
  const [isGenericModalShown, setGenericModalShown] = useState<boolean>(false);

  const GenericAlertModal = ({ message }) => {
    return (
      <AlertModal
        isOpened={isGenericModalShown}
        height={200}
        width={deviceWidth / 1.1}
        toggleShown={() => setGenericModalShown(!isGenericModalShown)}
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexGrow: 0.9,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          <ExclamationCircleIcon
            style={{
              alignSelf: 'center',
            }}
            size={deviceWidth / 8}
            color={FPT_ORANGE_COLOR}
          />
          <Text
            style={{
              color: BLACK,
              fontWeight: '500',
              fontSize: deviceWidth / 23,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={() => setGenericModalShown(!isGenericModalShown)}
            style={{
              backgroundColor: FPT_ORANGE_COLOR,
              height: 40,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                fontSize: deviceWidth / 23,
                color: WHITE,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </AlertModal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <RequestRoomBookingHeader />
      <ScrollView>
        <View style={styles.containerView}>
          <View
            style={[styles.container, getContainerHeightBasedOnMultiChecks()]}
          >
            <DateSelect
              isChecked={isMultiDateChecked}
              handleCheck={() => {
                dispatch(saveMultiDate(!isMultiDateChecked));
                setMultiDateChecked(!isMultiDateChecked);
              }}
            />
            <SlotSelect
              isChecked={isMultiSlotChecked}
              handleCheck={() => setMultiSlotChecked(!isMultiSlotChecked)}
              handleChangeSlotStart={(val) => {
                setSlotStart(val);
              }}
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
      <GenericAlertModal message={genericMessage} />
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
  containerView: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
