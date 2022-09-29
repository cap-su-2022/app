import React, { useEffect, useState } from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
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
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  DeviceMobileIcon,
  ExclamationCircleIcon,
  SortDescendingIcon,
} from 'react-native-heroicons/outline';
import DelayInput from 'react-native-debounce-input';
import { useAppSelector } from '../../hooks/use-app-selector.hook';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../hooks/use-app-navigation.hook';
import { Device } from '../../redux/models/device.model';
import { step3ScheduleRoomBooking } from '../../redux/features/room-booking/slice';
import AlertModal from '../../components/modals/alert-modal.component';
import { fetchAllDevices } from '../../redux/features/devices/thunk/fetch-all';
import RequestRoomBookingHeader from './request-room-booking/header';
import { boxShadow } from '../../utils/box-shadow.util';
import NotFound from '../../components/empty.svg';
import { fetchMaxBorrowDevicesQuantity } from '../../redux/features/system/thunk/fetch-max-borrow-devices-quantity.thunk';
import {
  handleSetProvidedDevices,
  updateAutoBookingRequest,
  updateBookingRequestId
} from "../../redux/features/room-booking-v2/slice";

const RoomBooking2: React.FC = () => {
  const navigate = useAppNavigation();

  const devices = useAppSelector((state) => state.device.devices);
  const dispatch = useAppDispatch();
  const [devicesArray, setDevicesArray] = useState([]);
  const [deviceSelectedDevice, setDeviceSelectedDevice] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<'ASC' | 'DESC'>('ASC');
  const [isErrorModalShown, setErrorModalShown] = useState<boolean>(false);


  const providedDevices = useAppSelector((state) => state.bookedRequest.providedDevices);

  useEffect(() => {
    if (providedDevices && providedDevices.length > 0) {
      setDeviceSelectedDevice(providedDevices);
    }
  }, [providedDevices]);

  const [maxQuantity, setMaxQuantity] = useState<number>(100);

  useEffect(() => {
    dispatch(fetchMaxBorrowDevicesQuantity())
      .unwrap()
      .then((val) => setMaxQuantity(val));
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllDevices({
        search: search,
        dir: sort,
      })
    )
      .unwrap()
      .then((value) => {
        const deviceArrayHaveQuantity = value.map((value) => ({
          ...value,
          quantity: 1,
        }));
        setDevicesArray(deviceArrayHaveQuantity);
      });
  }, [search, sort, dispatch]);

  const payload = useAppSelector((state) => state.bookedRequest.request);

  const handleNextStep = () => {
    updateAutoBookingRequest({
      ...payload,

    })
    const devices = [];
    for (let i = 0; i < deviceSelectedDevice.length; i++) {
      devices.push({
        id: deviceSelectedDevice[i].id,
        quantity: deviceSelectedDevice[i].quantity,
      });
    }
    dispatch(handleSetProvidedDevices(devices));
    navigate.pop();
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
                style={{
                  height: 50,
                }}
                delayTimeout={400}
                minLength={0}
                maxLength={50}
                value={search}
                onChangeText={(text) => setSearch(text.toString())}
                placeholder="Search for devices by name..."
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => (sort === 'ASC' ? setSort('DESC') : setSort('ASC'))}
            style={styles.filterSortButton}
          >
            {sort === 'ASC' ? (
              <SortAscendingIcon color={BLACK} />
            ) : (
              <SortDescendingIcon color={BLACK} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const DeviceRenderItem: React.FC<{
    device: any;
    index: number;
  }> = (props) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleSelectedDevice = () => {
      deviceSelectedDevice?.filter((device) => device.id === props.device.id)[0]
        ? setDeviceSelectedDevice(
            deviceSelectedDevice.filter(
              (device) => device.id !== props.device.id
            )
          )
        : setDeviceSelectedDevice([...deviceSelectedDevice, props.device]);
    };

    const handlePlusQuantity = () => {
      if (quantity >= 0 && quantity < maxQuantity) {
        const copyArray = deviceSelectedDevice;
        const itemSelectedIndex = copyArray.findIndex(
          (device) => device.id === props.device.id
        );
        copyArray[itemSelectedIndex].quantity += 1;
        setDeviceSelectedDevice(copyArray);
        setQuantity(quantity + 1);
      }
    };

    const handleReduceQuantity = () => {
      if (quantity - 1 === 0) {
        return setDeviceSelectedDevice(
          deviceSelectedDevice?.filter((device) => device.id !== props.device.id)
        );
      }
      setQuantity(quantity - 1);
      const copyArray = deviceSelectedDevice;
      const itemSelectedIndex = copyArray.findIndex(
        (device) => device.id === props.device.id
      );
      copyArray[itemSelectedIndex].quantity -= 1;
      setDeviceSelectedDevice(copyArray);
    };

    return (
      <TouchableOpacity
        key={props.device}
        onPress={() => {
          handleSelectedDevice();
        }}
        style={[
          styles.selectCircleButton,
          deviceSelectedDevice.filter(
            (device) => device.id === props.device.id
          )[0]
            ? {
                borderWidth: 1,
                borderColor: FPT_ORANGE_COLOR,
              }
            : null,
          boxShadow(styles),
        ]}
      >
        <View style={styles.deviceIconContainer}>
          <DeviceMobileIcon color={FPT_ORANGE_COLOR} />
        </View>

        <View style={styles.deviceContainer}>
          <View style={styles.deviceDescriptionContainer}>
            <Text
              style={{
                color: GRAY,
                marginLeft: 6,
              }}
            >
              <Text
                style={{
                  color: BLACK,
                  fontSize: deviceWidth / 26,
                  fontWeight: '500',
                }}
              >
                Name:
              </Text>
              {props.device.name}
            </Text>

            <Text
              style={{
                color: GRAY,
                marginLeft: 6,
              }}
            >
              <Text
                style={{
                  color: BLACK,
                  fontSize: deviceWidth / 26,
                  fontWeight: '500',
                }}
              >
                Type:
              </Text>
              {props.device.type}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              height: 70,
              paddingHorizontal: 10,
            }}
          >
            {deviceSelectedDevice.find(
              (device) => device.id === props.device.id
            ) ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleReduceQuantity();
                  }}
                  style={{
                    height: 30,
                    width: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: FPT_ORANGE_COLOR,
                    borderWidth: 1,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
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
                  editable={false}
                  value={String(props.device.quantity)}
                  keyboardType="numeric"
                  textAlignVertical="center"
                  onChangeText={(e) => {
                    if (parseInt(e) <= maxQuantity) {
                      setQuantity(parseInt(e));
                      const copyArray = deviceSelectedDevice;
                      const itemSelectedIndex = copyArray.findIndex(
                        (device) => device.id === props.device.id
                      );
                      copyArray[itemSelectedIndex].quantity = parseInt(e);
                      setDeviceSelectedDevice(copyArray);
                    } else {
                      alert(
                        'You already reached the maximum limit of this quantity. Please contact the librarians to get support.'
                      );
                    }
                  }}
                  style={{
                    textAlign: 'center',
                    paddingTop: 5,
                    color: FPT_ORANGE_COLOR,
                    textAlignVertical: 'center',
                    height: 30,
                    width: 40,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopColor: FPT_ORANGE_COLOR,
                    borderBottomColor: FPT_ORANGE_COLOR,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handlePlusQuantity();
                  }}
                  style={{
                    height: 30,
                    width: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: FPT_ORANGE_COLOR,
                    borderWidth: 1,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
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
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RequestRoomBookingHeader />
      <Filtering />

      <View style={styles.container}>
        {devices.length > 0 ? (
          <VirtualizedList
            style={{
              marginBottom: deviceWidth / 4.2,
            }}
            showsVerticalScrollIndicator={false}
            data={devicesArray}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={(item: ListRenderItemInfo<Device>) => (
              <DeviceRenderItem
                key={item.index}
                device={item.item}
                index={item.index}
              />
            )}
          />
        ) : (
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexGrow: 0.75,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <NotFound width={deviceWidth / 2} height={250} />
            <Text
              style={{
                color: BLACK,
                fontSize: deviceWidth / 20,
                fontWeight: '500',
              }}
            >
              Data not found!
            </Text>
          </View>
        )}
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
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: 200,
  },
  deviceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 30,
    width: deviceWidth / 4.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    flex: 1,
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
    color: BLACK,
    fontSize: deviceWidth / 25,
    fontWeight: '600',
    paddingTop: 6,
    paddingHorizontal: 10,
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
