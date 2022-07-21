import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  ScrollArea,
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
  Search,
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
import { FPT_ORANGE_COLOR } from '@app/constants';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseSlot(): void;
  slotInName: string;
  slotOutName: string;
}
const BySlotChooseRoomModal: React.FC<ChooseSlotModalProps> = (props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [listRoom, setListRoom] = useState([]);
  console.log(listRoom);

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

  const handleNextStep = () => {
    console.log(props.formik);
  };

  const [search, setSearch] = useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  return (
    <div>
      <div className={classes.divInfor}>
        <div className={classes.divHeader}>
          <h3 style={{ margin: 0 }}>Choose room to book</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <InputWrapper label="Search" style={{ width: '80%' }}>
            <TextInput
              placeholder="Search by name..."
              mb="md"
              icon={<Search size={14} />}
              value={search}
              onChange={handleSearchChange}
            />
          </InputWrapper>
        </div>
        <ScrollArea style={{ height: 300 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {listRoom?.map((room) => {
              return (
                <div
                  key={room.id}
                  style={{
                    border: '1px solid',
                    height: '100px',
                    width: '40%',
                    margin: '5%',
                    borderRadius: 5,
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      backgroundColor: FPT_ORANGE_COLOR,
                      borderRadius: '5px 5px 0 0',
                      minHeight: 35,
                    }}
                  >
                    <b>{room.name}</b>
                  </div>
                  <div style={{ padding: '0 5px' }}>
                    <p>Type: {room.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div style={{ padding: 10 }}>
          All room free at{' '}
          {dayjs(props.formik.values.checkinDate).format('DD-MM-YYYY')}{', '}
          {props.slotInName}{' --> '}
          {props.slotOutName}
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
    height: 460,
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
