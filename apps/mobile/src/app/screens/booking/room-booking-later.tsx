import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {BLACK, WHITE} from "../../constants/colors";
import { FPT_ORANGE_COLOR } from '../../constants/fpt-color';
import {ChevronDoubleRightIcon, RefreshIcon, SwitchHorizontalIcon} from "react-native-heroicons/outline";
import Asterik from "../../components/text/asterik";
import Divider from "../../components/text/divider";


const RoomBookingLater: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1
    }}>
      <ScrollView>
        <Calendar current={'2022-05-01'}
                  minDate={'2022-05-17'}
                  maxDate={'2022-09-31'}
        />
        <View style={{
          marginTop: 20,
          height: 210,
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
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              margin: 5,
              backgroundColor: '#f2f2f2',
              height: 50,
              width: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
              }}>Slot 3</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 5
          }}>
            <Divider num={20}/>
            <Text style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              fontSize: 20,
              color: BLACK
            }}>Or</Text>
            <Divider num={20}/>

          </View>
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
                width: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: '600',
                }}>
                  10:30 PM
                </Text>
              </TouchableOpacity>
              <SwitchHorizontalIcon color={BLACK}/>
              <TouchableOpacity style={{
                margin: 5,
                backgroundColor: '#f2f2f2',
                height: 50,
                width: 160,
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

const styles = StyleSheet.create({

});

export default RoomBookingLater;
