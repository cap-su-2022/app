import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { deviceWidth } from "../../utils/device";
import { BLACK, FPT_ORANGE_COLOR, GREEN, LIGHT_GRAY, LIME, PINK, RED, TEAL, WHITE } from "@app/constants";
import { useAppDispatch } from "../../hooks/use-app-dispatch.hook";
import { useAppNavigation } from "../../hooks/use-app-navigation.hook";
import DelayInput from "react-native-debounce-input";
import { LibraryIcon, SearchIcon, TagIcon } from "react-native-heroicons/outline";
/*
*         <Text style={{
          fontWeight: '600',
          fontSize: deviceWidth / 23,
          color: BLACK
        }}>You already booked the the following room(s)</Text>
* */
const RoomBookingAlreadyBook: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const [search, setSearch] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexGrow: 1
          }}>

            <View style={styles.searchContainer}>
              <View style={styles.searchIconContainer}>
                <SearchIcon color={BLACK} />
              </View>
              <View style={styles.searchInput}>
                <DelayInput
                  placeholder="ex: LB12"
                  onChangeText={(val) => setSearch(val.toString())} />
              </View>
            </View>

            <View style={{
              display: "flex",
              flexDirection: "row"
            }}>
              <View style={{
                height: 50,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                backgroundColor: LIGHT_GRAY,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: deviceWidth / 8
              }}>
                <TagIcon color={BLACK} />
              </View>
              <View style={styles.searchTypeContainer}>

              </View>
            </View>

          </View>
        </View>

        <View style={{
          height: 140,
          width: deviceWidth / 1.05,
          backgroundColor: WHITE,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column"
        }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 10
          }}>
            <Text style={{
              color: BLACK,
              fontSize: deviceWidth / 23,
              fontWeight: "600"
            }}>LB12 - Slot 1</Text>

            <View style={{
              height: 30,
              width: 100,
              backgroundColor: GREEN,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{
                color: WHITE,
                fontWeight: "600",
                fontSize: deviceWidth / 25
              }}>
                BOOKED
              </Text>
            </View>
          </View>
          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: FPT_ORANGE_COLOR,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10
            }}>
              <LibraryIcon color={FPT_ORANGE_COLOR} />
            </View>
            <View style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>

              <Text style={{ color: BLACK }}>Booked at: 17:30 12/12/2022</Text>

            </View>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigate.navigate("ROOM_BOOKING_1")}
            style={styles.continueBookingButton}>
            <Text style={styles.continueBookingButtonText}>Continue booking</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterContainer: {
    height: 100,
    width: deviceWidth / 1.05,
    marginTop: 10,
    backgroundColor: WHITE,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50
  },
  searchIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LIGHT_GRAY,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: deviceWidth / 9
  },
  searchInput: {
    width: deviceWidth / 3,
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  searchTypeContainer: {
    height: 50,
    width: deviceWidth / 3.5,
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  footerContainer: {
    height: 90,
    backgroundColor: WHITE,
    width: deviceWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  continueBookingButton: {
    height: 50,
    width: deviceWidth / 1.25,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  continueBookingButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 21,
    fontWeight: "600"
  }
});

export default RoomBookingAlreadyBook;
