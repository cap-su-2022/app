import React, { useEffect, useState } from 'react';
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
  toggleAcceptModalShown(): void
}

const RequestInfoModal: React.FC<RequestInfoModalProps> = (props) => {
  const { classes } = useStyles();
  const requestBooking = useAppSelector(
    (state) => state.roomBooking.roomBooking
  );

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
                Accept by <b>{requestBooking.acceptedBy || 'auto'}</b>
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

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size="lg"
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <div className={classes.modalBody}>
          <InputWrapper label="Request ID" className={classes.inputWrapper}>
            <TextInput
              icon={<Id />}
              radius="md"
              readOnly
              value={requestBooking.id}
            />
          </InputWrapper>
          <InputWrapper label="Room name" className={classes.inputWrapper}>
            <TextInput
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={requestBooking.roomName}
            />
          </InputWrapper>
          <div style={{ display: 'flex' }}>
            <InputWrapper label="Day use" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={dayjs(requestBooking.checkinDate).format('DD/MM/YYYY')}
              />
            </InputWrapper>

            <InputWrapper label="Slot in" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={requestBooking.checkinSlot}
                style={{ width: 100 }}
              />
            </InputWrapper>
            <div style={{ position: 'relative', top: '45px' }}>
              <ChevronsRight size={28} strokeWidth={2} color={'black'} />
            </div>
            <InputWrapper label="Slot out" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={requestBooking.checkoutSlot}
                style={{ width: 100 }}
              />
            </InputWrapper>
          </div>
          <div style={{ display: 'flex' }}>
            <InputWrapper label="Request at" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={dayjs(requestBooking.requestedAt).format(
                  'HH:mm DD/MM/YYYY'
                )}
              />
            </InputWrapper>

            <InputWrapper label="Request by" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={requestBooking.requestedBy}
              />
            </InputWrapper>
          </div>

          <InputWrapper label="Reason" className={classes.inputWrapper}>
            <TextInput
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={requestBooking.reason}
            />
          </InputWrapper>

          <InputWrapper label="Description" className={classes.inputWrapper}>
            <Textarea
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={requestBooking.description}
            />
          </InputWrapper>
        </div>

        <div className={classes.modalFooter}>
          {(requestBooking.status === 'PENDING' &&
            userInfo.id === requestBooking.requestedById) ||
          requestBooking.status === 'BOOKED' ? (
            <Button
              onClick={() => props.toggleCancelModalShown()}
              variant="outline"
              color={'red'}
              leftIcon={<Archive />}
            >
              Cancel request
            </Button>
          ) : requestBooking.status === 'PENDING' &&
            userInfo.id !== requestBooking.requestedById ? (
            <Button
              onClick={() => props.toggleCancelModalShown()}
              variant="outline"
              color={'red'}
              leftIcon={<Archive />}
            >
              Reject request
            </Button>
          ) : (
            <div></div>
          )}
          {requestBooking.status === 'PENDING' ? (
            <Button
              onClick={() => props.toggleAcceptModalShown()}
              variant="outline"
              color={'green'}
              leftIcon={<Check />}
            >
              Accept request
            </Button>
          ) : (
            <div></div>
          )}

          <Button onClick={() => props.toggleShown()} leftIcon={<X />}>
            Close
          </Button>
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
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
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
});

export default RequestInfoModal;
