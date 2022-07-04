import React, { useEffect } from 'react';
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
  ClipboardText,
  Clock,
  FileDescription,
  Id,
  User,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';

interface RequestInfoModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleCancelModalShown(): void;
}

const RequestInfoModal: React.FC<RequestInfoModalProps> = (props) => {
  const { classes } = useStyles();
  const requestBooking = useAppSelector(
    (state) => state.roomBooking.roomBooking
  );

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
          {requestBooking.status === 'BOOKING' ? (
            <div className={classes.bookingDisplay}>
              {requestBooking.status}
            </div>
          ) : requestBooking.status === 'BOOKED' ? (
            <div className={classes.bookedDisplay}>{requestBooking.status}</div>
          ) : requestBooking.status === 'CHECKED IN' ? (
            <div className={classes.processingDisplay}>
              {requestBooking.status}
            </div>
          ) : requestBooking.status === 'CANCELLED' ? (
            <div className={classes.canceledDisplay}>
              {requestBooking.status}
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
          <InputWrapper
            label="Request ID"
            description="Unique ID of the request"
            className={classes.inputWrapper}
          >
            <TextInput
              icon={<Id />}
              radius="md"
              readOnly
              value={requestBooking.id}
            />
          </InputWrapper>
          <InputWrapper
            label="Room name"
            description="Room for request booking"
            className={classes.inputWrapper}
          >
            <TextInput
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={requestBooking.roomName}
            />
          </InputWrapper>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <InputWrapper
              label="Time check in"
              className={classes.inputWrapper}
            >
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={dayjs(requestBooking.timeCheckin).format(
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <InputWrapper
              label="Time check out"
              className={classes.inputWrapper}
            >
              <TextInput
                icon={<ClipboardText />}
                radius="md"
                readOnly
                value={dayjs(requestBooking.timeCheckout).format(
                  'HH:mm DD/MM/YYYY'
                )}
              />
            </InputWrapper>
            {requestBooking.updatedBy ? (
              <InputWrapper label="Cancel by" className={classes.inputWrapper}>
                <TextInput
                  id="request-updatedby"
                  icon={<User />}
                  radius="md"
                  readOnly
                  value={requestBooking.updatedBy}
                />
              </InputWrapper>
            ) : null}
          </div>
        </div>

        <div className={classes.modalFooter}>
          {requestBooking.status === 'BOOKING' ? (
            <Button
              onClick={() => props.toggleCancelModalShown()}
              variant="outline"
              color={'red'}
              leftIcon={<Archive />}
            >
              Cancel request
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
  bookingDisplay: {
    color: '#228be6',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#0000ff1c',
    fontWeight: 600,
  },
  bookedDisplay: {
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
  },
  processingDisplay: {
    color: '#40c057',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#00800024',
    fontWeight: 600,
  },
});

export default RequestInfoModal;
