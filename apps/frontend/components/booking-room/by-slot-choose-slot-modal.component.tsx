import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Select,
} from '@mantine/core';
import {
  ChevronsRight,
  X,
} from 'tabler-icons-react';
import {  useAppSelector } from '../../redux/hooks';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import BySlotChooseRoomModal from './by-slot-choose-room-modal.component';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
}

const BySlotChooseSlotModal: React.FC<ChooseSlotModalProps> = (props) => {
  // const { classes } = useStyles();
  const [showChooseRoom, setShowChooseRoom] = useState(false);
  const [showChooseSlot, setShowChooseSlot] = useState<boolean>(true);
  const [slotNames, setSlotNames] = useState<any[]>();
  const slotInfors = useAppSelector((state) => state.slot.slotInfor);
  useEffect(() => {
    const result = slotInfors?.map((slot) => {
      return { value: slot.id, label: slot.name };
    });
    setSlotNames(result);
    console.log('RESULT: ', result);
  }, []);

  useEffect(() => {
    if (props.formik.values.checkinSlot && props.formik.values.checkoutSlot) {
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

  // const handleNextChooseDevice = () => {
  //   setShowChooseSlot(false);
  //   setShowChooseDevice(true);
  // };

  const handleBackChooseRoom = () => {
    setShowChooseRoom(true);
    setShowChooseSlot(false);
  };

  const handleBackChooseSlot = () => {
    setShowChooseSlot(true);
    setShowChooseRoom(false);
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
          data={slotNames || []}
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
          data={slotNames || []}
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
