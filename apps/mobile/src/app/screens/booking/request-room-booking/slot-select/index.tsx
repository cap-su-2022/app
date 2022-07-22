import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import { deviceWidth } from '../../../../utils/device';
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { CheckIcon } from 'react-native-heroicons/solid';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import SlotSelectMultiSlot from './multi-slot';

interface SelectSlotsProps {
  slotSelections: any[];
  slotStart: number;
  slotEnd: number;
  handleChangeSlotEnd(val: number): void;
  handleChangeSlotStart(val: number): void;
  isChecked: boolean;
  handleCheck(): void;
}
const SlotSelect: React.FC<SelectSlotsProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.slotStart}>
        <View style={styles.container}>
          <Text style={styles.title}>From Slot</Text>
          <View style={styles.slotPicker}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.slotSelections}
              style={pickerStyles}
              useNativeAndroidPickerStyle={false}
              value={props.slotStart}
              onValueChange={(value) => {
                props.handleChangeSlotStart(value);
              }}
            />
          </View>
        </View>
        <SlotSelectMultiSlot
          isChecked={props.isChecked}
          handleCheck={() => props.handleCheck()}
        />
      </View>
      {props.isChecked ? (
        <View style={styles.container}>
          <Text style={styles.title}>To Slot</Text>

          <View style={[styles.slotPicker, { width: deviceWidth / 1.2 }]}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.slotSelections}
              style={pickerStyles}
              useNativeAndroidPickerStyle={false}
              value={props.slotEnd}
              onValueChange={(value) => {
                props.handleChangeSlotEnd(value);
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const pickerStyles: PickerStyle = {
  inputAndroid: {
    fontSize: deviceWidth / 21,
    fontWeight: '600',
    color: GRAY,
    alignSelf: 'center',
  },
  inputIOS: {
    alignSelf: 'center',
    fontSize: deviceWidth / 21,
    fontWeight: '600',
    color: GRAY,
  },
};

const styles = StyleSheet.create({
  slotStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  slotPicker: {
    width: deviceWidth / 1.5,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
    justifyContent: 'center',
  },
  durationButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    marginBottom: 6,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default React.memo(SlotSelect);
