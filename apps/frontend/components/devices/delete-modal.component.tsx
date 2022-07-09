import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { Archive, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { deleteRoomById } from '../../redux/features/room/thunk/delete-room-by-id';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-room-booking-by-room';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import { deleteDeviceById } from '../../redux/features/devices/thunk/delete-by-id';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';
import { fetchDeletedDevices } from '../../redux/features/devices/thunk/fetch-deleted.thunk';

interface DeleteDeviceModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const DeleteDeviceModal: React.FC<DeleteDeviceModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const selectedDeviceId = useAppSelector((state) => state.device.device.id);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteDevice = () => {
    dispatch(deleteDeviceById(selectedDeviceId)).then(() => {
      props.toggleShown();
      dispatch(fetchDevices(props.pagination));
      dispatch(fetchDeletedDevices(''));
    });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Are you sure?</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={true}
      centered
      zIndex={2000}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Chổ này thay đổi sau đi
        </Text>
        <div className={classes.modalFooter}>

          <Button
            color="red"
            leftIcon={<Trash />}
            onClick={() => handleDeleteDevice()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Delete this device
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
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default DeleteDeviceModal;
