import React, { useEffect, useState } from 'react';
import { Button, Select } from '@mantine/core';
import { ChevronsRight, X } from 'tabler-icons-react';
import { useAppSelector } from '../../redux/hooks';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import BySlotChooseRoomModal from './by-slot-choose-room-modal.component';
import ChooseDeviceModal from './choose-device-modal.component';
import ConfirmModal from './confirm-modal.component';

interface ChooseMultiDayModalProps {
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

const ByMultiChooseSlotModal: React.FC<ChooseMultiDayModalProps> = (props) => {
  const [showChooseRoom, setShowChooseRoom] = useState(false);
  const [showChooseSlot, setShowChooseSlot] = useState<boolean>(true);
  const [showChooseDevice, setShowChooseDevice] = useState<boolean>(false);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [slotNames, setSlotNames] = useState<any[]>();
  const [slotInName, setSlotInName] = useState('');
  const [slotOutName, setSlotOutName] = useState('');
  const slotInfors = useAppSelector((state) => state.slot.slotInfor);

  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const result = slotInfors?.map((slot) => {
      return { value: slot.id, label: slot.name };
    });
    setSlotNames(result);
  }, []);

  useEffect(() => {
    if (props.formik.values.checkinSlot && props.formik.values.checkoutSlot) {
      const slotIn = slotInfors.find(
        (slot) => slot.id === props.formik.values.checkinSlot
      );
      const slotOut = slotInfors.find(
        (slot) => slot.id === props.formik.values.checkoutSlot
      );
      if (slotIn.slotNum > slotOut.slotNum) {
        setSlotInName(slotOut.name);
        setSlotOutName(slotIn.name);
        const tmp = props.formik.values.checkinSlot;
        props.formik.setFieldValue(
          'checkinSlot',
          props.formik.values.checkoutSlot
        );
        props.formik.setFieldValue('checkoutSlot', tmp);
      } else {
        setSlotOutName(slotOut.name);
        setSlotInName(slotIn.name);
      }
    }
  }, [props.formik.values.checkinSlot, props.formik.values.checkoutSlot]);

  useEffect(() => {
    if (props.formik.values.checkinDate && props.formik.values.checkoutDate) {
      if (props.formik.values.checkinDate > props.formik.values.checkoutDate) {
        const tmp = props.formik.values.checkinDate;
        props.formik.setFieldValue(
          'checkinDate',
          props.formik.values.checkoutDate
        );
        props.formik.setFieldValue('checkoutDate', tmp);
      }
    }
  }, [props.formik.values.checkinDate, props.formik.values.checkoutDate]);

  useEffect(() => {
    if (props.formik.values.checkinSlot) {
      const slotIn = slotInfors.find(
        (slot) => slot.id === props.formik.values.checkinSlot
      );

      setTimeStart(slotIn.timeStart);
    } else {
      setTimeStart('');
    }
  }, [props.formik.values.checkinSlot]);

  useEffect(() => {
    if (props.formik.values.checkoutSlot) {
      const slotOut = slotInfors.find(
        (slot) => slot.id === props.formik.values.checkoutSlot
      );

      setTimeEnd(slotOut.timeEnd);
    } else {
      setTimeEnd('');
    }
  }, [props.formik.values.checkoutSlot]);

  useEffect(() => {
    props.formik.values.checkinSlot = null;
    props.formik.values.checkoutSlot = null;
    if (props.formik.values.checkinDate) {
      const curr = new Date();
      const currTime = dayjs(curr).format('HH:mm:ss');
      const choosedDay = new Date(props.formik.values.checkinDate).getDate();

      const result = slotInfors?.map((slot) => {
        let isFree = true;

        if (choosedDay === curr.getDate() && currTime > slot.timeStart) {
          isFree = false;
        }

        if (isFree) {
          return {
            value: slot.id,
            label: slot.name,
            disabled: false,
          };
        } else {
          return {
            value: slot.id,
            label: slot.name,
            disabled: true,
          };
        }
      });
      setSlotNames(result);
    } else {
      const result = slotInfors?.map((slot) => {
        return { value: slot.id, label: slot.name, disabled: true };
      });
      setSlotNames(result);
    }
  }, [props.formik.values.checkinDate]);

  const handleNextChooseRoom = () => {
    if (
      props.formik.values.checkinDate === null ||
      props.formik.values.checkoutDate === null ||
      props.formik.values.checkinSlot === null ||
      props.formik.values.checkoutSlot === null
    ) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Miss some filed',
        message: 'Please choose day, slot start, slot end before to next step',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      setShowChooseRoom(true);
      setShowChooseSlot(false);
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
          flexDirection: 'column',
          // alignItems: 'flex-start',
          // justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            id="checkinDate"
            style={{ width: '250px' }}
            label="Date start"
            placeholder="Select date"
            radius="md"
            required
            inputFormat="DD/MM/YYYY"
            value={props.formik.values.checkinDate}
            minDate={dayjs(new Date()).toDate()}
            maxDate={dayjs(new Date())
              .startOf('weeks')
              .add(21, 'days')
              .toDate()}
            onChange={(date) => {
              props.formik.setFieldValue('checkinDate', date);
            }}
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 7}
          />

          <ChevronsRight
            size={28}
            strokeWidth={2}
            color={'black'}
            style={{ margin: 'auto 40px', position: 'relative', top: 15 }}
          />

          <DatePicker
            id="checkoutDate"
            style={{ width: '250px' }}
            label="Date end"
            placeholder="Select date"
            radius="md"
            required
            inputFormat="DD/MM/YYYY"
            value={props.formik.values.checkoutDate}
            minDate={dayjs(new Date()).toDate()}
            maxDate={dayjs(new Date())
              .startOf('weeks')
              .add(21, 'days')
              .toDate()}
            onChange={(date) => {
              props.formik.setFieldValue('checkoutDate', date);
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: 90 }}>
            <Select
              id="checkinSlot"
              style={{ width: '140px' }}
              label="From slot"
              required
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
              dropdownPosition="top"
              radius="md"
              data={slotNames || []}
              onChange={props.formik.handleChange('checkinSlot')}
              value={props.formik.values.checkinSlot}
            />
            <div style={{ paddingLeft: 10, fontSize: 15 }}>
              {timeStart.slice(0, 5)}
            </div>
          </div>
          <ChevronsRight
            size={28}
            strokeWidth={2}
            color={'black'}
            style={{ margin: 'auto 40px' }}
          />
          <div style={{ height: 90 }}>
            <Select
              id="checkoutSlot"
              style={{ width: '140px' }}
              label="To slot"
              required
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
              dropdownPosition="top"
              radius="md"
              data={slotNames || []}
              onChange={props.formik.handleChange('checkoutSlot')}
              value={props.formik.values.checkoutSlot}
            />
            <div style={{ paddingLeft: 10, fontSize: 15 }}>
              {timeEnd.slice(0, 5)}
            </div>
          </div>
        </div>
      </div>
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
        />
      ) : null}
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
          slotInName={slotInName}
          slotOutName={slotOutName}
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


export default ByMultiChooseSlotModal;
