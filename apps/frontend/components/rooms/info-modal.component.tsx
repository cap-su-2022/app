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

interface RoomInfoModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleDisableModalShown(): void;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = (props) => {
  const { classes } = useStyles();
  const room = useAppSelector((state) => state.room.room);
  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  useEffect(() => {
    console.log(room);
  }, []);

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalHeaderTitle}>Room Information</Text>;
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
          <InputWrapper label="Room ID" description="Unique ID of the room">
            <TextInput
              icon={<Id />}
              className={classes.textInput}
              radius="md"
              readOnly
              value={room.id}
            />
          </InputWrapper>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <InputWrapper label="Created at">
              <TextInput
                icon={<Clock />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={dayjs(room.createdAt).format('HH:mm DD/MM/YYYY')}
              />
            </InputWrapper>
            <InputWrapper label="Created by">
              <TextInput
                icon={<User />}
                className={classes.textInput}
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
                icon={<CalendarStats />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={dayjs(room.updatedAt).format('HH:mm DD/MM/YYYY')}

              />
            </InputWrapper>
            <InputWrapper label="Updated by">
              <TextInput
                id="room-updatedby"
                icon={<User />}
                className={classes.textInput}
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
            leftIcon={<Archive />}
          >
            Disable this room
          </Button>

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
  textInput: {
    marginTop: 10,
  },
});

export default RoomInfoModal;
