import React, {useEffect, useState} from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {useWindowDimensions} from '../../hooks/use-window-dimensions';
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
import {convertDateToLocalDateString} from '../../utils/date.util';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import dayjs from 'dayjs';


interface InfoModalProps {
  isShown: boolean;

  toggleShown(): void;

  toggleDisableModalShown(): void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const {classes} = useStyles();
  const user = useAppSelector((state) => state.account.account);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, [])


  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Account Information</Text>
    );
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle/>}
        size={'50%'}
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <div className={classes.modalBody}>
          <TextInput
            icon={<Id/>}
            className={classes.textInput}
            radius="md"
            label="Account ID"
            readOnly
            value={user.id}
          />
          <div className={classes.displayGrid}>
            <TextInput
              icon={<ClipboardText/>}
              className={classes.textInput}
              radius="md"
              label="Username"
              readOnly
              value={user.username}
            />
            <TextInput
              icon={<ClipboardText/>}
              className={classes.textInput}
              radius="md"
              label="Fullname"
              readOnly
              value={user.fullname}
            />
            <TextInput
              icon={<ClipboardText/>}
              className={classes.textInput}
              radius="md"
              label="Email"
              readOnly
              value={user.email}
            />
            <TextInput
              icon={<ClipboardText/>}
              className={classes.textInput}
              radius="md"
              label="Phone"
              readOnly
              value={user.phone}
            />
          </div>

          <TextInput
            icon={<ClipboardText/>}
            className={classes.textInput}
            radius="md"
            label="Role"
            readOnly
            value={user.role}
          />
          <Textarea
            icon={<FileDescription/>}
            className={classes.textInput}
            radius="md"
            label="Description"
            readOnly
            autosize
            value={user.description || undefined}
          />
          <div className={classes.displayGrid}>
            <TextInput
              id="createdAt"
              icon={<Clock/>}
              className={classes.textInput}
              radius="md"
              label="Created At"
              readOnly
              value={dayjs(user.createdAt).format('HH:mm DD/MM/YYYY')}
            />
            <TextInput
              id="updatedAt"
              label="Updated At"
              icon={<Clock/>}
              className={classes.textInput}
              radius="md"
              readOnly
              value={dayjs(user.updatedAt).format('HH:mm DD/MM/YYYY')}
            />

            <TextInput
              id="createdBy"
              icon={<User/>}
              className={classes.textInput}
              radius="md"
              label="Created By"
              readOnly
              value={user.createdBy || undefined}
            />
            <TextInput
              id="updatedBy"
              label="Updated By"
              icon={<User/>}
              className={classes.textInput}
              radius="md"
              readOnly
              value={user.updatedBy || undefined}
            />
          </div>
        </div>

        <div className={classes.modalFooter}>
          {userInfo.id !== user.id ?
            <Button
              onClick={() => props.toggleDisableModalShown()}
              variant="outline"
              color={'red'}
              leftIcon={<Archive/>}
            >
              Disable this account
            </Button> : null
          }
          <Button onClick={() => props.toggleShown()} leftIcon={<X/>}>
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
  displayGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    columnGap: '20px',
  },
  textInput: {
    marginTop: 10,
  },
});

export default InfoModal;
