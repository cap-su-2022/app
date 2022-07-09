import React, { useEffect, useState } from 'react';
import { Button, createStyles, Modal, ScrollArea, Table, Text } from '@mantine/core';
import { Archive, ScanEye, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { disableRoomById } from '../../redux/features/room/thunk/disable-room-by-id';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchDisabledRooms } from '../../redux/features/room/thunk/fetch-disabled-rooms';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-room-booking-by-room';
import { disableDeviceById } from '../../redux/features/devices/thunk/disable-by-id';
import { fetchDisabledDevices } from '../../redux/features/devices/thunk/fetch-disabled.thunk';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';

interface DisableDeviceModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: PagingParams;
}
const DisableDeviceModal: React.FC<DisableDeviceModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedDeviceId = useAppSelector((state) => state.device.device.id);

  const dispatch = useAppDispatch();

  const handleDisableSelectedDevice = () => {
    dispatch(disableDeviceById(selectedDeviceId)).then(() => {
      props.toggleShown();
      props.toggleInforModalShown();
      dispatch(fetchDisabledDevices(''));
      dispatch(fetchDevices(props.pagination));
    });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Are you sure?</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={true}
      centered
      zIndex={200}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Thay đổi thông báo này sau đi
        </Text>
        <div className={classes.modalFooter}>
          <Button
            color="red"
            leftIcon={<Archive />}
            onClick={() => handleDisableSelectedDevice()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Disable this device
          </Button>
          <Button
            onClick={() => props.toggleShown()}
            leftIcon={<X />}
            style={{
              backgroundColor: FPT_ORANGE_COLOR,
              width: '60%',
              margin: 10,
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createStyles((theme) => ({
  modalTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
  modalContainer: {
    margin: 10,
  },
  modalBody: {
    margin: 10,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
}));

export default DisableDeviceModal;
