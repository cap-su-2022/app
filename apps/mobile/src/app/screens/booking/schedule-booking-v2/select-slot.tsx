import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { deviceWidth } from '../../../utils/device';
import {FPT_ORANGE_COLOR, GRAY, WHITE} from '@app/constants';
import { CheckIcon } from 'react-native-heroicons/solid';


const SelectSlots: React.FC<any> = (props) => {
  const [isMultiSlots, setMultiSlots] = useState<boolean>(false);

  return (
    <View style={styles.slotContainer}>
      <View style={styles.slotStart}>
        <View style={styles.slotContainer}>
          <Text style={styles.title}>Start Slot</Text>
          <View style={styles.durationButton}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.slotSelections}
              style={{
                inputAndroid: {
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: GRAY,
                },
                inputIOS: {
                  alignSelf: 'center',
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: GRAY,
                },
              }}
              useNativeAndroidPickerStyle={false}
              value={props.slotStart}
              onValueChange={(value) => props.handleSetSlotStart(value)}
            />
          </View>
        </View>
        <View style={styles.slotContainer}>
          <Text style={styles.title}>Multi Slots</Text>
          <TouchableOpacity style={styles.checkBox} onPress={() => setMultiSlots(!isMultiSlots)}>
            {isMultiSlots ? <CheckIcon color={FPT_ORANGE_COLOR}/> : <CheckIcon color={WHITE}/>}
          </TouchableOpacity>
        </View>

      </View>
      {isMultiSlots ? (
        <View style={styles.slotContainer}>
          <Text style={styles.title}>End Slot</Text>

          <View style={styles.durationButton}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.slotSelections}
              style={{
                inputAndroid: {
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: GRAY,
                },
                inputIOS: {
                  alignSelf: 'center',
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: GRAY,
                },
              }}
              useNativeAndroidPickerStyle={false}
              value={props.slotEnd}
              onValueChange={(value) => props.handleSetSlotEnd(value)}
            />
          </View>
        </View>

      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  slotStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  durationButton: {
    margin: 5,
    backgroundColor: '#EEF5FF',
    height: 50,
    width: deviceWidth / 1.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  durationButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '700',
    marginBottom: 5,
  },
  slotContainer: {
    display: "flex",
    flexDirection: 'column'
  },
  checkBox: {
    alignSelf: 'flex-start',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR
  }
});

export default React.memo(SelectSlots);
