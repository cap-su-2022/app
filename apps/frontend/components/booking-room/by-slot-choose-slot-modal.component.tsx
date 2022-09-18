import React, { useEffect, useState } from 'react';
import { Button, InputWrapper, Select, TextInput } from '@mantine/core';
import { ChevronsRight, ClipboardText, X } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { DatePicker, TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import BySlotChooseRoomModal from './by-slot-choose-room-modal.component';
import ChooseDeviceModal from './choose-device-modal.component';
import ConfirmModal from './confirm-modal.component';
import { IsUserHaveBookedSameSlot } from '../../redux/features/room-booking/thunk/fetch-room-booked-same-slot-of-user.thunk';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  listUsernames: any[];
}

interface UserInfoModel {
  avatar: string;
  fullname: string;
  role: string;
  phone: string;
  email: string;
  username: string;
  id: string;
  googleId: string;
  keycloakId: string;
  effdate: string;
  description: string;
  img: File;
}

const BySlotChooseSlotModal: React.FC<ChooseSlotModalProps> = (props) => {
  const [showChooseRoom, setShowChooseRoom] = useState(false);
  const [showChooseSlot, setShowChooseSlot] = useState<boolean>(true);
  const [showChooseDevice, setShowChooseDevice] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const holidays = useAppSelector((state) => state.holiday.holidaysMini);
  const dispatch = useAppDispatch();

  const isHoliday = (date) => {
    const dateFormat = dayjs(date).format('YYYY-MM-DD');
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].dateStart <= dateFormat &&
        holidays[i].dateEnd >= dateFormat
      ) {
        return true;
      }
    }
  };

  useEffect(() => {
    const currenTime = new Date();
    const currenTimeTimestamp = new Date().setHours(0, 0, 0, 0);
    const checkinDate = props.formik.values.checkinDate?.setHours(0, 0, 0, 0);
    const timeStart = props.formik.values.timeStart;
    const timeEnd = props.formik.values.timeEnd;
    if (
      checkinDate === currenTimeTimestamp &&
      (timeStart < currenTime || timeEnd < currenTime)
    ) {
      showNotification({
        id: 'time-invalid',
        color: 'red',
        title: 'The time you selected is over',
        message: 'Please select other time',
        icon: <X />,
        autoClose: 3000,
      });
    }
  }, [props.formik.values]);

  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  // useEffect(() => {
  //   if (props.formik.values.checkinSlot) {
  //     const slotIn = slotInfors.find(
  //       (slot) => slot.id === props.formik.values.checkinSlot
  //     );

  //     setTimeStart(slotIn.timeStart);
  //   } else {
  //     setTimeStart('');
  //   }
  // }, [props.formik.values.checkinSlot]);

  // useEffect(() => {
  //   if (props.formik.values.checkoutSlot) {
  //     const slotOut = slotInfors.find(
  //       (slot) => slot.id === props.formik.values.checkoutSlot
  //     );

  //     setTimeEnd(slotOut.timeEnd);
  //   } else {
  //     setTimeEnd('');
  //   }
  // }, [props.formik.values.checkoutSlot]);

  // useEffect(() => {
  //   props.formik.values.checkinSlot = null;
  //   props.formik.values.checkoutSlot = null;
  //   if (props.formik.values.checkinDate) {
  //     const curr = new Date();
  //     const currTime = dayjs(curr).format('HH:mm:ss');
  //     const choosedDay = new Date(props.formik.values.checkinDate).getDate();

  //     const result = slotInfors?.map((slot) => {
  //       let isFree = true;

  //       if (choosedDay === curr.getDate() && currTime > slot.timeStart) {
  //         isFree = false;
  //       }

  //       if (isFree) {
  //         return {
  //           value: slot.id,
  //           label: slot.name,
  //           disabled: false,
  //         };
  //       } else {
  //         return {
  //           value: slot.id,
  //           label: slot.name,
  //           disabled: true,
  //         };
  //       }
  //     });
  //     setSlotNames(result);
  //   } else {
  //     const result = slotInfors?.map((slot) => {
  //       return { value: slot.id, label: slot.name, disabled: true };
  //     });
  //     setSlotNames(result);
  //   }
  // }, [props.formik.values.checkinDate]);

  const handleNextChooseRoom = () => {
    if (
      props.formik.values.checkinDate === null ||
      props.formik.values.timeStart === null ||
      props.formik.values.timeEnd === null
    ) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Miss some filed',
        message: 'Please choose day, time start, time end before to next step',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      const currenTime = new Date();
      const currenTimeTimestamp = new Date().setHours(0, 0, 0, 0);
      const checkinDate = props.formik.values.checkinDate.setHours(0, 0, 0, 0);
      const timeStart = props.formik.values.timeStart;
      const timeEnd = props.formik.values.timeEnd;
      const _15minute = 15 * 60 * 1000;
      if (
        checkinDate === currenTimeTimestamp &&
        (timeStart < currenTime || timeEnd < currenTime)
      ) {
        showNotification({
          id: 'time-invalid',
          color: 'red',
          title: 'The time you selected is over',
          message: `Please choose a time interval greater than ${currenTime.getHours()}:${currenTime.getMinutes()}`,
          icon: <X />,
          autoClose: 3000,
        });
      } else if (timeEnd.getTime() < timeStart.getTime() + _15minute) {
        showNotification({
          id: 'time-invalid',
          color: 'red',
          title: 'The time interval you selected is too short',
          message: `For each request booking, a booking period of more than 15 minutes is required`,
          icon: <X />,
          autoClose: 3000,
        });
      } else {
        dispatch(
          IsUserHaveBookedSameSlot({
            checkinDate: props.formik.values.checkinDate,
            userId: props.formik.values.bookedFor || userInfo.id,
            timeStart: props.formik.values.timeStart,
            timeEnd: props.formik.values.timeEnd,
          })
        )
          .unwrap()
          .then((response) => {
            if (!response) {
              setShowChooseRoom(true);
              setShowChooseSlot(false);
            } else {
              showNotification({
                id: 'miss-data',
                color: 'red',
                title: `${
                  props.formik.values.bookedFor ? 'User' : 'You'
                } have orther requets at same time`,
                message: `${
                  props.formik.values.bookedFor ? 'User' : 'You'
                } already have request booked for ${response} at same time. Please choose another time`,
                icon: <X />,
                autoClose: 3000,
              });
            }
          });
      }
    }
  };

  const handleNextChooseDevice = () => {
    setShowChooseRoom(false);
    setShowChooseDevice(true);
  };

  const handleNextConfirm = () => {
    setShowConfirm(true);
    setShowChooseDevice(false);
  };

  const handleBackChooseRoom = () => {
    setShowChooseRoom(true);
    setShowChooseDevice(false);
  };

  const handleBackChooseSlot = () => {
    setShowChooseSlot(true);
    setShowChooseRoom(false);
  };

  const handleBackChooseDevice = () => {
    setShowChooseDevice(true);
    setShowConfirm(false);
  };

  const ChooseSlot = (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <DatePicker
          id="checkinDate"
          style={{ width: '200px', marginRight: 20 }}
          label="Checked in date"
          placeholder="Select date"
          radius="md"
          required
          inputFormat="DD/MM/YYYY"
          value={props.formik.values.checkinDate}
          minDate={dayjs(new Date()).toDate()}
          maxDate={
            userInfo.role === 'Staff'
              ? dayjs(new Date()).startOf('weeks').add(21, 'days').toDate()
              : null
          }
          // onChange={(date) => setbookDate(date)}
          onChange={(date) => {
            props.formik.setFieldValue('checkinDate', date);
          }}
          excludeDate={(date) => isHoliday(date)}
        />
        <InputWrapper required label="Time start">
          <TimeInput
            icon={<ClipboardText />}
            id="timeStart"
            name="timeStart"
            // error={formik.errors.timeEnd}
            onChange={(e) => props.formik.setFieldValue('timeStart', e)}
            style={{ width: '8rem' }}
            // radius="md"
            value={props.formik.values.timeStart}
          />
        </InputWrapper>
        <ChevronsRight
          size={28}
          strokeWidth={2}
          color={'black'}
          style={{ margin: '0 auto' }}
        />
        <InputWrapper required label="Time end">
          <TimeInput
            icon={<ClipboardText />}
            id="timeEnd"
            name="timeEnd"
            // error={formik.errors.timeEnd}
            onChange={(e) => props.formik.setFieldValue('timeEnd', e)}
            style={{ width: '8rem' }}
            // radius="md"
            value={props.formik.values.timeEnd}
          />
        </InputWrapper>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <InputWrapper
          required
          label="Number of participants"
          style={{ width: '200px' }}
        >
          <TextInput
            icon={<ClipboardText />}
            id="capacity"
            name="capacity"
            error={props.formik.errors.capacity}
            onChange={props.formik.handleChange}
            // className={classes.textInput}
            radius="md"
            value={props.formik.values.capacity}
          />
        </InputWrapper>
        {userInfo.role !== 'Staff' ? (
          <Select
            id="bookedFor"
            name="bookedFor"
            label="Who use room"
            placeholder="If not choose, the room's user auto is you"
            data={props.listUsernames}
            value={props.formik.values.bookedFor || undefined}
            error={props.formik.errors.bookedFor}
            onChange={props.formik.handleChange('bookedFor')}
            searchable={true}
            style={{ flex: 1 }}
          />
        ) : null}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 10 }}>
        <Button onClick={() => handleNextChooseRoom()} color="green">
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {showChooseSlot && ChooseSlot}
      {showChooseRoom && (
        <BySlotChooseRoomModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleBackChooseSlot={handleBackChooseSlot}
          handleNextChooseDevice={handleNextChooseDevice}
        />
      )}
      {showChooseDevice && (
        <ChooseDeviceModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleNextConfirm={handleNextConfirm}
          handleBack={handleBackChooseRoom}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleBackChooseDevice={handleBackChooseDevice}
        />
      )}
    </>
  );
};

export default BySlotChooseSlotModal;
