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
  Archive,
  CalendarStats,
  Check,
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
import RequestInfoComponent from './info-component.component';

interface UserInfoModel {
  avatar: string;
  fullname: string;
  role: string;
  phone: string;
  email: string;
  username: string;
  id: string;
  googleId: string;
  keycloakId: string;
  effdate: string;
  description: string;
  img: File;
}

interface RequestInfoModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleCancelModalShown(): void;
  toggleAcceptModalShown(): void;
}

const RequestInfoModal: React.FC<RequestInfoModalProps> = (props) => {
  const { classes } = useStyles();
  const requestBooking = useAppSelector(
    (state) => state.roomBooking.roomBooking
  );
  const [isShowListDevice, setShowListDevice] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShowListDevice(!isShowListDevice);

  console.log(requestBooking);
  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    console.log(requestBooking);
  }, []);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text className={classes.modalHeaderTitle}>
          Request Booking Information
        </Text>

        <div style={{ marginLeft: 10 }}>
          {requestBooking.status === 'PENDING' ? (
            <div className={classes.pendingDisplay}>
              {requestBooking.status}
            </div>
          ) : requestBooking.status === 'BOOKED' ? (
            <div style={{ display: 'flex' }}>
              <div className={classes.bookedDisplay}>
                {requestBooking.status}
              </div>
              <span className={classes.acceptedByDiv}>
                Accepted by <b>{requestBooking.acceptedBy || 'auto'}</b>
              </span>
            </div>
          ) : requestBooking.status === 'CHECKED_IN' ? (
            <div className={classes.checkedInDisplay}>
              {requestBooking.status}
            </div>
          ) : requestBooking.status === 'CHECKED_OUT' ? (
            <div className={classes.checkedOutDisplay}>
              {requestBooking.status}
            </div>
          ) : requestBooking.status === 'CANCELLED' ? (
            <div style={{ display: 'flex' }}>
              <div className={classes.canceledDisplay}>
                {requestBooking.status}
              </div>
              <span className={classes.cancelledByDiv}>
                by <b>{requestBooking.cancelledBy}</b>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const listDeviceDiv =
    requestBooking.listDevice && requestBooking.listDevice.length > 0
      ? requestBooking.listDevice.map((device) => (
          <div key={device.id} className={classes.deviceRow}>
            <p className={classes.col1}>{device.deviceName}</p>
            <p className={classes.col2}>{device.deviceQuantity}</p>
          </div>
        ))
      : null;

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size="auto"
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <RequestInfoComponent
          toggleCancelModalShown={props.toggleCancelModalShown}
          toggleAcceptModalShown={props.toggleAcceptModalShown}
        />
      </Modal>
    </>
  );
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    width: 460,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
  modalInputDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    margin: 10,
  },
  pendingDisplay: {
    color: '#228be6',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#0000ff1c',
    fontWeight: 600,
  },
  checkedOutDisplay: {
    color: '#fd7e14',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#fd7e1442',
    fontWeight: 600,
  },
  canceledDisplay: {
    color: 'red',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#ff00001c',
    fontWeight: 600,
    marginRight: 5,
  },
  bookedDisplay: {
    color: '#40c057',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#00800024',
    fontWeight: 600,
    marginRight: 5,
  },
  checkedInDisplay: {
    color: '#fd7e14',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#fd7e1430',
    fontWeight: 600,
  },
  cancelledByDiv: {
    backgroundColor: '#ffe3e3',
    padding: '0 5px',
    borderRadius: 10,
    color: 'red',
  },
  acceptedByDiv: {
    backgroundColor: '#00800024',
    padding: '0 5px',
    borderRadius: 10,
    color: '#40c057',
    fontSize: 15,
  },
  deviceRow: {
    borderRadius: '3px',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.1)',
    width: 200,
  },
  col1: {
    flexBasis: '80%',
  },
  col2: {
    flexBasis: '20%',
  },
});

export default RequestInfoModal;
