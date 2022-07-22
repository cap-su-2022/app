import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { deviceWidth } from '../../../utils/device';
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { CheckIcon } from 'react-native-heroicons/solid';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import {
  saveFromSlotNum,
  saveToSlot,
  saveToSlotNum,
} from '../../../redux/features/room-booking/slice';

interface SelectSlotsProps {
  slotSelections: any[];
  slotStart: number;
  slotEnd: number;
  handleChangeSlotEnd(val: number): void;
  handleChangeSlotStart(val: number): void;
  isChecked: boolean;
  handleCheck(): void;
}
const SelectSlots: React.FC<SelectSlotsProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.slotStart}>
        <View style={styles.container}>
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
              onValueChange={(value) => {
                props.handleChangeSlotStart(value);
              }}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Multi Slots</Text>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => props.handleCheck()}
          >
            {props.isChecked ? (
              <CheckIcon color={FPT_ORANGE_COLOR} />
            ) : (
              <CheckIcon color={WHITE} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {props.isChecked ? (
        <View style={styles.container}>
          <Text style={styles.title}>End Slot</Text>

          <View style={styles.durationButton}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.slotSelections}
              style={{
                placeholder: {
                  color: BLACK,
                },
                inputAndroid: {
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: BLACK,
                },
                inputIOS: {
                  alignSelf: 'center',
                  fontSize: deviceWidth / 21,
                  fontWeight: '600',
                  color: BLACK,
                },
              }}
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
const styles = StyleSheet.create({
  slotStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  durationButton: {
    margin: 5,
    backgroundColor: 'rgba(240, 110, 40, 0.2)',
    height: 45,
    width: deviceWidth / 1.5,
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
    fontWeight: '600',
    marginLeft: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
});

export default React.memo(SelectSlots);
