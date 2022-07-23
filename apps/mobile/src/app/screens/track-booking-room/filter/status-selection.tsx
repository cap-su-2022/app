import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckIcon } from 'react-native-heroicons/outline';
import { FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { deviceWidth } from '../../../utils/device';

const statusData = [
  {
    id: 0,
    label: 'All',
    value: undefined,
    style: { width: deviceWidth / 9.5 },
    slotContainerLeftStyle: { left: 5 },
  },
  {
    id: 1,
    label: 'Pending',
    value: 'PENDING',
    style: { width: deviceWidth / 5.5 },
    slotContainerLeftStyle: { left: 55 },
  },
  {
    id: 2,
    label: 'Booked',
    value: 'BOOKED',
    style: { width: deviceWidth / 6 },
    slotContainerLeftStyle: { left: 135 },
  },
  {
    id: 3,
    label: 'Checked In',
    value: 'CHECKED_IN',
    style: { width: deviceWidth / 4.5 },
    slotContainerLeftStyle: { left: 210 },
  },
  {
    id: 4,
    label: 'Checked Out',
    value: 'CHECKED_OUT',
    style: { width: deviceWidth / 4 },
    slotContainerLeftStyle: { left: 310 },
  },
  {
    id: 5,
    label: 'Cancelled',
    value: 'CANCELLED',
    style: { width: deviceWidth / 5 },
    slotContainerLeftStyle: { left: 415 },
  },
];

interface TrackBookingRoomFilterStatusSelectionProps {
  handleSearch(): void;
  status: string[];
  setStatus(val: string[]): void;
}

const TrackBookingRoomFilterStatusSelection: React.FC<
  TrackBookingRoomFilterStatusSelectionProps
> = (props) => {
  const handleSelectStatus = (statusFilter) => {
    if (
      !props.status.some((val) => statusFilter.value === val) &&
      statusFilter.value
    ) {
      props.setStatus([...props.status, statusFilter.value]);
    } else if (props.status.some((val) => statusFilter.value === val)) {
      props.setStatus(props.status.filter((stt) => stt !== statusFilter.value));
    } else if (!statusFilter.value) {
      props.setStatus([]);
    }
  };

  const StatusCheckIcon = () => {
    return (
      <View style={[styles.selectContainer, { left: 5 }]}>
        <CheckIcon color={WHITE} size={deviceWidth / 30} />
      </View>
    );
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={styles.container}>
        {statusData.map((statusFilter) => (
          <>
            <TouchableOpacity
              onPress={() => handleSelectStatus(statusFilter)}
              key={statusFilter.id}
              style={[styles.filterTypeButton, statusFilter.style]}
            >
              <Text style={styles.filterTypeText}>{statusFilter.label}</Text>
            </TouchableOpacity>
            {props.status.some((val) => val === statusFilter.value) ? (
              <View
                style={[
                  styles.selectContainer,
                  statusFilter.slotContainerLeftStyle,
                ]}
              >
                <CheckIcon color={WHITE} size={deviceWidth / 30} />
              </View>
            ) : props.status.length < 1 ? (
              <StatusCheckIcon />
            ) : null}
          </>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  filterTypeButton: {
    marginLeft: 10,
    borderRadius: 8,
    height: 30,
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTypeText: {
    color: FPT_ORANGE_COLOR,
    fontWeight: '600',
    fontSize: deviceWidth / 30,
  },

  selectContainer: {
    height: 15,
    width: 15,
    borderRadius: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
  },
});

export default TrackBookingRoomFilterStatusSelection;