import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { deviceWidth } from '../../utils/device';
import {
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  WHITE,
} from '@app/constants';

interface CalendarDateSelectHandler {
  date: string;
  rawDate: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CalendarDateSelectProps {}

const CalendarDateSelect: React.ForwardRefRenderFunction<
  CalendarDateSelectHandler,
  CalendarDateSelectProps
> = (props, ref) => {
  const [date, setDate] = useState<string>();
  const [rawDate, setRawDate] = useState<string>();

  useImperativeHandle(ref, () => ({
    date,
    rawDate,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={styles.container}>
        <Calendar />
        <View
          style={{
            borderTopColor: INPUT_GRAY_COLOR,
            borderTopWidth: 1,
            height: 80,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: WHITE,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              height: 50,
              width: deviceWidth / 3,
              backgroundColor: WHITE,
              borderColor: FPT_ORANGE_COLOR,
              borderWidth: 2,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: FPT_ORANGE_COLOR,
                fontSize: deviceWidth / 21,
                fontWeight: '600',
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width: deviceWidth / 3,
              backgroundColor: FPT_ORANGE_COLOR,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: WHITE,
                fontSize: deviceWidth / 21,
                fontWeight: '600',
              }}
            >
              Select Date
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default forwardRef(CalendarDateSelect);
