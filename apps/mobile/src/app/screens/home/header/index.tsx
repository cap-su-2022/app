import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLACK, FPT_ORANGE_COLOR, WHITE } from '@app/constants';
import { BellIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deviceWidth } from '../../../utils/device';
import { boxShadow } from '../../../utils/box-shadow.util';
import { LOCAL_STORAGE } from '../../../utils/local-storage';
import { useAppSelector } from '../../../hooks/use-app-selector.hook';

const HomeScreenHeader: React.FC<any> = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { isNotificationBellShown } = useAppSelector((state) => state.system);

  return (
    <View style={styles.container}>
      <Text style={styles.textLg}>Hello {user.fullname}</Text>
      {isNotificationBellShown ? (
        <TouchableOpacity
          style={[boxShadow(styles), styles.notificationContainer]}
        >
          <BellIcon color={WHITE} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
  },
  textLg: {
    color: BLACK,
    fontWeight: '600',
    fontSize: deviceWidth / 21,
  },
  notificationContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreenHeader;
