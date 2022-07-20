import React, { useState } from 'react';
import { StyleSheet,  View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { deviceWidth } from '../../../utils/device';
import { FPT_ORANGE_COLOR, GRAY } from '@app/constants';

const SelectSlots: React.FC<any> = (props) => {
  return (
    <View style={styles.slotContainer}>
      <View style={styles.slotStart}>
        <View style={styles.slotContainer}>
          <Text style={styles.title}>Booking Reason</Text>
          <View style={styles.durationButton}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              items={props.bookingReason}
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
              value={props.handleBookingReason}
              onValueChange={(value) => {
                props.handleBookingReasonSelect(value);
              }}
            />
          </View>
        </View>
      </View>
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
    height: 50,
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
    fontWeight: '700',
    marginBottom: 5,
  },
  slotContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBox: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
  },
});

export default React.memo(SelectSlots);
