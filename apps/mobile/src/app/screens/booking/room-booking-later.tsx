import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Calendar} from 'react-native-calendars';
import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
  SwitchHorizontalIcon,
  SwitchVerticalIcon
} from "react-native-heroicons/outline";
import Asterik from "../../components/text/asterik";
import {deviceWidth} from "../../utils/device";
import {BLACK, FPT_ORANGE_COLOR, GRAY, WHITE} from "@app/constants";


const RoomBookingLater: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const [isSlotSelected, setSlotSelected] = useState<boolean>(false);

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
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            {isSlotSelected ?
             <View style={styles.durationSlotContainer}>
                <TouchableOpacity style={styles.durationSlotButton}>
                  <Text style={styles.durationSlotButtonText}>
                    Slot 3 ( 10:30AM - 12:00PM )
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.durationTimeContainer}>
                <View style={styles.durationTimeBetweenContainer}>
                  <TouchableOpacity style={styles.durationButton}>
                    <Text style={styles.durationButtonText}>
                      10:30 AM
                    </Text>
                  </TouchableOpacity>
                  <SwitchHorizontalIcon color={BLACK}/>
                  <TouchableOpacity style={styles.durationButton}>
                    <Text style={styles.durationButtonText}>
                      12:00 PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            <TouchableOpacity onPress={() => {
              console.log("change");
              setSlotSelected(!isSlotSelected);
            }} style={styles.switchDurationButton}>
              <SwitchVerticalIcon color={BLACK}/>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{
          marginTop: 10,
          height: 60,
          backgroundColor: WHITE,
        }}>
          <View style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Asterik/><Text style={{
            fontSize: 16
          }}> Room booking time might affect with the library operation time. Please book your room wisely!</Text>
          </View>
        </View>

        <View style={{
        height: 90,
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <TouchableOpacity style={{
          height: 50,
          width: 170,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: FPT_ORANGE_COLOR,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <RefreshIcon color={FPT_ORANGE_COLOR}/>
            <Text style={{
              marginLeft: 5,
              fontSize: 20,
              color: FPT_ORANGE_COLOR,
              fontWeight: '600',

            }}>Reset Calendar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
          width: 170,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: FPT_ORANGE_COLOR,
          borderRadius: 8,
        }}>
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text style={{
              color: WHITE,
              fontSize: 20,
              fontWeight: '600',
              marginRight: 5
            }}>Next Step</Text>
            <ChevronDoubleRightIcon color={WHITE}/>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 120,
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
