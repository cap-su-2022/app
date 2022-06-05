import React, { useEffect, useState } from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Calendar} from 'react-native-calendars';
import {
  ChartPieIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon, ClockIcon,
  RefreshIcon,
  SwitchHorizontalIcon,
  SwitchVerticalIcon
} from "react-native-heroicons/outline";
import Asterik from "../../components/text/asterik";
import {deviceWidth} from "../../utils/device";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, WHITE } from "@app/constants";
import RNPickerSelect from "react-native-picker-select";
import { getTimeDetailBySlotNumber } from "../../utils/slot-resolver.util";

const SLOTS = [
  {
    label: 'Slot 1',
    value: 1,
  },
  {
    label: 'Slot 2',
    value: 2,
  },
  {
    label: 'Slot 3',
    value: 3,
  },
  {
    label: 'Slot 4',
    value: 4,
  },
  {
    label: 'Slot 5',
    value: 5,
  },
  {
    label: 'Slot 6',
    value: 6,
  },
]
const RoomBookingLater: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const [isSlotSelected, setSlotSelected] = useState<boolean>(false);
  const [slotStart, setSlotStart] = useState<number>(1);
  const [slotEnd, setSlotEnd] = useState<number>(1);
  const [bookTimeDetail, setBookTimeDetail] = useState<string>();

  useEffect(() => {
    if (slotEnd < slotStart) {
      setSlotEnd(slotStart);
    }
    if (slotStart > slotEnd) {
      setSlotStart(slotEnd);
    }
    const timeDetailSlotStart = getTimeDetailBySlotNumber(slotStart);
    if (slotStart === slotEnd) {
      setBookTimeDetail(`${timeDetailSlotStart.startTime} - ${timeDetailSlotStart.endTime}`);
    } else {
      const timeDetailSlotEnd = getTimeDetailBySlotNumber(slotEnd);
      setBookTimeDetail(`${timeDetailSlotStart.startTime} - ${timeDetailSlotEnd.endTime}`)
    }
  }, [slotStart, slotEnd]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.selectDateContainer}>
          <Text style={styles.selectDateTitle}>
            Select a date
          </Text>
          <Calendar current={'2022-05-01'}
                    minDate={'2022-05-17'}
                    maxDate={'2022-09-31'}

                    renderArrow={(direction) => <View>
                      {direction === 'left'
                        ? <View style={styles.selectDateChevronLeftButton}>
                          <ChevronLeftIcon color={FPT_ORANGE_COLOR}/>
                        </View>
                        : <View style={styles.selectDateChevronRightButton}>
                          <ChevronRightIcon color={FPT_ORANGE_COLOR}/>
                        </View>}
                    </View>}
          />
        </View>
        <View style={styles.durationContainer}>
          <View style={styles.durationTitleContainer}>
            <Text style={styles.durationTitle}>Select a duration</Text>
          </View>
          <View style={styles.filterDurationContainer}>
              <View style={styles.durationTimeContainer}>

                <View style={styles.durationTimeBetweenContainer}>
                  <View style={{
                    height: 50,
                    width: 50,
                    borderRadius: 8,
                    backgroundColor: LIGHT_GRAY,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <ChartPieIcon size={deviceWidth / 15} color={BLACK}/>
                  </View>
                  <View style={styles.durationButton}>
                    <RNPickerSelect
                      fixAndroidTouchableBug={true}
                      items={SLOTS}
                      style={{
                      inputAndroid: {
                        fontSize: deviceWidth / 21,
                        fontWeight: '600',
                        color: GRAY
                      }
                    }} useNativeAndroidPickerStyle={false}
                                    value={slotStart}
                                    onValueChange={(value) => {
                                      if (value === undefined || value === null) {
                                        setSlotStart(1);
                                      } else {
                                        setSlotStart(value);
                                      }
                                    }}/>
                  </View>
                  <ChevronRightIcon color={BLACK}/>
                  <View style={styles.durationButton}>
                    <RNPickerSelect
                      fixAndroidTouchableBug={true}
                      items={SLOTS}
                      style={{
                      inputAndroid: {
                        fontSize: deviceWidth / 21,
                        fontWeight: '600',
                        color: GRAY
                      }
                    }} useNativeAndroidPickerStyle={false}
                                    value={slotEnd}
                                    onValueChange={(value) => {

                                      if (value === undefined || value === null) {
                                        setSlotEnd(1);
                                      } else {
                                        setSlotEnd(value);
                                      };
                                    }}/>
                  </View>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <View style={{
                    height: 50,
                    width: 50,
                    borderRadius: 8,
                    backgroundColor: LIGHT_GRAY,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <ClockIcon size={deviceWidth / 15} color={BLACK}/>
                  </View>
                  <View style={{
                    margin: 5,
                    backgroundColor: LIGHT_GRAY,
                    height: 50,
                    width: deviceWidth / 1.33,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                    <Text style={{
                      fontSize: deviceWidth / 21,
                      fontWeight: '600',
                      color: GRAY
                    }}>
                      {bookTimeDetail}
                    </Text>
                  </View>
                </View>
              </View>
          </View>

        </View>
        <View style={styles.noticeContainer}>
          <View style={styles.noticeTextContainer}>
            <Asterik/><Text style={styles.noticeText}>
            Room booking time might affect with the library operation time.
            Please book your room wisely!
          </Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.resetCalendarButton}>
          <View style={styles.resetCalendarButtonTextContainer}>
            <RefreshIcon color={FPT_ORANGE_COLOR}/>
            <Text style={styles.resetCalendarButtonText}>Reset Calendar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextStepButton}>
          <View style={styles.nextStepButtonTextContainer}>
            <Text style={styles.nextStepButtonText}>Next Step</Text>
            <ChevronDoubleRightIcon color={WHITE}/>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 90,
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 16
  },
  noticeTextContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  noticeContainer: {
    marginTop: 10,
    height: 60,
    backgroundColor: WHITE,
  },
  filterDurationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resetCalendarButton: {
    height: 50,
    width: 170,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetCalendarButtonTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  resetCalendarButtonText: {
    marginLeft: 5,
    fontSize: 20,
    color: FPT_ORANGE_COLOR,
    fontWeight: '600',
  },
  nextStepButton: {
    width: 170,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
  nextStepButtonTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  nextStepButtonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '600',
    marginRight: 5
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1
  },
  selectDateContainer: {
    backgroundColor: WHITE
  },
  selectDateTitle: {
    margin: 10,
    color: GRAY,
    fontSize: 20,
  },
  selectDateChevronLeftButton: {
    width: deviceWidth / 11,
    height: deviceWidth / 11,
    borderRadius: 8,
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectDateChevronRightButton: {
    width: deviceWidth / 11,
    height: deviceWidth / 11,
    borderRadius: 8,
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationContainer: {
    marginTop: 20,
    height: 180,
    backgroundColor: WHITE
  },
  durationTitleContainer: {
    margin: 10
  },
  durationTitle: {
    color: '#808080',
    fontSize: 20,
  },
  durationTimeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationTimeBetweenContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  durationButton: {
    margin: 5,
    backgroundColor: '#f2f2f2',
    height: 50,
    width: deviceWidth / 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  durationButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  durationSlotButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  durationSlotButton: {
    margin: 5,
    backgroundColor: '#f2f2f2',
    height: 50,
    width: deviceWidth / 1.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  durationSlotContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchDurationButton: {
    height: deviceWidth / 8,
    width: deviceWidth / 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RoomBookingLater;
