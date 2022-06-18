import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../../hooks/use-app-navigation.hook";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, WHITE } from "@app/constants";
import { deviceWidth } from "../../../utils/device";
import { HomeIcon, LibraryIcon, TicketIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/outline";

import SuccessCheckOut from "../../../components/success-checkout.svg";
import StarRating from "./rate";
import RNPickerSelect from "react-native-picker-select";
import Divider from "../../../components/text/divider";
import SuccessfullyCheckedOutFeedback from "./modal/successfully-checkout-feedback";

const CheckoutSuccessfully: React.FC<any> = () => {

  const navigate = useAppNavigation();
  const [rating, setRating] = useState<number>(0);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [isFeedbackSent, setFeedbackSent] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
        flex: 1
      }}>
        <ScrollView contentContainerStyle={{
          display: "flex",
          justifyContent: "center"
        }}>
          <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <SuccessCheckOut height={deviceWidth / 1.75} width={deviceWidth / 1.75} />
            <Text style={{
              color: BLACK,
              fontWeight: "600",
              fontSize: deviceWidth / 20
            }}>
              Successfully checked out the room
            </Text>
          </View>

          <Divider num={deviceWidth / 8} />

          <View style={{
            display: "flex",
            marginTop: 20
          }}>
            <Text style={{
              color: GRAY,
              fontSize: deviceWidth / 23,
              fontWeight: "600",
              textTransform: "uppercase",
              marginBottom: 5,
              marginLeft: 5
            }}>Please rate your experience</Text>
            <View style={{
              width: deviceWidth / 1.05,
              height: 90,
              backgroundColor: WHITE,
              borderRadius: 8,
              alignSelf: "center",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row"

            }}>
              <StarRating rating={rating}
                          setRating={(rate) => setRating(rate)} />
            </View>
          </View>

          <View style={{
            display: "flex",
            marginTop: 20
          }}>
            <Text style={{
              color: GRAY,
              fontSize: deviceWidth / 23,
              fontWeight: "600",
              textTransform: "uppercase",
              marginBottom: 5,
              marginLeft: 5
            }}>TELL US MORE</Text>
            <TextInput style={{
              width: deviceWidth / 1.05,
              height: 100,
              backgroundColor: WHITE,
              alignSelf: "center",
              borderRadius: 8,
              justifyContent: "flex-start",
              alignItems: "baseline"
            }} multiline numberOfLines={4} />
          </View>

          <View style={{
            display: "flex",
            marginTop: 20
          }}>
            <Text style={{
              color: GRAY,
              fontSize: deviceWidth / 23,
              fontWeight: "600",
              textTransform: "uppercase",
              marginBottom: 5,
              marginLeft: 5
            }}>FEEDBACK TYPE</Text>
            <RNPickerSelect style={{
              inputAndroid: {
                height: 50,
                width: deviceWidth / 1.05,
                backgroundColor: WHITE,
                alignSelf: "center"
              }
            }} onValueChange={(e) => {

            }} items={[{
              label: "Room facilities",
              value: "ROOM_FACILITY"
            },
              {
                label: "Outside room",
                value: "OUTSIDE_ROOM"
              },
              {
                label: "Device problems",
                value: "DEVICE_PROBLEMS"
              },
              {
                label: "Check-in Procedures",
                value: "CHECK_IN_PROCEDURES"
              },
              {
                label: "Check-out Procedures",
                value: "CHECK_OUT_PROCEDURES"
              },
              {
                label: "Other",
                value: "OTHER"
              }]} />
          </View>

          <View style={{
            display: "flex",
            alignItems: "center",
            marginTop: 30,
            height: 100
          }}>
            {isFeedbackSent ? <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: GRAY,
                width: deviceWidth / 1.25,
                height: 50
              }}>
                <Text style={{
                  color: WHITE,
                  fontSize: deviceWidth / 19,
                  fontWeight: "600"
                }}>
                  Submit Feedback
                </Text>
              </View>
              : <TouchableOpacity onPress={() => setFeedbackModalOpen(true)} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: FPT_ORANGE_COLOR,
                width: deviceWidth / 1.25,
                height: 50
              }}>
                <Text style={{
                  color: WHITE,
                  fontSize: deviceWidth / 19,
                  fontWeight: "600"
                }}>
                  Submit Feedback
                </Text>
              </TouchableOpacity>}
          </View>
        </ScrollView>
        <View style={{
          height: 120,
          backgroundColor: WHITE,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
          <TouchableOpacity onPress={() => navigate.replace("ROOM_BOOKING")} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: FPT_ORANGE_COLOR,
            borderRadius: 8,
            width: deviceWidth / 1.25,
            height: 50
          }}>
            <TicketIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 15} />
            <Text style={{
              marginLeft: 10,
              color: FPT_ORANGE_COLOR,
              fontSize: deviceWidth / 19,
              fontWeight: "600"
            }}>
              Book another room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate.replace("MAIN")} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: FPT_ORANGE_COLOR,
            borderRadius: 8,
            width: deviceWidth / 1.25,
            height: 50
          }}>
            <HomeIcon color={WHITE} size={deviceWidth / 15} />
            <Text style={{
              color: WHITE,
              fontSize: deviceWidth / 19,
              fontWeight: "600",
              margin: 10
            }}>
              Go to home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SuccessfullyCheckedOutFeedback
        isOpened={isFeedbackModalOpen}
        setFeedbackSent={(val) => setFeedbackSent(val)}
        setOpened={(val) => setFeedbackModalOpen(val)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CheckoutSuccessfully;
