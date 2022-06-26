import {
  Button,
  Checkbox,
  createStyles,
  ScrollArea,
  Select,
  Text,
  Textarea,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { ChevronsRight, Plus, Ticket, X } from 'tabler-icons-react';
import { useAppDispatch } from '../../redux/hooks';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { fetchRoomsName } from '../../redux/features/room-booking/thunk/fetch-rooms-name';
import { fetchUsername } from '../../redux/features/room-booking/thunk/fetch-username';
import SelectDevicesComponent from '../../components/booking-room/select-devices.component';
import { useFormik } from 'formik';
import moment from 'moment';

const slots = [
  {
    value: '1',
    label: 'Slot 1',
  },
  {
    value: '2',
    label: 'Slot 2',
  },
  {
    value: '3',
    label: 'Slot 3',
  },
  {
    value: '4',
    label: 'Slot 4',
  },
  {
    value: '5',
    label: 'Slot 5',
  },
  {
    value: '6',
    label: 'Slot 6',
  },
];

export default function NewBookingRequestComponent() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [listRoomName, setListRoomName] = useState<
    { value: string; lable: string }[]
  >([]);
  useEffect(() => {
    async function loadRoomName() {
      dispatch(fetchRoomsName())
        .unwrap()
        .then((response) => setListRoomName(response))
        .catch((e) => {
          alert(e);
        });
    }
    loadRoomName();
  }, [dispatch]);

  const [listUserName, setListUserName] = useState<
    { value: string; lable: string }[]
  >([]);

  const [deviceNum, setDeviceNum] = useState<number[]>([1]);

  useEffect(() => {
    async function loadUsername() {
      dispatch(fetchUsername())
        .unwrap()
        .then((response) => setListUserName(response))
        .catch((e) => {
          alert(e);
        });
    }
    loadUsername();
  }, [dispatch]);

  const [listDeviceChecked, setListDeviceChecked] = useState<
    { name: string; quantity: number }[]
  >([]);

  const checkIsChecked = (name) => {
    for (let i = 0; i < listDeviceChecked.length; i++) {
      if (listDeviceChecked[i].name === name) {
        return true;
      }
    }
    return false;
  };
  //   const getQuantity = (name) => {
  //     for (let i = 0; i < listDeviceChecked.length; i++) {
  //       if (listDeviceChecked[i].name === name) {
  //         return listDeviceChecked[i].quantity;
  //       }
  //     }
  //     return null;
  //   };
  //   const handleCheck = (device) => {
  //     setListDeviceChecked((prev) => {
  //       const isCheck = checkIsChecked(device.name);
  //       if (isCheck) {
  //         const newList = listDeviceChecked.filter(
  //           (item) => item.name !== device.name
  //         );
  //         formik.setFieldValue('device', newList);
  //         return newList;
  //       } else {
  //         const newList = [...prev, device];
  //         formik.setFieldValue('device', newList);
  //         return newList;
  //       }
  //     });
  //   };

  //   const handelChangeQuantiry = (name, quantity) => {
  //     for (let i = 0; i < listDeviceChecked.length; i++) {
  //       if (listDeviceChecked[i].name === name) {
  //         listDeviceChecked[i].quantity = parseInt(quantity);
  //         setListDeviceChecked((prev) => {
  //           formik.values.device = [...prev];
  //           return [...prev];
  //         });
  //       }
  //     }
  //   };

  const [bookDate, setbookDate] = useState(new Date());
  interface UserInfoModel {
    username: string;
  }
  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  const getNextSlot = () => {
    if (bookDate.getDate() === new Date().getDate()) {
      if (bookDate.getDay() !== 0) {
        const result = moment();
        if (result < moment('7:00 am', 'HH:mm a')) {
          return '1';
        } else if (
          moment('7:00 am', 'HH:mm') < result &&
          result <= moment('8:45 am', 'HH:mm')
        ) {
          return '2';
        } else if (
          moment('8:45 am', 'HH:mm') < result &&
          result <= moment('10:30 am', 'HH:mm')
        ) {
          return '3';
        } else if (
          moment('10:30 am', 'HH:mm') < result &&
          result <= moment('12:30 am', 'HH:mm')
        ) {
          return '4';
        } else if (
          moment('12:30 am', 'HH:mm') < result &&
          result <= moment('14:15 pm', 'HH:mm')
        ) {
          return '5';
        } else if (
          moment('14:15 pm', 'HH:mm') < result &&
          result <= moment('16:00 pm', 'HH:mm')
        ) {
          return '6';
        } else {
          bookDate.setDate(bookDate.getDate() + 1);
          return '1';
        }
      } else {
        bookDate.setDate(bookDate.getDate() + 1);
        return '1';
      }
    } else {
      return '1';
    }
  };

  const initialFormValues = {
    roomName: listRoomName[0] ? listRoomName[0].value : null,
    fromSlot: getNextSlot(),
    toSlot: getNextSlot(),
    bookDate: bookDate,
    requestBy: userInfo.username,
    device: [],
    reasonType: 'Meeting',
    reasonDescription: '',
  };

  // const UpdateSchema = Yup.object().shape({
  //   email: Yup.string().email('Invalid email').required('Required'),
  //   fullname: Yup.string()
  //     .min(5, 'Too short!')
  //     .max(50, 'Too long!')
  //     .required('Required'),
  //   phone: Yup.string()
  //     .min(10, 'Invalid Phone Number')
  //     .max(10, 'Too long!')
  //     .required('Required'),
  // });

  const handleUpdateSubmit = (values) => {
    console.log(values);
    setListDeviceChecked([]);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    // validationSchema: UpdateSchema,
    onSubmit: (values) => handleUpdateSubmit(values),
  });

  useEffect(() => {
    if (parseInt(formik.values.fromSlot) > parseInt(formik.values.toSlot)) {
      const tmp = formik.values.fromSlot;
      formik.values.fromSlot = formik.values.toSlot;
      formik.values.toSlot = tmp;
      console.log('Swap');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fromSlot, formik.values.toSlot]);

  const removeIndexFromArray = (val: number) => {
    console.log('Removing indexd: ' + val);
    const newArr = deviceNum.filter((num) => num !== val);
    setDeviceNum(newArr);
  };

  useEffect(() => {
    console.warn(deviceNum);
  }, [deviceNum.length]);
  // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21

  return (
    <div>
      <ScrollArea sx={{ height: 550 }}>
        <form
          style={{ padding: '10px 30px 10px' }}
          onSubmit={formik.handleSubmit}
        >
          <div
            style={{
              paddingBottom: '20px',
              borderBottom: 'solid',
              borderBottomWidth: 'thin',
              borderColor: 'lightgray',
            }}
          >
            <Text className={classes.modalBodyHeaderTitle}>Room</Text>
            <div className={classes.displayBackground}>
              <div className={classes.displayGridRoom}>
                <Select
                  id="roomName"
                  style={{ marginRight: 20, width: '200px' }}
                  label="Room name"
                  required
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={listRoomName}
                  searchable={true}
                  value={formik.values.roomName}
                  onChange={formik.handleChange('roomName')}
                />
                <Select
                  id="fromSlot"
                  style={{ marginRight: 20, width: '140px' }}
                  label="From slot"
                  required
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={slots}
                  onChange={formik.handleChange('fromSlot')}
                  value={formik.values.fromSlot}
                />
                <ChevronsRight
                  size={38}
                  strokeWidth={2}
                  color={'black'}
                  style={{ marginRight: 20 }}
                />
                <Select
                  id="toSlot"
                  style={{ width: '140px' }}
                  label="To slot"
                  required
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={slots}
                  onChange={formik.handleChange('toSlot')}
                  value={formik.values.toSlot}
                />
              </div>
              <div className={classes.displayGridRoom}>
                <DatePicker
                  id="bookDate"
                  style={{ width: '200px', marginRight: 20, marginTop: 10 }}
                  label="Book date"
                  placeholder="Select date"
                  radius="md"
                  required
                  inputFormat="DD/MM/YYYY"
                  value={formik.values.bookDate}
                  // onChange={(date) => setbookDate(date)}
                  onChange={(date) => {
                    formik.setFieldValue('bookDate', date);
                  }}
                  excludeDate={(date) =>
                    date.getDay() === 0 || date.getDay() === 7
                  }
                />
                <Select
                  id="requestBy"
                  style={{ width: '300px', marginTop: 10 }}
                  label="Requested by"
                  required
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={listUserName}
                  searchable={true}
                  value={formik.values.requestBy}
                  onChange={formik.handleChange('requestBy')}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              paddingBottom: '20px',
              borderBottom: 'solid',
              borderBottomWidth: 'thin',
              borderColor: 'lightgray',
            }}
          >
            <div style={{ flex: 'auto' }}>
              <Text className={classes.modalBodyHeaderTitle}>Devices</Text>
              <div id="device" className={classes.displayDevicesGroup}>
                {deviceNum.map((val, index) => {
                  return (
                    <SelectDevicesComponent
                      deviceNum={deviceNum.length}
                      setDeviceNum={() => setDeviceNum([...deviceNum, deviceNum[deviceNum.length - 1] + 1])}
                      currentKey={val}
                      removeItem={(val) =>
                        setDeviceNum(deviceNum.filter((v, index) => v !== val))
                      }
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <Text className={classes.modalBodyHeaderTitle}>Reason</Text>
            <div className={classes.displayBackground}>
              <Select
                id="reasonType"
                style={{ marginTop: 10, width: '150px' }}
                label="Reason Type"
                required
                transition="pop-top-left"
                transitionDuration={80}
                transitionTimingFunction="ease"
                radius="md"
                data={[
                  { value: 'Meeting', label: 'Meeting' },
                  { value: 'Capstone', label: 'Capstone' },
                  { value: 'Event', label: 'Event' },
                ]}
                value={formik.values.reasonType}
                onChange={formik.handleChange('reasonType')}
              />
              <Textarea
                id="reasonDescription"
                radius="md"
                label="Desciption (optional)"
                className={classes.displayGrid}
                value={formik.values.reasonDescription}
                onChange={formik.handleChange('reasonDescription')}
              />
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <Button
              style={{
                marginTop: 10,
                marginRight: 20,
                backgroundColor: FPT_ORANGE_COLOR,
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                marginTop: 10,
                marginRight: 20,
                backgroundColor: FPT_ORANGE_COLOR,
              }}
            >
              Save as draft
            </Button>
            <Button
              style={{ marginTop: 10, backgroundColor: FPT_ORANGE_COLOR }}
              type="submit"
            >
              Place a booking
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
}

const useStyles = createStyles({
  text: {
    marginLeft: 10,
    fontWeight: 600,
    fontSize: 30,
  },
  container: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 30,
    lineHeight: 1.55,
  },

  modalBodyHeaderTitle: {
    fontWeight: 500,
    fontSize: 20,
  },
  displayBackground: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 10,
  },
  displayGridRoom: {
    alignItems: 'flex-end',
    display: 'flex',
    '@media (max-width: 920px)': {
      flexDirection: 'row',
    },
    '@media (max-width: 540px)': {
      flexDirection: 'column',
    },
  },

  displayGrid: {
    marginTop: 10,
    '@media (max-width: 920px)': {
      width: '100%',
    },
    '@media (max-width: 540px)': {
      width: 220,
    },
  },

  displayDeviceButton: {
    marginLeft: 20,
    alignItems: 'end',
    display: 'flex',
  },
  displayDevicesGroup: {
    display: 'flex',
    flexDirection: 'column',
    gridTemplateColumns: 'auto auto auto',
    '@media (max-width: 1000px)': {
      gridTemplateColumns: 'auto auto',
    },
    '@media (max-width: 500px)': {
      gridTemplateColumns: 'auto',
    },
    backgroundColor: '#f3f3f3',
    padding: 10,
    gap: 20,
    borderRadius: 10,
  },
  displayDeviceGroup: {
    display: 'flex',
    // width: 300,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  numberInput: {
    width: 100,
  },
});
