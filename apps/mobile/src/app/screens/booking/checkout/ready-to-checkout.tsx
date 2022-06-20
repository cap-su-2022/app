import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../../hooks/use-app-navigation.hook";
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from "@app/constants";
import { deviceHeight, deviceWidth } from "../../../utils/device";
import {
  ChevronDoubleRightIcon,
  DeviceMobileIcon,
  DeviceTabletIcon, ExclamationCircleIcon, ExclamationIcon,
  LibraryIcon
} from "react-native-heroicons/outline";
import Divider from "../../../components/text/divider";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import QRCode from "react-native-qrcode-svg";
import AlertModal from "../../../components/modals/alert-modal.component";

const ReadyToCheckOut: React.FC<any> = () => {

  const navigate = useAppNavigation();

  const scrollView = useRef<ScrollView>(null);
  const signature = useRef<SignatureViewRef>(null);

  const [isScrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const [isErrorModalShown, setErrorModalShown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("Error");

  const handleGetData = (e) => {
    console.log("-----------------------");
    console.log(e);
    console.log("-----------------------");

  };
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView scrollEnabled={isScrollEnabled} ref={scrollView} bounces style={styles.bodyContainer}>
          <View>
            <Text style={styles.bookingInforHeaderText}>
              BOOKING DETAIL
            </Text>
          </View>
          <View style={styles.bookingInforBody}>
            <View style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10
            }}>
              <View style={styles.bookingInforHeader}>
                <View style={styles.roomIconContainer}>
                  <LibraryIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 17} />
                </View>
                <Text style={styles.bookingInforHeaderName}>
                  Library Room LB12
                </Text>
              </View>

              <View style={{
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={styles.bookingInforSlotInfo}>
                  <View style={styles.slotStart}>
                    <Text style={styles.slotStartTimeText}>
                      07:00
                    </Text>
                    <Text style={styles.slotStartSlotText}>
                      Slot 1
                    </Text>
                  </View>

                  <View style={styles.slotNavigation}>
                    <ChevronDoubleRightIcon size={deviceWidth / 12} color={BLACK} />
                  </View>
                  <View style={styles.slotEnd}>
                    <Text style={styles.slotEndTimeText}>
                      17:30
                    </Text>
                    <Text style={styles.slotEndSlotText}>
                      Slot 6
                    </Text>
                  </View>
                </View>
              </View>

              <Divider num={deviceWidth / 13} />

              <View style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <View style={styles.bookingInforDetail}>
                  <Text style={styles.bookingInforDetailTitle}>
                    Booked by
                  </Text>
                  <Text style={{
                    fontSize: deviceWidth / 23,
                    fontWeight: "600",
                    color: BLACK
                  }}>
                    bangnn
                  </Text>
                </View>
                <View style={[styles.bookingInforDetail, { marginTop: 5 }]}>
                  <Text style={styles.bookingInforDetailTitle}>
                    Booked at
                  </Text>
                  <Text style={{
                    fontSize: deviceWidth / 23,
                    fontWeight: "600",
                    color: BLACK
                  }}>
                    12:12 01/06/2022
                  </Text>
                </View>
                <View style={[styles.bookingInforDetail, { marginTop: 5 }]}>
                  <Text style={styles.bookingInforDetailTitle}>
                    Checked-in at
                  </Text>
                  <Text style={{
                    fontSize: deviceWidth / 23,
                    fontWeight: "600",
                    color: BLACK
                  }}>
                    14:12 15/06/2022
                  </Text>
                </View>
              </View>

              <Divider num={deviceWidth / 13} />

              <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}>
                <View style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}>
                  <QRCode size={deviceWidth / 5} value="1234567-12345-123456-1234567" />
                  <Text style={{
                    color: BLACK,
                    marginTop: 5
                  }}>1234567-12345-123456-1234567</Text>
                </View>
                <Text style={{
                  color: BLACK,
                  fontWeight: "500"
                }}>
                  Use this code if you want to check-out at the librarian
                </Text>
              </View>

            </View>
          </View>

          <View style={{
            marginTop: 20

          }}>
            <Text style={{
              color: GRAY,
              fontSize: deviceWidth / 23,
              fontWeight: "600",
              marginBottom: 5
            }}>DEVICE(S) DETAIL</Text>
            <View style={{
              width: deviceWidth / 1.05,
              height: 100,
              backgroundColor: WHITE,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <View style={{
                marginLeft: 10,
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}>
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: FPT_ORANGE_COLOR,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <DeviceMobileIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 13} />
                </View>
                <View style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 10
                }}>
                  <Text style={{
                    color: BLACK,
                    fontWeight: "500"
                  }}>Name: Charging Socket Station</Text>
                  <Text style={{
                    color: BLACK,
                    fontWeight: "500"

                  }}>Quantity: 2</Text>
                  <Text style={{
                    color: BLACK,
                    fontWeight: "500"

                  }}>Requested at: 12:12 15/06/2022</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{
            marginTop: 20,
            height: 220
          }}>
            <View style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <Text style={{
                color: GRAY,
                fontWeight: "600",
                fontSize: deviceWidth / 23,
                marginBottom: 5
              }}>
                CHECK-OUT SIGNATURE
              </Text>
              <TouchableOpacity onPress={() => {
                signature.current.clearSignature();
                signature.current.draw();
              }} style={{
                backgroundColor: GRAY,
                borderRadius: 50,
                width: 55,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10
              }}>
                <Text style={{
                  color: WHITE,
                  fontSize: deviceWidth / 28,
                  fontWeight: "600"
                }}>CLEAR</Text>

              </TouchableOpacity>
            </View>
            <View style={{
              height: 150,
              width: deviceWidth / 1.05,
              backgroundColor: WHITE,
              borderRadius: 8
            }}>
              <Signature ref={signature} onEmpty={() => {
                scrollView.current.scrollTo({
                  x: undefined,
                  y: deviceHeight - 100,
                  animated: true
                });
                setErrorMessage("You must sign first so as to proceed to check out!");
                setErrorModalShown(true);
              }} onOK={(e) => handleGetData(e)} onBegin={() => {
                setScrollEnabled(false);
              }}
                         onEnd={() => setScrollEnabled(true)} style={{
                borderRadius: 8
              }} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {
            signature.current.readSignature();
          }} style={styles.checkOutButton}>
            <Text style={styles.checkOutButtonText}>
              Proceed to check out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AlertModal
        isOpened={isErrorModalShown}
        height={deviceWidth / 1.25}
        width={deviceWidth / 1.25}
        toggleShown={() => setErrorModalShown(!isErrorModalShown)}
      >

        <View style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 0.3
        }}>
          <View>
            <ExclamationCircleIcon color={FPT_ORANGE_COLOR} size={deviceHeight / 13} />
            <Text style={{
              color: BLACK,
              fontSize: deviceWidth / 23,
              fontWeight: "500",
              textAlign: "center"
            }}>{errorMessage}</Text>

          </View>
          <View>
            <TouchableOpacity style={{
              width: deviceWidth / 1.5,
              height: 50,
              borderRadius: 8,
              backgroundColor: FPT_ORANGE_COLOR,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: deviceWidth / 21,
                fontWeight: "600",
                color: WHITE
              }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  },
  bookingInforHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 24,
    fontWeight: "600",
    display: "flex",
    marginBottom: 5
  },
  bookingInforBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: deviceWidth / 1.05,
    height: 410,
    backgroundColor: WHITE,
    borderRadius: 8
  },
  bookingInforHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  bookingInforHeaderName: {
    fontWeight: "600",
    fontSize: deviceWidth / 21,
    color: BLACK,
    marginLeft: 10
  },
  bookingInforSlotInfo: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  roomIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  slotStart: {
    display: "flex"
  },
  slotStartTimeText: {
    fontSize: deviceWidth / 17,
    fontWeight: "600",
    color: BLACK
  },
  slotStartSlotText: {
    fontSize: deviceWidth / 23,
    fontWeight: "600",
    color: BLACK,
    textAlign: "center"
  },
  slotNavigation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  slotEnd: {
    display: "flex"
  },
  slotEndTimeText: {
    fontSize: deviceWidth / 17,
    fontWeight: "600",
    color: BLACK
  },
  slotEndSlotText: {
    fontSize: deviceWidth / 23,
    fontWeight: "600",
    color: BLACK,
    textAlign: "center"
  },
  bookingInforDetail: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  bookingInforDetailTitle: {
    fontSize: deviceWidth / 23,
    fontWeight: "600"
  },
  bodyContainer: {
    marginLeft: 10,
    marginTop: 10,
    flex: 1
  },
  footer: {
    height: 90,
    backgroundColor: WHITE,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

  },
  checkOutButton: {
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    height: 50,
    width: deviceWidth / 1.25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  checkOutButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 18,
    fontWeight: "600"
  }
});

export default ReadyToCheckOut;