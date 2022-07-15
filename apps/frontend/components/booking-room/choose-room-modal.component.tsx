import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Chips,
  createStyles,
  InputWrapper,
  Modal,
  Radio,
  RadioGroup,
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
import { getRoomById } from '../../redux/features/room/thunk/get-room-by-id';
import { fetchListBookingByRoomInWeek } from '../../redux/features/room-booking/thunk/fetch-list-booking-by-room-in-week.thunk';
import { DatePicker } from '@mantine/dates';
import ChooseSlotModal from './choose-slot-modal.component';
import { showNotification } from '@mantine/notifications';
import ChooseDeviceModal from './choose-device-modal.component';

interface ChooseRoomModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  roomNames: any[];
  slotNames: any[];
  deviceNames: any[];
  reasonNames: any[];
}

const ChooseRoomModal: React.FC<ChooseRoomModalProps> = (props) => {
  const { classes } = useStyles();
  const [room, setRoom] = useState(null);
  const [showChooseRoom, setShowChooseRoom] = useState(true);
  const [showChooseSlot, setShowChooseSlot] = useState<boolean>(false);
  const [showChooseDevice, setShowChooseDevice] = useState<boolean>(false);
  const [slotNames, setSlotName] = useState<any[]>(props.slotNames);
  const curr = new Date(); // get current date

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (props.formik.values.roomId !== '') {
      dispatch(getRoomById(props.formik.values.roomId))
        .unwrap()
        .then((result) => setRoom(result));
    }
  }, [dispatch, props.formik.values.roomId]);

  useEffect(() => {
    const curr = new Date();
    const sat = curr.getDate() - curr.getDay() + 6;
    const choosedDay = new Date(props.formik.values.checkinDate);
    if (slotNames !== undefined) {
      if (
        choosedDay.getDate() === sat ||
        choosedDay.getDate() === sat + 7 ||
        choosedDay.getDate() === sat + 14
      ) {
        const result = slotNames.map((slot, index) => {
          if (index > 2) {
            return {
              ...slot,
              disabled: true,
            };
          } else {
            return {
              ...slot,
              disabled: false,
            };
          }
        });
        setSlotName(result);
      } else {
        const result = slotNames.map((slot) => ({
          ...slot,
          disabled: false,
        }));
        setSlotName(result);
      }
    }
  }, [props.formik.values.checkinDate]);

  const [listBooking, setListBooking] = useState([]);
  useEffect(() => {
    if (props.formik.values.roomId !== '') {
      dispatch(
        fetchListBookingByRoomInWeek({
          roomId: props.formik.values.roomId,
          date: curr.toUTCString(),
        })
      )
        .unwrap()
        .then((listBooking) =>
          setListBooking(
            listBooking.map((request) => {
              return {
                ...request,
                checkinDate: new Date(request.checkinDate).getDate(),
              };
            })
          )
        );
    }
  }, [dispatch, props.formik.values.roomId]);

  const handleNextChooseSlot = () => {
    if (room === null) {
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'No rooms have been selected yet',
        message: 'Please choose room before to next step',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      setShowChooseRoom(false);
      setShowChooseSlot(true);
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

  const ChooseRoom: React.FC = () => {
    return (
      <div>
        <Select
          id="roomId"
          name="roomId"
          label="Choose room"
          placeholder="Pick one"
          data={props.roomNames}
          value={props.formik.values.roomId || undefined}
          error={props.formik.errors.roomId}
          onChange={props.formik.handleChange('roomId')}
          required={true}
        />
        {room ? (
          <div className={classes.divInfor}>
            <div className={classes.divHeader}>
              <h3 style={{ margin: 0 }}>Room information</h3>
            </div>
            <div className={classes.modalBody}>
              <InputWrapper label="Room name" description="Unique room name">
                <TextInput
                  icon={<ClipboardText />}
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={room.name}
                />
              </InputWrapper>
              <InputWrapper
                label="Room type"
                description="Type of library in separated"
              >
                <TextInput
                  icon={<ClipboardText />}
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={room.roomTypeName}
                />
              </InputWrapper>
              <InputWrapper
                label="Room description"
                description="Additional information of the room"
              >
                <Textarea
                  icon={<FileDescription />}
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={room.description}
                />
              </InputWrapper>
            </div>
          </div>
        ) : null}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', margin: 10 }}
        >
          <Button
            onClick={() => handleNextChooseSlot()}
            // leftIcon={<Pencil />}
            color="green"
          >
            Next
          </Button>
        </div>
        {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            onClick={() => props.handleSubmit()}
            // leftIcon={<Pencil />}
            color="green"
          >
            Test
          </Button>
        </div> */}
      </div>
    );
  };

  return (
    <>
      {showChooseRoom && <ChooseRoom />}
      {showChooseSlot && (
        <ChooseSlotModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleBackChooseRoom={handleBackChooseRoom}
          handleNextChooseDevice={handleNextChooseDevice}
          roomNames={props.roomNames}
          slotNames={props.slotNames}
          listBooking={listBooking}
        />
      )}
      {showChooseDevice && (
        <ChooseDeviceModal
          formik={props.formik}
          handleSubmit={props.handleSubmit}
          handleBackChooseSlot={handleBackChooseSlot}
          // handleNextChooseDevice={handleNextChooseDevice}
          deviceNames={props.deviceNames}
          reasonNames={props.reasonNames}
        />
      )}
    </>
  );
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
  },
  divInfor: {
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  divHeader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
    marginTop: '20px',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    marginTop: 0,
  },
  textInput: {
    marginTop: 10,
  },
});

export default ChooseRoomModal;