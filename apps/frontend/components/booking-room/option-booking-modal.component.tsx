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

interface SendBookingModalProps {
  isShown: boolean;
  toggleShown(): void;
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
      console.log(value);
    };
  
    const formik = useFormik({
      // validationSchema: UpdateRoomTypeValidation,
      initialValues: {
        roomId: '',
        slotStartId: '',
        slotEndId: '',
        bookDate: null,
        listDevice: [],
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
      >
        <div>
          {/* <Button
            style={{ marginRight: 10 }}
            onClick={() => setShowBookingByRoom(!isShowBookByRoom)}
            leftIcon={<BuildingWarehouse />}
          >
            Book by room
          </Button> */}
          <Dropdown />
          {/* <Button
            onClick={() => setShowBookingBySlot(!isShowBookBySlot)}
            leftIcon={<Alarm />}
          >
            Book by slot
          </Button> */}
          {/* <Button onClick={() => props.toggleShown()} leftIcon={<X />}>
          Close
        </Button> */}
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
