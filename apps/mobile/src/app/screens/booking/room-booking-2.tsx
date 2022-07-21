import React, { useEffect, useState } from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { SearchIcon, SortAscendingIcon } from 'react-native-heroicons/solid';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  LIGHT_GRAY,
  WHITE,
} from '@app/constants';
import { deviceWidth } from '../../utils/device';
import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  DeviceMobileIcon,
  ExclamationCircleIcon,
} from 'react-native-heroicons/outline';
import { fetchBookingRoomDevices } from '../../redux/features/room-booking/thunk/fetch-booking-room-devices.thunk';
import DelayInput from 'react-native-debounce-input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../hooks/use-app-selector.hook';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { Device } from '../../redux/models/device.model';
import { step3ScheduleRoomBooking } from '../../redux/features/room-booking/slice';
import AlertModal from '../../components/modals/alert-modal.component';
import { LOCAL_STORAGE } from '../../utils/local-storage';

const RoomBooking2: React.FC = () => {
  const navigate = useAppNavigation();

  const devices = useAppSelector((state) => state.roomBooking.devices);
  const dispatch = useAppDispatch();

  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const [deviceNames, setDeviceNames] = useState<string[]>([]);

  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'ASC' | 'DESC'>('ASC');
  const [isErrorModalShown, setErrorModalShown] = useState<boolean>(false);
  useEffect(() => {
    dispatch(
      fetchBookingRoomDevices({
        name: search,
        sort: sort,
      })
    );
  }, [search, sort, dispatch]);

  const handleNextStep = () => {
    if (deviceIds.length < 1) {
      setErrorModalShown(true);
    } else {
      const devices = [];
      for (let i = 0; i < deviceIds.length; i++) {
        devices.push({
          label: deviceNames[i],
          value: deviceIds[i],
          quantity: 1,
        });
      }
      navigate.navigate('ROOM_BOOKING_3');
      dispatch(
        step3ScheduleRoomBooking({
          devices: devices,
        })
      );
    }
  };

  const Filtering: React.FC = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeaderText}>FILTERING</Text>
        <View style={styles.filterBodyContainer}>
          <View style={styles.filterInputContainer}>
            <View style={styles.filterInputIconContainer}>
              <SearchIcon color={BLACK} />
            </View>
            <View style={styles.filterInput}>
              <DelayInput
                minLength={0}
                value={search}
                onChangeText={(text) => setSearch(text.toString())}
                placeholder="Search by device name"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.filterSortButton}>
            <SortAscendingIcon color={BLACK} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const DeviceRenderItem: React.FC<{
    device: Device;
  }> = (props) => {
    return (
      <TouchableOpacity
        key={props.device.id}
        onPress={() => {
          deviceIds.filter((id) => id === props.device.id)[0]
            ? setDeviceIds(deviceIds.filter((id) => id !== props.device.id))
            : setDeviceIds([...deviceIds, props.device.id]);
          deviceNames.filter((name) => name === props.device.name)[0]
            ? setDeviceNames(
                deviceIds.filter((name) => name !== props.device.name)
              )
            : setDeviceNames([...deviceNames, props.device.name]);
        }}
        style={[
          styles.selectCircleButton,
          deviceIds.filter((id) => id === props.device.id)[0]
            ? {
                borderWidth: 2,
                borderColor: FPT_ORANGE_COLOR,
              }
            : null,
        ]}
      >
        <View style={styles.deviceIconContainer}>
          <DeviceMobileIcon color={FPT_ORANGE_COLOR} />
        </View>

        <View style={styles.deviceContainer}>
          <View style={styles.deviceDescriptionContainer}>
            <Text
              style={{
                color: BLACK,
                fontSize: deviceWidth / 24,
                fontWeight: '600',
              }}
            >
              {props.device.name}
            </Text>
            <Text
              style={{
                fontSize: deviceWidth / 26,
              }}
            >
              Device Code:{' '}
              {props.device.id.substring(
                props.device.id.length - 12,
                props.device.id.length
              )}
            </Text>
          </View>

          <View
            style={{
              marginTop: -20,
              marginRight: 10,
            }}
          >
            <TouchableOpacity style={styles.viewDetailButton}>
              <Text style={styles.viewDetailButtonText}>View detail</Text>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: FPT_ORANGE_COLOR,
                  borderWidth: 2,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: FPT_ORANGE_COLOR,
                    fontWeight: '600',
                    fontSize: deviceWidth / 23,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 30,
                  width: 30,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderTopColor: FPT_ORANGE_COLOR,
                  borderBottomColor: FPT_ORANGE_COLOR,
                  borderTopWidth: 2,
                  borderBottomWidth: 2,
                }}
              />
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: FPT_ORANGE_COLOR,
                  borderWidth: 2,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: FPT_ORANGE_COLOR,
                    fontWeight: '600',
                    fontSize: deviceWidth / 23,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Filtering />
          {/*<VirtualizedList*/}
          {/*  getItemCount={(data) => data.length}*/}
          {/*  getItem={(data, index) => data[index]}*/}
          {/*  renderItem={(item: ListRenderItemInfo<Device>) => (*/}
          {/*    <DeviceRenderItem device={item.item} />*/}
          {/*  )}*/}
          {/*  data={devices}*/}
          {/*/>*/}
          {devices.map(device => <DeviceRenderItem device={device}/>) }
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigate.pop()}
            style={{
              borderRadius: 8,
              borderWidth: 2,
              height: 50,
              width: deviceWidth / 2.2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: FPT_ORANGE_COLOR,
            }}
          >
            <ChevronDoubleLeftIcon
              size={deviceWidth / 18}
              color={FPT_ORANGE_COLOR}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: deviceWidth / 21,
                color: FPT_ORANGE_COLOR,
              }}
            >
              Return back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNextStep()}
            style={styles.nextStepButton}
          >
            <ChevronRightIcon color={WHITE} />
            <Text style={styles.nextStepButtonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AlertModal
        isOpened={isErrorModalShown}
        height={deviceWidth / 1.7}
        width={deviceWidth / 1.3}
        toggleShown={() => setErrorModalShown(!isErrorModalShown)}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ExclamationCircleIcon
              size={deviceWidth / 8}
              color={FPT_ORANGE_COLOR}
            />
            <Text
              style={{
                color: BLACK,
                fontWeight: '500',
                fontSize: deviceWidth / 23,
                textAlign: 'center',
              }}
            >
              Please choose device(s) before going to the next step
            </Text>
          </View>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: deviceWidth / 1.7,
              backgroundColor: FPT_ORANGE_COLOR,
              borderRadius: 8,
            }}
            onPress={() => setErrorModalShown(false)}
          >
            <Text
              style={{
                color: WHITE,
                fontSize: deviceWidth / 23,
                fontWeight: '600',
              }}
            >
              I understand
            </Text>
          </TouchableOpacity>
        </View>
      </AlertModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deviceDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deviceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  deviceIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    marginLeft: 10,
  },
  selectCircleButton: {
    backgroundColor: WHITE,
    display: 'flex',
    margin: 10,
    height: 90,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectOn: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    position: 'absolute',
    zIndex: 2,
    left: -10,
    top: -10,
    backgroundColor: WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectOff: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: GRAY,
    position: 'absolute',
    zIndex: 2,
    left: -10,
    top: -10,
    backgroundColor: WHITE,
  },
  viewDetailButtonText: {
    color: FPT_ORANGE_COLOR,
  },
  viewDetailButton: {
    borderColor: FPT_ORANGE_COLOR,
    borderWidth: 1,
    width: deviceWidth / 5,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 40,
    marginRight: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  nextStepButtonText: {
    fontWeight: '600',
    fontSize: deviceWidth / 21,
    color: WHITE,
  },
  nextStepButton: {
    height: 50,
    width: deviceWidth / 2.2,
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,

  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: WHITE,
    height: 100,
    borderRadius: 8,
  },
  filterHeaderText: {
    color: GRAY,
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 10,
  },
  filterBodyContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterInputIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: LIGHT_GRAY,
  },
  filterInput: {
    backgroundColor: LIGHT_GRAY,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
    width: deviceWidth / 1.6,
  },
  filterSortButton: {
    width: 50,
    height: 50,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoomBooking2;
