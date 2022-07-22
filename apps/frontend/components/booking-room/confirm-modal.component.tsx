import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  NumberInput,
  NumberInputHandlers,
  ScrollArea,
  Select,
  Textarea,
} from '@mantine/core';
import { ChevronsRight, Plus, X } from 'tabler-icons-react';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import autoAnimate from '@formkit/auto-animate';
import { useAppSelector } from '../../redux/hooks';
import { Slot } from '../../models/slot.model';
import { BookingReason } from '../../models/booking-reason.model';
import dayjs from 'dayjs';
import { FPT_ORANGE_COLOR } from '@app/constants';

interface ConfirmModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseDevice(): void;
}
const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { classes } = useStyles();
  const room = useAppSelector((state) => state.room.room);
  const slotInfors = useAppSelector((state) => state.slot.slotInfor);
  const deviceNames = useAppSelector((state) => state.device.deviceNames);
  const reasonNames = useAppSelector(
    (state) => state.bookingReason.reasonNames
  );

  const [slotIn, setSlotIn] = useState<Slot>();
  const [slotOut, setSlotOut] = useState<Slot>();
  const [reason, setReason] = useState<{ value: string; label: string }>();

  useEffect(() => {
    const result = slotInfors?.filter(
      (slot) => slot.id === props.formik.values.checkinSlot
    );
    setSlotIn(result[0]);
  }, []);

  useEffect(() => {
    const result = slotInfors?.filter(
      (slot) => slot.id === props.formik.values.checkoutSlot
    );
    setSlotOut(result[0]);
  }, []);

  useEffect(() => {
    const result = reasonNames?.filter(
      (reason) => reason.value === props.formik.values.bookingReasonId
    );
    setReason(result[0]);
  }, []);

  return (
    <div>
      <ScrollArea style={{ height: 480, marginBottom: 5, borderRadius: 5 }}>
        <div className={classes.mainDiv}>
          <div style={{ textAlign: 'center' }}>
            <b>CONFIRM INFOR OF BOOKING</b>
          </div>
          <div className={classes.nameAndDateDiv}>
            <b style={{ marginRight: 10, flexBasis: '30%' }}>Room name:</b>
            <div
              style={{
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 5,
                flexBasis: '70%',
                color: 'black',
              }}
            >
              {room.name}
            </div>
          </div>
          <div className={classes.nameAndDateDiv}>
            <b style={{ marginRight: 10, flexBasis: '30%' }}>Date check in:</b>
            <div
              style={{
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 5,
                flexBasis: '70%',
                color: 'black',
              }}
            >
              {dayjs(props.formik.values.checkinDate).format('ddd DD-MM-YYYY')}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
              borderRadius: 5,
              padding: 10,
              margin: '5px',
              justifyContent: 'space-between',
              width: '80%',
            }}
          >
            <div className={classes.slotArea}>
              <b style={{ marginRight: 10 }}>From slot:</b>
              <div className={classes.slotDiv}>
                <p>{slotIn?.name}</p>
                <p>
                  {slotIn?.timeStart.slice(
                    0,
                    slotIn.timeStart.lastIndexOf(':')
                  )}
                </p>
              </div>
            </div>
            <ChevronsRight
              size={40}
              strokeWidth={2}
              color={'white'}
              style={{}}
            />
            <div className={classes.slotArea}>
              <b style={{ marginRight: 10 }}>To slot:</b>
              <div className={classes.slotDiv}>
                <p>{slotOut?.name}</p>
                <p>
                  {slotOut?.timeEnd.slice(0, slotOut.timeEnd.lastIndexOf(':'))}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.otherDiv}>
            <div style={{ flexBasis: '30%' }}>
              <b>List device:</b>
            </div>
            {props.formik.values.listDevice.length > 0 ? (
              props.formik.values.listDevice.map((item) => (
                <div key={item.value} className={classes.item}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ margin: ' 0 10px' }}>{item.quantity}</div>
                    <div>{item.label}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>None</p>
            )}
          </div>
          <div className={classes.otherDiv}>
            <b style={{ marginRight: 10, flexBasis: '30%' }}>Reason:</b>
            {reason && reason.label}
          </div>

          <div
            style={{
              padding: 10,
              borderRadius: 5,
              margin: '5px 20px 5px 5px',
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
            }}
          >
            <b style={{ marginRight: 10, flexBasis: '30%' }}>Description:</b>
            {props.formik.values.description || 'Dont have description'}
          </div>
        </div>
      </ScrollArea>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => props.handleBackChooseDevice()} color="green">
          Back
        </Button>

        <Button onClick={() => props.handleSubmit()} color="green">
          Book
        </Button>
      </div>
    </div>
  );
};

const useStyles = createStyles({
  mainDiv: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 470,
    // color: 'white',
  },
  nameAndDateDiv: {
    display: 'flex',
    padding: 10,
    margin: '5px',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
    width: '80%',
    borderRadius: '5px',
  },
  otherDiv: {
    padding: 10,
    borderRadius: 5,
    margin: '5px 20px 5px 5px',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
  },
  slotArea: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  slotDiv: {
    width: 100,
    backgroundColor: 'white',
    borderRadius: '0.5em',
    fontSize: '0.875em',
    color: 'black',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
    backgroundColor: 'white',
    marginBottom: '0.75em',
    borderRadius: '0.5em',
    // boxShadow: 'rgb(238 239 255) 0px 0px 0px 3px',
    color: 'black',
    fontSize: '0.875em',
  },
});

export default ConfirmModal;
