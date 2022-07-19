import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  ChevronsRight,
  ClipboardText,
  FileDescription,
  X,
} from 'tabler-icons-react';
import { useAppDispatch } from '../../redux/hooks';
import { FormikProps } from 'formik';
import { getRoomById } from '../../redux/features/room/thunk/get-room-by-id';
import ChooseSlotModal from './by-room-choose-slot-modal.component';
import { showNotification } from '@mantine/notifications';
import ChooseDeviceModal from './choose-device-modal.component';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import BySlotChooseRoomModal from './by-slot-choose-room-modal.component';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  roomNames: any[];
  slotNames: any[];
  deviceNames: any[];
  reasonNames: any[];
}

const BySlotChooseSlotModal: React.FC<ChooseSlotModalProps> = (props) => {
  // const { classes } = useStyles();
  const [showChooseRoom, setShowChooseRoom] = useState(false);
  const [showChooseSlot, setShowChooseSlot] = useState<boolean>(true);
  const [showChooseDevice, setShowChooseDevice] = useState<boolean>(false);
  const [slotNames, setSlotName] = useState<any[]>(props.slotNames);

  // const dispatch = useAppDispatch();

  useEffect(() => {
    props.formik.values.checkinSlot = null;
    props.formik.values.checkoutSlot = null;
    if (props.formik.values.checkinDate) {
      const curr = new Date();
      const currTime = dayjs(curr).format('HH:mm:ss');
      const choosedDay = new Date(props.formik.values.checkinDate).getDate();

      const result = slotNames.map((slot, indexSlot) => {
        let isFree = true;
        let isOverSlot = false;

        if (choosedDay === curr.getDate() && currTime > slot.timeStart) {
          isFree = false;
        }

        if (choosedDay === curr.getDate() - curr.getDay() + 6) {
          if (indexSlot > 2) {
            isOverSlot = true;
          }
        }

        if (!isOverSlot) {
          if (isFree) {
            return {
              ...slot,
              disabled: false,
            };
          } else {
            return {
              ...slot,
              disabled: true,
            };
          }
        } else {
          return {
            ...slot,
            disabled: true,
          };
        }
      });
      setSlotName(result);
    } else {
      const result = slotNames.map((slot) => {
        return { ...slot, disabled: true };
      });
      setSlotName(result);
    }
  }, [props.formik.values.checkinDate]);

  useEffect(() => {
    if (
      props.formik.values.checkinSlot &&
      props.formik.values.checkoutSlot
    ) {
      const slotIn = slotNames.find(
        (slot) => slot.value === props.formik.values.checkinSlot
      );
      const slotOut = slotNames.find(
        (slot) => slot.value === props.formik.values.checkoutSlot
      );
      if (slotIn.slotNum > slotOut.slotNum) {
        const tmp = props.formik.values.checkinSlot;
        props.formik.setFieldValue(
          'checkinSlot',
          props.formik.values.checkoutSlot
        );
        props.formik.setFieldValue('checkoutSlot', tmp);
      }
    }
  }, [props.formik.values.checkinSlot, props.formik.values.checkoutSlot]);

  const handleNextChooseRoom = () => {
    if (
      props.formik.values.checkinDate === null ||
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
    setShowChooseSlot(false);
    setShowChooseDevice(true);
  };

  const handleBackChooseRoom = () => {
    setShowChooseRoom(true);
    setShowChooseSlot(false);
  };

  const handleBackChooseSlot = () => {
    setShowChooseSlot(true);
    setShowChooseDevice(false);
  };

  const ChooseSlot = (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <DatePicker
          id="checkinDate"
          style={{ width: '200px', marginRight: 20, marginTop: 10 }}
          label="Book date"
          placeholder="Select date"
          radius="md"
          required
          inputFormat="DD/MM/YYYY"
          value={props.formik.values.checkinDate}
          minDate={dayjs(new Date()).toDate()}
          maxDate={dayjs(new Date()).add(3, 'weeks').toDate()}
          // onChange={(date) => setbookDate(date)}
          onChange={(date) => {
            props.formik.setFieldValue('checkinDate', date);
          }}
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 7}
        />

        <Select
          id="checkinSlot"
          style={{ marginRight: 20, width: '140px' }}
          label="From slot"
          required
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          dropdownPosition="top"
          radius="md"
          data={slotNames}
          onChange={props.formik.handleChange('checkinSlot')}
          value={props.formik.values.checkinSlot}
        />
        <ChevronsRight
          size={28}
          strokeWidth={2}
          color={'black'}
          style={{ marginRight: 20 }}
        />
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
          data={slotNames}
          onChange={props.formik.handleChange('checkoutSlot')}
          value={props.formik.values.checkoutSlot}
        />
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
      {/* {showChooseDevice && (
        <ChooseDeviceModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleBackChooseSlot={handleBackChooseSlot}
          deviceNames={props.deviceNames}
          reasonNames={props.reasonNames}
        />
      )} */}
    </>
  );
};

const useStyles = createStyles({});

export default BySlotChooseSlotModal;
