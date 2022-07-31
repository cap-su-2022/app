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
import { useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';

interface DeviceInfoModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleDisableModalShown(): void;
}

const DeviceInfoModal: React.FC<DeviceInfoModalProps> = (props) => {
  const { classes } = useStyles();
  const device = useAppSelector((state) => state.device.device);

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalHeaderTitle}>Device Information</Text>;
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
          <InputWrapper label="Device ID" description="Unique ID of the device">
            <TextInput
              icon={<Id />}
              className={classes.textInput}
              radius="md"
              readOnly
              value={device.id}
            />
          </InputWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputWrapper label="Device name" description="Unique device name">
              <TextInput
                icon={<ClipboardText />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={device.name}
              />
            </InputWrapper>
            <InputWrapper
              label="Device type"
            >
              <TextInput
                icon={<ClipboardText />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={device.deviceTypeName}
              />
            </InputWrapper>
          </div>
          <InputWrapper
            label="Device description"
          >
            <Textarea
              icon={<FileDescription />}
              className={classes.textInput}
              radius="md"
              readOnly
              value={device.description}
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
                value={dayjs(device.createdAt).format('HH:mm DD/MM/YYYY')}
              />
            </InputWrapper>
            <InputWrapper label="Created by">
              <TextInput
                icon={<User />}
                className={classes.textInput}
                radius="md"
                readOnly
                id="device-createdby"
                value={device.createdBy}
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
                id="device-updatedat"
                icon={<CalendarStats />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={dayjs(device.updatedAt).format('HH:mm DD/MM/YYYY')}
              />
            </InputWrapper>
            <InputWrapper label="Updated by">
              <TextInput
                id="device-updatedby"
                icon={<User />}
                className={classes.textInput}
                radius="md"
                readOnly
                value={device.updatedBy}
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
            Disable this device
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

export default DeviceInfoModal;
