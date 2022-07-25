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
  Devices,
  FileDescription,
  Id,
  User,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';
import autoAnimate from '@formkit/auto-animate';

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

interface RequestInfoComponentProps {
  toggleCancelModalShown(): void;
  toggleAcceptModalShown(): void;
}

const RequestInfoComponent: React.FC<RequestInfoComponentProps> = (props) => {
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
    <div style={{ display: 'flex' }} ref={parent}>
      <div style={{ width: 530 }}>
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

            <InputWrapper
              label="Request by"
              className={classes.inputWrapper}
              style={{ flex: 1 }}
            >
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={requestBooking.requestedBy}
              />
            </InputWrapper>
          </div>
          {requestBooking.status === "CANCELLED" ? (
            <>
              <InputWrapper
                label="Reason Cancel"
                className={classes.inputWrapper}
                sx={() => ({
                  "label": {
                    color: 'red',
                  }
                })}
              >
                <TextInput
                  icon={<ClipboardText />}
                  radius="md"
                  readOnly
                  value={requestBooking.reasonCancel}
                />
              </InputWrapper>
            </>
          ) : null}

          <InputWrapper label="Reason Booking" className={classes.inputWrapper}>
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
          {requestBooking.listDevice && requestBooking.listDevice.length > 0 && (
            <Button onClick={reveal} leftIcon={<Devices />}>
              Devices
            </Button>
          )}
        </div>
      </div>
      {isShowListDevice &&
        requestBooking.listDevice &&
        requestBooking.listDevice.length > 0 && (
          <div>
            <div style={{ marginBottom: 35 }}>
              <b>LIST DEVICES</b>
            </div>
            {listDeviceDiv}
          </div>
        )}
    </div>
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
    width: 490,
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

export default RequestInfoComponent;
