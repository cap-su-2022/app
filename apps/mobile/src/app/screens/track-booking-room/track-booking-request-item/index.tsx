import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLACK, FPT_ORANGE_COLOR, GRAY, WHITE } from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import { BookingRoomsByFilters } from '../../../redux/models/booking-rooms-by-filters.model';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { fetchRoomBookingById } from '../../../redux/features/room-booking/thunk/fetch-room-booking-by-id.thunk';
import { BookingRoomsByFiltersResponse } from '../../../redux/models/booking-rooms-by-filters-response.model';

interface BookingRequestItemProps {
  item: BookingRoomsByFiltersResponse;
}
const BookingRequestItem: React.FC<BookingRequestItemProps> = (props) => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  const handleFetchBookingRequest = (id: string) => {
    dispatch(fetchRoomBookingById(id))
      .unwrap()
      .then(() => navigate.navigate('ACCEPT_ROOM_BOOKING'))
      .catch(() => alert('Failed while fetching data'));
  };

  return (
    <TouchableOpacity
      onPress={() => handleFetchBookingRequest(props.item.id)}
      style={{
        height: 140,
        backgroundColor: WHITE,
        width: deviceWidth / 1.05,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          marginLeft: 10,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Text style={styles.textTitle}>Requested by:</Text>
          <Text style={styles.textValue}>{props.item.requestedBy}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          <Text style={styles.textTitle}>Room name:</Text>
          <Text style={styles.textValue}>{props.item.roomName}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          <Text style={styles.textTitle}>Room type:</Text>
          <Text style={styles.textValue}>{props.item.roomType}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          <Text style={styles.textTitle}>Checkin date:</Text>
          <Text style={styles.textValue}>
            {dayjs(props.item.checkinDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          <Text style={styles.textTitle}>Slot:</Text>
          <Text style={styles.textValue}>
            Slot {props.item.slotStart} - Slot {props.item.slotEnd}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'absolute',
          right: 10,
          top: 10,
          height: 120,
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            width: 90,
            height: 25,
            backgroundColor: FPT_ORANGE_COLOR,
            alignSelf: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: deviceWidth / 30,
              fontWeight: '600',
              color: WHITE,
            }}
          >
            {props.item.status}
          </Text>
        </View>
        <View style={styles.viewMoreButton}>
          <Text style={styles.viewMoreButtonText}>View more</Text>
          <ChevronRightIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: '600',
    fontSize: deviceWidth / 30,
    color: BLACK,
  },
  textValue: {
    marginLeft: 5,
    fontWeight: '400',
    fontSize: deviceWidth / 30,
    color: GRAY,
  },
  viewMoreButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    width: deviceWidth / 3.5,
    borderColor: FPT_ORANGE_COLOR,
    height: 30,
  },
  viewMoreButtonText: {
    color: FPT_ORANGE_COLOR,
    fontSize: deviceWidth / 26,
    fontWeight: '600',
  },
});

export default BookingRequestItem;
