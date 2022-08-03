import React, {useEffect} from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
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
import {useAppSelector} from '../../redux/hooks';
import dayjs from 'dayjs';

interface RoomInfoModalProps {
  isShown: boolean;

  toggleShown(): void;

  toggleDisableModalShown(): void;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = (props) => {
  const {classes} = useStyles();
  const room = useAppSelector((state) => state.room.room);

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalHeaderTitle}>Room Information</Text>;
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle/>}
        size="lg"
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <div className={classes.modalBody}>
          <InputWrapper label="Room ID" style={{marginBottom: 20}}>
            <TextInput icon={<Id/>} radius="md" readOnly value={room.id}/>
          </InputWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <InputWrapper label="Room name">
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={room.name}
              />
            </InputWrapper>
            <InputWrapper label="Room type">
              <TextInput
                icon={<ClipboardText/>}
                radius="md"
                readOnly
                value={room.roomTypeName}
              />
            </InputWrapper>
          </div>
          <InputWrapper label="Room description" style={{marginBottom: 20}}>
            <Textarea
              icon={<FileDescription/>}
              radius="md"
              readOnly
              autosize
              value={room.description}
            />
          </InputWrapper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <InputWrapper label="Created at">
              <TextInput
                icon={<Clock/>}
                radius="md"
                readOnly
                value={dayjs(room.createdAt).format('HH:mm DD/MM/YYYY')}
              />
            </InputWrapper>
            <InputWrapper label="Created by">
              <TextInput
                icon={<User/>}
                radius="md"
                readOnly
                id="room-createdby"
                value={room.createdBy}
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
            <InputWrapper label="Updated at">
              <TextInput
                id="room-updatedat"
                icon={<CalendarStats/>}
                radius="md"
                readOnly
                value={dayjs(room.updatedAt).format('HH:mm DD/MM/YYYY')}
              />
            </InputWrapper>
            <InputWrapper label="Updated by">
              <TextInput
                id="room-updatedby"
                icon={<User/>}
                radius="md"
                readOnly
                value={room.updatedBy}
              />
            </InputWrapper>
          </div>
        </div>

        <div className={classes.modalFooter}>
          <Button
            onClick={() => props.toggleDisableModalShown()}
            variant="outline"
            color={'red'}
            leftIcon={<Archive/>}
          >
            Disable this room
          </Button>

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
  modalInputDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RoomInfoModal;
