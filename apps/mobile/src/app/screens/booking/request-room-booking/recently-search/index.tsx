import React from 'react';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { deviceHeight, deviceWidth } from '../../../../utils/device';
import { BLACK, FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
} from 'react-native-heroicons/outline';
import { LOCAL_STORAGE } from '../../../../utils/local-storage';

const RequestRoomBookingRecentlySearch: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();
  const user = LOCAL_STORAGE.getString('user');
  const historySearch = user
    ? LOCAL_STORAGE.getString(JSON.parse(user).username)
    : undefined;

  let historyArray = [];
  if (typeof historySearch !== 'undefined') {
    historyArray = new Function('return [' + historySearch + '];')();
  }

  const RecentlyHistory = (props, index) => {
    return (
      <View style={styles.itemContainer} key={index}>
        <View style={styles.itemWrapper}>
          <HomeIcon color={BLACK} size={deviceWidth / 16} />
          <Text style={styles.textContent}>{props.roomName}</Text>
        </View>
        <View style={styles.rowContent}>
          <CalendarIcon color={BLACK} size={deviceWidth / 16} />
          <Text style={styles.textContent}>{props.fromDay}</Text>
        </View>
        <View style={styles.rowContent}>
          <ClockIcon color={BLACK} size={deviceWidth / 16} />
          <Text style={styles.textContent}>{props.slotName || 'N/A'}</Text>
        </View>
      </View>
    );
  };

  if (!historySearch) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recently search</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {typeof historySearch !== 'undefined'
          ? historyArray.map((history, index) => {
              return RecentlyHistory(history, index);
            })
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 6,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: deviceWidth / 20,
    marginLeft: 10,
  },
  itemContainer: {
    borderRadius: 8,
    display: 'flex',
    marginLeft: 10,
    marginBottom: 10,
    height: deviceHeight / 7.8,
    width: deviceWidth / 2,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    marginTop: 10,
    elevation: 7,
  },
  textContent: {
    fontWeight: '600',
    marginLeft: 6,
  },
  rowContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
  },
});

export default RequestRoomBookingRecentlySearch;
