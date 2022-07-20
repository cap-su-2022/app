import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useWindowDimensions } from '../../hooks/use-window-dimensions';
import {
  Alarm,
  Archive,
  BuildingWarehouse,
  CalendarStats,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ClipboardText,
  Clock,
  FileDescription,
  Id,
  User,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';
import autoAnimate from '@formkit/auto-animate';
import { FormikProps } from 'formik';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { fetchListBookingByRoomInWeek } from '../../redux/features/room-booking/thunk/fetch-list-booking-by-room-in-week.thunk';
import { fetchRoomFreeAtTime } from '../../redux/features/room-booking/thunk/fetch-room-free-at-time';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseSlot(): void;
}
const BySlotChooseRoomModal: React.FC<ChooseSlotModalProps> = (props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [listRoom, setListRoom] = useState([]);
  console.log(listRoom)

  useEffect(() => {
    dispatch(
      fetchRoomFreeAtTime({
        date: props.formik.values.checkinDate,
        checkinSlotId: props.formik.values.checkinSlot,
        checkoutSlotId: props.formik.values.checkoutSlot,
      })
    )
      .unwrap()
      .then((roomFree) => setListRoom(roomFree));
  }, []);

  console.log('LISSSSS: ', listRoom);
  const handleNextStep = () => {
    console.log(props.formik);
  };

  return (
    <div>
      <div className={classes.divInfor}>
        <div className={classes.divHeader}>
          <h3 style={{ margin: 0 }}>Choose room to book</h3>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => props.handleBackChooseSlot()} color="green">
          Back
        </Button>

        <Button onClick={() => handleNextStep()} color="green">
          Next
        </Button>
      </div>
    </div>
  );
};

const useStyles = createStyles({
  divInfor: {
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 400,
  },
  divHeader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
    marginTop: '20px',
  },
  thDiv: {
    textAlign: 'center',
  },
  tdDiv: {
    margin: 'auto',
  },
  dayPassed: {
    backgroundColor: '#a6a6a6',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotFree: {
    backgroundColor: '#6bce6b',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotPending: {
    backgroundColor: '#7373d0',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotBooked: {
    backgroundColor: '#fd6262',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  noteSlotBooked: {
    backgroundColor: '#fd6262',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 20,
  },
  noteSlotPending: {
    backgroundColor: '#7373d0',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
  },
  noteSlotFree: {
    backgroundColor: '#6bce6b',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default BySlotChooseRoomModal;
