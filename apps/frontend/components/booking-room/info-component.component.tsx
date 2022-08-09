import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  Check,
  ChevronsRight,
  CircleCheck,
  ClipboardText,
  Devices,
  X,
} from 'tabler-icons-react';
import {useAppSelector} from '../../redux/hooks';
import dayjs from 'dayjs';
import autoAnimate from '@formkit/auto-animate';
import ReactStars from 'react-stars';

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

  toggleRejectModalShown(): void;

  toggleAcceptModalShown(): void;

  toggleCheckinModalShown(): void;

  toggleCheckoutModalShown(): void;

  toggleSendFeedbackModalShown(): void;
}

const RequestInfoComponent: React.FC<RequestInfoComponentProps> = (props) => {
  const {classes} = useStyles();
  const requestBooking = useAppSelector(
    (state) => state.roomBooking.roomBooking
  );
  const [isShowListDevice, setShowListDevice] = useState(false);
  const [isShowFeedback, setShowFeedback] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  const RenderDeviceButton: React.FC = () => {
    if (requestBooking.listDevice.length > 0) {
      return (
        <Button
          onClick={() => setShowListDevice(!isShowListDevice)}
          variant="outline"
          color={'blue'}
          leftIcon={<Devices/>}
        >
          Device
        </Button>
      );
    } else {
      return <div></div>;
    }
  };

  const ButtonRender = (status: string) => {
    switch (status) {
      case 'PENDING':
        if (userInfo.id === requestBooking.requestedById) {
          return (
            <>
              <Button
                onClick={() => props.toggleCancelModalShown()}
                variant="outline"
                color={'red'}
                leftIcon={<X/>}
              >
                Cancel request
              </Button>
              <RenderDeviceButton/>
            </>
          );
        } else {
          return (
            <>
              <Button
                onClick={() => props.toggleRejectModalShown()}
                variant="outline"
                color={'red'}
                leftIcon={<X/>}
              >
                Reject request
              </Button>

              <Button
                onClick={() => props.toggleAcceptModalShown()}
                variant="outline"
                color={'green'}
                leftIcon={<Check/>}
              >
                Accept request
              </Button>

              <RenderDeviceButton/>
            </>
          );
        }
      case 'BOOKED':
        if (userInfo.role !== 'Staff') {
          return (
            <>
              <Button
                onClick={() => props.toggleCancelModalShown()}
                variant="outline"
                color={'red'}
                leftIcon={<X/>}
              >
                Cancel request
              </Button>
              <Button
                onClick={() => props.toggleCheckinModalShown()}
                variant="outline"
                color={'green'}
                leftIcon={<CircleCheck/>}
              >
                Check in
              </Button>

              <RenderDeviceButton/>
            </>
          );
        } else {
          return (
            <>
              <Button
                onClick={() => props.toggleCancelModalShown()}
                variant="outline"
                color={'red'}
                leftIcon={<X/>}
              >
                Cancel request
              </Button>
              <RenderDeviceButton/>
            </>
          );
        }
      case 'CHECKED_IN':
        if (userInfo.role !== 'Staff') {
          return (
            <>
              <div></div>
              <Button
                onClick={() => props.toggleCheckoutModalShown()}
                variant="outline"
                color={'green'}
                leftIcon={<CircleCheck/>}
              >
                Check out
              </Button>

              <RenderDeviceButton/>
            </>
          );
        } else return null;

      case 'CHECKED_OUT':
        if (userInfo.id === requestBooking.requestedById) {
          if (requestBooking.feedback) {
            return (
              <>
                <Button
                  onClick={() => setShowFeedback(!isShowFeedback)}
                  variant="outline"
                  color={'blue'}
                >
                  Feedback
                </Button>

                <RenderDeviceButton/>
              </>
            );
          } else {
            return (
              <>
                <Button
                  onClick={() => props.toggleSendFeedbackModalShown()}
                  variant="outline"
                  color={'green'}
                >
                  Send feedback
                </Button>

                <RenderDeviceButton/>
              </>
            );
          }
        } else {
          if (requestBooking.feedback) {
            return (
              <>
                <Button
                  onClick={() => setShowFeedback(!isShowFeedback)}
                  variant="outline"
                  color={'blue'}
                >
                  Feedback
                </Button>

                <RenderDeviceButton/>
              </>
            );
          } else {
            return null;
          }
        }
    }
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

  const FeedbackDiv: React.FC<{ feedback: any }> = (props) => {
    return (
      <div style={{width: '250px', maxHeight: 400}}>
        <div>
          <b>FEEDBACK</b>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ReactStars
            count={5}
            value={props.feedback.rateNum}
            edit={false}
            size={35}
            color2={'#ffd700'}
          />
        </div>
        <p>
          <b>Feedback type:</b> {props.feedback.feedbackType || 'none'}
        </p>
        <p>
          <b>Feedback messgase:</b>
        </p>
        <div
          style={{
            backgroundColor: '#d3d3d3',
            padding: 5,
            borderRadius: 5,
            minHeight: 100,
          }}
        >
          <p>{props.feedback.feedbackMess}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{display: 'flex'}} ref={parent}>
      {isShowFeedback && <FeedbackDiv feedback={requestBooking?.feedback}/>}

      <div style={{width: 550, flex: 1, margin: 20}}>
        <div className={classes.modalBody}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <InputWrapper label="Room name" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={requestBooking.roomName}
              />
            </InputWrapper>
            <InputWrapper label="Room user" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={requestBooking.bookedFor}
              />
            </InputWrapper>
          </div>

          <div style={{display: 'flex'}}>
            <InputWrapper label="Request at" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={dayjs(requestBooking.requestedAt).format(
                  'HH:mm DD/MM/YYYY'
                )}
              />
            </InputWrapper>

            <InputWrapper label="Request by" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={requestBooking.requestedBy}
              />
            </InputWrapper>
          </div>

          <div style={{display: 'flex'}}>
            <InputWrapper label="Checkin date" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={dayjs(requestBooking.checkinDate).format('DD/MM/YYYY')}
              />
            </InputWrapper>

            <InputWrapper label="Slot in" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={
                  requestBooking.checkinSlot +
                  '   ' +
                  requestBooking.checkinTime.slice(0, 5)
                }
                style={{width: 150}}
              />
            </InputWrapper>
            <div style={{position: 'relative', top: '45px'}}>
              <ChevronsRight size={28} strokeWidth={2} color={'black'}/>
            </div>
            <InputWrapper label="Slot out" className={classes.inputWrapper}>
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={
                  requestBooking.checkoutSlot +
                  '   ' +
                  requestBooking.checkoutTime.slice(0, 5)
                }
                style={{width: 150}}
              />
            </InputWrapper>
          </div>
          {requestBooking.status === 'CANCELLED' ? (
            <>
              <InputWrapper
                label="Reason Cancel"
                className={classes.inputWrapper}
                sx={() => ({
                  label: {
                    color: 'red',
                  },
                })}
              >
                <TextInput
                  icon={<ClipboardText/>}
                  radius="md"
                  readOnly
                  value={requestBooking.cancelReason}
                />
              </InputWrapper>
            </>
          ) : null}

          <InputWrapper label="Reason Booking" className={classes.inputWrapper}>
            <TextInput
              icon={<ClipboardText/>}
              radius="md"
              readOnly
              value={requestBooking.reason}
            />
          </InputWrapper>

          <InputWrapper label="Description" className={classes.inputWrapper}>
            <Textarea
              icon={<ClipboardText/>}
              autosize
              readOnly
              value={requestBooking.description}
            />
          </InputWrapper>
        </div>

        <div className={classes.modalFooter}>
          {ButtonRender(requestBooking.status)}
        </div>
      </div>
      {isShowListDevice &&
        requestBooking.listDevice &&
        requestBooking.listDevice.length > 0 && (
          <div>
            <div style={{marginBottom: 35}}>
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
    width: 550,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    // width: 550,
  },
  modalInputDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    margin: 10,
    flex: 1,
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
