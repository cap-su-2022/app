import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {BLACK, PINK, WHITE} from "../../constants/colors";
import {HeartIcon, LibraryIcon, TicketIcon} from "react-native-heroicons/outline";
import {FPT_ORANGE_COLOR} from "@app/constants";

const RoomBookingNow: React.FC = () => {

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ScrollView
    >
      <View style={{
        flex: 1
      }}>
        <View style={{
          borderRadius: 8,
          backgroundColor: WHITE,
          margin: 10,
          height: 220
        }}>
          <View style={{
            margin: 10,

          }}>
            <View style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderWidth: 2,
                borderRadius: 50,
                borderColor: FPT_ORANGE_COLOR,
                marginRight: 10,
                marginTop: 10
              }}>
                <LibraryIcon color={FPT_ORANGE_COLOR}/>
              </View>
              <View style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: BLACK
                }}>
                  Library Room
                </Text>
                <Text style={{
                  fontSize: 18
                }}>Room Code:
                  <Text style={{
                  fontWeight: '600'
                }}> LB12</Text>
                </Text>
                <Text style={{
                  fontSize: 18
                }}>Time:
                  <Text style={{
                  fontWeight: '600'
                }}> Slot 3 (10:30 - 12:00)</Text></Text>
              </View>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>

            </View>
            <View style={{
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableOpacity style={{
                marginTop: 10,
                width: 250,
                height: 50,
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: PINK
              }}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HeartIcon color={PINK}/><
                  Text style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: PINK,
                  marginLeft: 5,

                }}>Add to wish list</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{
                marginTop: 10,
                width: 250,
                height: 50,
                borderRadius: 8,
                backgroundColor: FPT_ORANGE_COLOR,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <TicketIcon color={WHITE}/>
                  <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: '600',
                    color: WHITE
                  }}>Book this room now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default RoomBookingNow;
