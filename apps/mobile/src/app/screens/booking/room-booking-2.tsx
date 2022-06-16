import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SearchIcon, SortAscendingIcon } from "react-native-heroicons/solid";
import { BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, WHITE } from "@app/constants";
import { deviceWidth } from "../../utils/device";
import { CheckIcon, ChevronRightIcon, DeviceMobileIcon } from "react-native-heroicons/outline";
import { fetchBookingRoomDevices } from "../../redux/features/room-booking/thunk/fetch-booking-room-devices.thunk";
import DelayInput from "react-native-debounce-input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const RoomBooking2: React.FC = () => {
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const devices = useAppSelector((state) => state.roomBooking.devices);
  const dispatch = useAppDispatch();

  const [isSelected, setSelected] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    dispatch(fetchBookingRoomDevices({
      name: search,
      sort: sort
    }));
  }, [search, sort, dispatch]);

  const Filtering: React.FC = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeaderText}>
          FILTERING
        </Text>
        <View style={styles.filterBodyContainer}>
          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <SearchIcon color={BLACK} />
            </View>
            <View style={styles.filterInput}>
              <DelayInput minLength={0}
                          value={search}
                          onChangeText={(text) => setSearch(text)}
                          placeholder="Search by device name" />
            </View>
          </View>
          <TouchableOpacity style={styles.filterSortButton}>
            <SortAscendingIcon color={BLACK}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <View>
          <Filtering />
          <ScrollView>

            {devices.map((device) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelected(!isSelected)}
                  style={[styles.selectCircleButton, {
                    borderColor: isSelected ? FPT_ORANGE_COLOR : GRAY
                  }]}>
                  {!isSelected
                    ? <View style={styles.selectOff} />
                    : <View style={styles.selectOn}>
                      <CheckIcon size={deviceWidth / 25} color={FPT_ORANGE_COLOR} />
                    </View>}
                  <View style={styles.deviceIconContainer}>
                    <DeviceMobileIcon color={FPT_ORANGE_COLOR} />
                  </View>

                  <View style={styles.deviceContainer}>
                    <View style={styles.deviceDescriptionContainer}>
                      <Text style={{
                        color: BLACK,
                        fontSize: deviceWidth / 24,
                        fontWeight: "600"
                      }}>
                        {device.name}
                      </Text>
                      <Text style={{
                        fontSize: deviceWidth / 26
                      }}>
                        Device Code: {device.id.substring(device.id.length - 12, device.id.length)}
                      </Text>
                    </View>


                    <TouchableOpacity style={styles.viewDetailButton}>
                      <Text style={styles.viewDetailButtonText}>View detail</Text>
                    </TouchableOpacity>
                  </View>

                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigate.navigate("ROOM_BOOKING_3")} style={styles.nextStepButton}>
            <ChevronRightIcon color={WHITE} />
            <Text style={styles.nextStepButtonText}>
              Next Step
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  deviceDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10
  },
    deviceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1
  },
  deviceIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    marginLeft: 10
  },
  selectCircleButton: {
    backgroundColor: WHITE,
    display: 'flex',
    margin: 10,
    height: 90,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  selectOn: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    position: 'absolute',
    zIndex: 2,
    left: -10,
    top: -10,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectOff: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: GRAY,
    position: 'absolute',
    zIndex: 2,
    left: -10,
    top: -10,
    backgroundColor: WHITE
  },
  viewDetailButtonText: {
    color: FPT_ORANGE_COLOR
  },
  viewDetailButton: {
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 1,
    width: deviceWidth / 5,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 40,
    marginRight: 10
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1
  },
  nextStepButtonText: {
    fontWeight: '600',
    fontSize: deviceWidth / 21,
    color: WHITE,
    marginLeft: 10
  },
  nextStepButton: {
    height: 50,
    width: deviceWidth / 1.25,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: WHITE
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: WHITE,
    height: 100,
    borderRadius: 8,
  },
  filterHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 10,
  },
  filterBodyContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterInputContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  filterInputIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: LIGHT_GRAY,
  },
  filterInput: {
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
    width: deviceWidth / 1.6,
  },
  filterSortButton: {
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoomBooking2;
