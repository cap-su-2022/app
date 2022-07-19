import React, { useEffect, useRef } from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import TrackBookingRoomFilter from './filter';
import BookingRequestItem from './track-booking-request-item';
import { fetchBookingRoomsByFilters } from '../../redux/features/room-booking/thunk/fetch-booking-room-by-filters.thunk';
import { useAppSelector } from '../../hooks/use-app-selector.hook';
import { BookingRoomsByFilters } from '../../redux/models/booking-rooms-by-filters.model';
import NotFound from '../../components/empty.svg';
import { deviceHeight, deviceWidth } from '../../utils/device';
import { BLACK } from '@app/constants';
import { BookingRoomsByFiltersResponse } from '../../redux/models/booking-rooms-by-filters-response.model';

const TrackBookingRoom: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const { filteredBookingRequests } = useAppSelector(
    (state) => state.roomBooking
  );

  const filterRef =
    useRef<React.ElementRef<typeof TrackBookingRoomFilter>>(null);

  const handleFilterSearch = () => {
    console.log(filterRef.current);
    dispatch(fetchBookingRoomsByFilters(filterRef.current))
      .unwrap()
      .catch(() => alert('Error while fetching data'));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TrackBookingRoomFilter
        ref={filterRef}
        handleFilterSearch={() => handleFilterSearch()}
      />
      {filteredBookingRequests?.length < 1 ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <NotFound width={deviceWidth / 1.5} height={deviceHeight / 2.5} />
          <Text
            style={{
              color: BLACK,
              fontSize: deviceWidth / 19,
              fontWeight: '600',
            }}
          >
            Data not found
          </Text>
        </View>
      ) : (
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          data={filteredBookingRequests}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          renderItem={(
            item: ListRenderItemInfo<BookingRoomsByFiltersResponse>
          ) => <BookingRequestItem key={item.index} item={item.item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackBookingRoom;
