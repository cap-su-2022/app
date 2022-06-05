import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import { SearchIcon, SortAscendingIcon } from "react-native-heroicons/solid";
import { BLACK, GRAY, LIGHT_GRAY, WHITE } from "@app/constants";
import { deviceWidth } from "../../utils/device";


const RoomBooking2: React.FC = () => {

  const dispatch = useAppDispatch();
  const [searchRoomName, setSearchRoomName] = useState<string>("");



  const Filtering: React.FC = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeaderText}>
          FILTERING
        </Text>
        <View style={styles.filterBodyContainer}>
          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <SearchIcon color={BLACK}/>
            </View>
            <View style={styles.filterInput}>
              <TextInput value={searchRoomName}
                         onChangeText={(text) => setSearchRoomName(text)}
                         placeholder="Search by device name"/>
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
      <Filtering/>
      <ScrollView>

      </ScrollView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
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
