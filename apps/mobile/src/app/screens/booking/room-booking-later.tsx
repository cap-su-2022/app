import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {BLACK, WHITE} from "../../constants/colors";
import {FPT_ORANGE_COLOR} from '../../constants/fpt-color';
import {
  ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon,
  RefreshIcon,
  SwitchHorizontalIcon,
  SwitchVerticalIcon
} from "react-native-heroicons/outline";
import Asterik from "../../components/text/asterik";
import Divider from "../../components/text/divider";
import {deviceWidth} from "../../utils/device";


const RoomBookingLater: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const [isSlotSelected, setSlotSelected] = useState<boolean>(false);

  return (
    <SafeAreaView style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1
    }}>
      <ScrollView>
        <View style={{
          backgroundColor: WHITE
        }}>
          <Text style={{
            margin: 10,
            color: '#808080',
            fontSize: 20,
          }}>
            Select a date
          </Text>
          <Calendar current={'2022-05-01'}
                    minDate={'2022-05-17'}
                    maxDate={'2022-09-31'}

                    renderArrow={(direction) => <View>
                      {direction === 'left'
                        ? <View style={{
                          width: deviceWidth / 11,
                          height: deviceWidth / 11,
                          borderRadius: 8,
                          borderColor: FPT_ORANGE_COLOR,
                          borderWidth: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <ChevronLeftIcon color={FPT_ORANGE_COLOR}/>
                        </View>
                        : <View style={{
                          width: deviceWidth / 11,
                          height: deviceWidth / 11,
                          borderRadius: 8,
                          borderColor: FPT_ORANGE_COLOR,
                          borderWidth: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <ChevronRightIcon color={FPT_ORANGE_COLOR}/>
                        </View>}
                    </View>}
          />
        </View>
        <View style={{
          marginTop: 20,
          height: 120,
          backgroundColor: WHITE
        }}>
          <View style={{
            margin: 10
          }}>
            <Text style={{
              color: '#808080',
              fontSize: 20,
            }}>Select a duration</Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            {isSlotSelected ? <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity style={{
                  margin: 5,
                  backgroundColor: '#f2f2f2',
                  height: 50,
                  width: deviceWidth / 1.3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                  <Text style={{
                    fontSize: 24,
                    fontWeight: '600',
                  }}>
                    Slot 3 ( 10:30AM - 12:00PM )
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity style={{
                    margin: 5,
                    backgroundColor: '#f2f2f2',
                    height: 50,
                    width: deviceWidth / 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                    <Text style={{
                      fontSize: 24,
                      fontWeight: '600',
                    }}>
                      10:30 AM
                    </Text>
                  </TouchableOpacity>
                  <SwitchHorizontalIcon color={BLACK}/>
                  <TouchableOpacity style={{
                    margin: 5,
                    backgroundColor: '#f2f2f2',
                    height: 50,
                    width: deviceWidth / 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                    <Text style={{
                      fontSize: 24,
                      fontWeight: '600',
                    }}>
                      12:00 PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            <TouchableOpacity onPress={() => {
              console.log("change");
              setSlotSelected(!isSlotSelected);
            }} style={{
              height: deviceWidth / 8,
              width: deviceWidth / 8,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
      </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RoomBookingLater;
