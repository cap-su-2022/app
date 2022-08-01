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
import { Search, X } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';
import autoAnimate from '@formkit/auto-animate';
import { FormikProps } from 'formik';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { fetchListBookingByRoomInWeek } from '../../redux/features/room-booking/thunk/fetch-list-booking-by-room-in-week.thunk';
import { fetchRoomFreeAtTime } from '../../redux/features/room-booking/thunk/fetch-room-free-at-time';
import { fetchRoomFreeAtMultiDay } from '../../redux/features/room-booking/thunk/fetch-room-free-in-multi-day';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { getRoomById } from '../../redux/features/room/thunk/get-room-by-id';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseSlot(): void;
  handleNextChooseDevice(): void;
  slotInName: string;
  slotOutName: string;
}
const BySlotChooseRoomModal: React.FC<ChooseSlotModalProps> = (props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [listRoom, setListRoom] = useState([]);
  console.log(listRoom);

  useEffect(() => {
    if (props.formik.values.checkoutDate) {
      dispatch(
        fetchRoomFreeAtMultiDay({
          checkinDate: props.formik.values.checkinDate,
          checkoutDate: props.formik.values.checkoutDate,
          checkinSlotId: props.formik.values.checkinSlot,
          checkoutSlotId: props.formik.values.checkoutSlot,
        })
      )
        .unwrap()
        .then((roomFree) => setListRoom(roomFree));
    } else {
      dispatch(
        fetchRoomFreeAtTime({
          date: props.formik.values.checkinDate,
          checkinSlotId: props.formik.values.checkinSlot,
          checkoutSlotId: props.formik.values.checkoutSlot,
        })
      )
        .unwrap()
        .then((roomFree) => setListRoom(roomFree));
    }
  }, []);

  const handleNextStep = () => {
    if (!props.formik.values.roomId) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Miss some filed',
        message: 'Please room before to next step',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      dispatch(getRoomById(props.formik.values.roomId)).unwrap();
      props.handleNextChooseDevice();
    }
  };

  const handleBack = () => {
    props.formik.setFieldValue('roomId', null);
    props.handleBackChooseSlot();
  };

  const [search, setSearch] = useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  return (
    <div style={{ maxWidth: '90vh' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 10}}>
          All room free at{' '}
          {dayjs(props.formik.values.checkinDate).format('DD-MM-YYYY')}
          {props.formik.values.checkoutDate
            ? ' -> ' + dayjs(props.formik.values.checkoutDate).format('DD-MM-YYYY')
            : null}
          {', '}
          {props.slotInName === props.slotOutName
            ? props.slotInName
            : props.slotInName + ' -> ' + props.slotOutName}
          {/* {props.slotInName}{' --> '}
          {props.slotOutName} */}
        </div>
        <ScrollArea style={{ height: 300}}>
          <div style={{ display: 'flex', flexDirection: "column"}}>
            {listRoom?.map((room) => {
              return (
                <div
                  key={room.id}
                  className={
                    room.id === props.formik.values.roomId
                      ? classes.roomChoosedDiv
                      : classes.roomDiv
                  }
                  onClick={() => props.formik.setFieldValue('roomId', room.id)}
                >
                  <div
                    style={{
                      // textAlign: 'center',
                      padding: "10px",
                      // backgroundColor: '#fff',
                      borderRadius: '5px',
                      minHeight: 35,
                      height: "100%",
                      color: '#000',
                    }}
                  >
                    <b>Name: {room.name}</b>
                    <p>Type: {room.type}</p>
                  </div>
                  {/* <div style={{ padding: '0 5px' }}>
                  </div> */}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => handleBack()} color="green">
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
  roomDiv: {
    height: '100px',
    margin: '2%',
    borderRadius: 5,
    cursor: 'pointer',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    "&:hover": {
      backgroundColor: '#fff'
    }
  },
  roomChoosedDiv: {
    height: '100px',
    backgroundColor: '#fff',
    margin: '2%',
    borderRadius: 5,
    cursor: 'pointer',
    boxShadow: 'rgba(255 127 22 / 35%) 0px 5px 15px',
  },
});

export default BySlotChooseRoomModal;
