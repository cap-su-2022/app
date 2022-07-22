import {
  BLACK,
  FPT_ORANGE_COLOR,
  INPUT_GRAY_COLOR,
  WHITE,
} from '@app/constants';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { deviceHeight, deviceWidth } from '../../../../utils/device';
import {
  BellIcon,
  ChatAlt2Icon,
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardIcon,
  ClipboardListIcon,
  HeartIcon,
  PlusIcon,
  UserIcon,
  XIcon,
} from 'react-native-heroicons/outline';
import Divider from '../../../../components/text/divider';

const selectedData = [
  {
    id: 1,
    name: 'Request for room booking',
    icon: <ClipboardCopyIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 2,
    name: 'Check-out room booking',
    icon: <ClipboardCheckIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 3,
    name: 'Track for booking requests',
    icon: <ClipboardListIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 4,
    name: 'Resolve feedbacks',
    icon: <ChatAlt2Icon color={WHITE} size={deviceWidth / 16} />,
  },
];

const availableData = [
  {
    id: 1,
    name: 'Check-in room booking',
    icon: <ClipboardIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 2,
    name: 'My profile',
    icon: <UserIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 3,
    name: 'Booking rooms wishlist',
    icon: <HeartIcon color={WHITE} size={deviceWidth / 16} />,
  },
  {
    id: 4,
    name: 'My notifications',
    icon: <BellIcon color={WHITE} size={deviceWidth / 16} />,
  },
];

const QuickAccessControlScreen: React.FC<any> = () => {
  const handleRemoveQuickAccess = (id: number) => {};

  const [isNotificationBellShown, setNotificationBellShown] =
    useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.includedQAContainer]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: deviceWidth / 25,
                  fontWeight: '500',
                }}
              >
                Show notification bell icon
              </Text>
              <Switch
                value={isNotificationBellShown}
                onValueChange={(e) => setNotificationBellShown(e)}
              />
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.headerTitle}>Included Quick Accesses</Text>
          <View style={styles.includedQAContainer}>
            {selectedData.map((data, index) => (
              <>
                <View
                  style={[
                    styles.includedQARow,
                    selectedData.length - 1 === index
                      ? { marginBottom: 10 }
                      : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveQuickAccess(data.id)}
                    style={styles.removeQAIcon}
                  >
                    <XIcon color={WHITE} size={deviceWidth / 20} />
                  </TouchableOpacity>
                  <View style={styles.QAIcon}>{data.icon}</View>
                  <Text style={styles.QAName}>{data.name}</Text>
                </View>
                {selectedData.length > 0 &&
                selectedData.length - 1 !== index ? (
                  <Divider num={deviceWidth / 9} />
                ) : null}
              </>
            ))}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.headerTitle}>Available Quick Accesses</Text>
          <View style={styles.includedQAContainer}>
            {availableData.map((data, index) => (
              <>
                <View
                  style={[
                    styles.includedQARow,
                    selectedData.length - 1 === index
                      ? { marginBottom: 10 }
                      : null,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveQuickAccess(data.id)}
                    style={styles.removeQAIcon}
                  >
                    <PlusIcon color={WHITE} size={deviceWidth / 20} />
                  </TouchableOpacity>
                  <View style={styles.QAIcon}>{data.icon}</View>
                  <Text style={styles.QAName}>{data.name}</Text>
                </View>
                {selectedData.length > 0 &&
                selectedData.length - 1 !== index ? (
                  <Divider num={deviceWidth / 9} />
                ) : null}
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  headerTitle: {
    marginBottom: 10,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
  },
  includedQAContainer: {
    borderColor: INPUT_GRAY_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: WHITE,
  },
  includedQARow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  removeQAIcon: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: FPT_ORANGE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  QAIcon: {
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    height: 35,
    width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  QAName: {
    marginLeft: 10,
    color: BLACK,
    fontWeight: '500',
    fontSize: deviceWidth / 26,
  },
});

export default QuickAccessControlScreen;
