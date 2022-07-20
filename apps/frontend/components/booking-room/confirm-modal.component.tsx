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
import { Plus, X } from 'tabler-icons-react';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import autoAnimate from '@formkit/auto-animate';
import { useAppSelector } from '../../redux/hooks';
import { Slot } from '../../models/slot.model';

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

  useEffect(() => {
    const result = slotInfors?.filter(
      (slot) => slot.id === props.formik.values.checkinSlot
    );
    setSlotIn(result[0])
  }, []);

  useEffect(() => {
    const result = slotInfors?.filter(
      (slot) => slot.id === props.formik.values.checkoutSlot
    );
    setSlotOut(result[0])
  });

  return (
    <div>
      <ScrollArea style={{ height: 480 }}>
        <div>
          CONFIRM INFOR OF BOOKING
          {room.name}
          {slotIn && slotIn.name}
          {slotOut && slotOut.name}

        </div>
      </ScrollArea>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => props.handleBackChooseDevice()} color="green">
          Back
        </Button>

        <Button onClick={() => props.handleSubmit} color="green">
          Next
        </Button>
      </div>
    </div>
  );
};

const useStyles = createStyles({
  divInfor: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 470,
  },
  buttonChooseDevice: {
    margin: 0,
    cursor: 'pointer',
    border: '1px solid',
    padding: '5px 20px',
    borderRadius: 50,
  },
  divHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0 20px 0',
  },
  displayFex: {
    display: 'flex',
    alignItems: 'end',
    marginBottom: 20,
  },
  selectComponent: {
    width: '200px',
    marginRight: 10,
  },
  groupComponent: {
    marginRight: 10,
  },
  buttonComponent: {
    marginRight: 10,
    backgroundColor: 'red',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
    backgroundColor: 'white',
    marginBottom: '0.5em',
    borderRadius: '0.5em',
    boxShadow: '0 0 0.5em rgba(0, 0, 0, 0.1)',
    fontSize: '0.875em',
  },
});

export default ConfirmModal;
