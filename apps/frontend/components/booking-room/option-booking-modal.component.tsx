import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
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
  Check,
  ClipboardText,
  Clock,
  FileDescription,
  Id,
  User,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';
import ChooseRoomModal from './choose-room-modal.component';
import autoAnimate from '@formkit/auto-animate';
import ChooseSlotModal from './choose-slot-modal.component';
import { useFormik } from 'formik';
import { fetchRoomNames } from '../../redux/features/room/thunk/fetch-room-names.thunk';
import { fetchSlotNames } from '../../redux/features/slot/thunk/fetch-slot-names.thunk';
import { fetchDeviceNames } from '../../redux/features/devices/thunk/fetch-device-names.thunk';
import { fetchReasonNames } from '../../redux/features/booking-reason/thunk/fetch-booking-reason-names.thunk';
import { addNewRequest } from '../../redux/features/room-booking/thunk/add-new-booking';
import { showNotification } from '@mantine/notifications';
import { BookingRequestParams } from '../../models/pagination-params/booking-room-params.model';
import { fetchRoomBookings } from '../../redux/features/room-booking/thunk/fetch-room-booking-list';

interface SendBookingModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: BookingRequestParams;
}

const SendBookingModal: React.FC<SendBookingModalProps> = (props) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const [roomNames, setRoomNames] = useState([]);
  useEffect(() => {
    dispatch(fetchRoomNames())
      .unwrap()
      .then((roomNames) => setRoomNames(roomNames));
  }, []);

  const [slotNames, setSlotNames] = useState([]);
  useEffect(() => {
    dispatch(fetchSlotNames())
      .unwrap()
      .then((slotNames) => setSlotNames(slotNames));
  }, []);

  const [deviceNames, setDeviceNames] = useState([]);
  useEffect(() => {
    dispatch(fetchDeviceNames())
      .unwrap()
      .then((deviceNames) => setDeviceNames(deviceNames));
  }, []);

  const [reasonNames, setReasonNames] = useState([]);
  useEffect(() => {
    dispatch(fetchReasonNames())
      .unwrap()
      .then((ReasonNames) => setReasonNames(ReasonNames));
  }, []);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text className={classes.modalHeaderTitle}>Booking Room</Text>
      </div>
    );
  };

  const Dropdown = () => {
    const [showChooseRoom, setShowChooseRoom] = useState(false);
    const [showChooseSlot, setShowChooseSlot] = useState(false);
    const parentChooseRoom = useRef(null);
    const parentChooseSlot = useRef(null);
    
    useEffect(() => {
      parentChooseRoom.current && autoAnimate(parentChooseRoom.current);
    }, []);

    useEffect(() => {
      parentChooseSlot.current && autoAnimate(parentChooseSlot.current);
    }, []);

    const revealRoom = () => {
      setShowChooseRoom(!showChooseRoom);
      setShowChooseSlot(false);
    };
    const revealSlot = () => {
      setShowChooseSlot(!showChooseSlot);
      setShowChooseRoom(false);
    };

    const handleSubmit = (value) => {
      dispatch(addNewRequest(value))
        .unwrap()
        .then(() =>
          showNotification({
            id: 'add-reuqest',
            color: 'teal',
            title: 'Your request was sended',
            message: 'You request was successfully sended',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .then(() => {
          props.toggleShown();
          dispatch(fetchRoomBookings(props.pagination));
        })
        .catch((e) =>
          showNotification({
            id: 'add-reuqest',
            color: 'red',
            title: 'Error while send request',
            message: e.message ?? 'Failed to send request',
            icon: <X />,
            autoClose: 3000,
          })
        );
    };
  
    const formik = useFormik({
      // validationSchema: UpdateRoomTypeValidation,
      initialValues: {
        roomId: '',
        checkinDate: null,
        checkinSlot: '',
        checkoutSlot: '',
        bookingReasonId: '',
        listDevice: [],
        description: '',
      },
      enableReinitialize: true,
      onSubmit: (e) => handleSubmit(e),
    });

    return (
      <div>
        <div className={classes.listButton}>
          <div>
            {!showChooseSlot && (
              <Button
                style={{ marginRight: 10 }}
                onClick={revealRoom}
                leftIcon={<BuildingWarehouse />}
              >
                Book by room
              </Button>
            )}
          </div>
          <div>
            {!showChooseRoom && (
              <Button
                style={{ marginRight: 10 }}
                onClick={revealSlot}
                leftIcon={<BuildingWarehouse />}
              >
                Book by slot
              </Button>
            )}
          </div>
        </div>
        <div ref={parentChooseRoom}>
          {showChooseRoom && (
            <ChooseRoomModal
              formik={formik}
              handleSubmit={() => formik.handleSubmit()}
              roomNames={roomNames}
              slotNames={slotNames}
              deviceNames={deviceNames}
              reasonNames={reasonNames}
            />
          )}
        </div>

        <div ref={parentChooseSlot}>
          {/* {showChooseSlot && <ChooseSlotModal />} */}
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size="lg"
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
        style={{ paddingTop: 10 }}
      >
        <div>
          <Dropdown />
        </div>
      </Modal>
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
});

export default SendBookingModal;
