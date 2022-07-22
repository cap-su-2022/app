import React from 'react';
import { useAppNavigation } from '../../../../hooks/use-app-navigation.hook';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { deviceHeight, deviceWidth } from '../../../../utils/device';
import { FPT_ORANGE_COLOR } from '@app/constants';

const RequestRoomBookingRecentlySearch: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recently search</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          <Text>ass</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 16,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: deviceWidth / 23,
  },
  itemContainer: {
    borderRadius: 8,
    display: 'flex',
    height: deviceHeight / 9,
    width: deviceWidth / 2.5,
    backgroundColor: FPT_ORANGE_COLOR,
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
});

export default RequestRoomBookingRecentlySearch;
