import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { Archive, Check, ScanEye, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { disableRoomById } from '../../redux/features/room/thunk/disable-room-by-id';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchDisabledRooms } from '../../redux/features/room/thunk/fetch-disabled-rooms';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-request-by-room';
import { disableDeviceById } from '../../redux/features/devices/thunk/disable-by-id';
import { fetchDisabledDevices } from '../../redux/features/devices/thunk/fetch-disabled.thunk';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';
import { fetchRequestByDeviceId } from '../../redux/features/room-booking/thunk/fetch-request-by-device';
import { showNotification } from '@mantine/notifications';

interface DisableDeviceModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: PagingParams;
}
const DisableDeviceModal: React.FC<DisableDeviceModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedDeviceId = useAppSelector((state) => state.device.device.id);
  const [listRequest, setListRequest] = useState([]);
  const [isShownListRequest, setShownListRequest] = useState(false);

  const dispatch = useAppDispatch();

  const handleDisableSelectedDevice = () => {
    if (listRequest.length > 0) {
      showNotification({
        id: 'delete-data',
        color: 'red',
        title: 'Error while delete device',
        message: 'Chưa xử lý vụ delete device đã có người book',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      dispatch(disableDeviceById(selectedDeviceId))
        .catch((e) =>
          showNotification({
            id: 'delete-data',
            color: 'red',
            title: 'Error while delete device',
            message: e.message ?? 'Failed to delete device',
            icon: <X />,
            autoClose: 3000,
          })
        )
        .then(() =>
          showNotification({
            id: 'delete-data',
            color: 'teal',
            title: 'Device was deleted',
            message: 'Device was successfully deleted',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .then(() => {
          props.toggleShown();
          props.toggleInforModalShown();
          dispatch(fetchDisabledDevices(''));
          dispatch(fetchDevices(props.pagination));
        });
    }
  };

  useEffect(() => {
    if (selectedDeviceId) {
      dispatch(fetchRequestByDeviceId(selectedDeviceId))
        .unwrap()
        .then((response) => setListRequest(response));
    }
  }, [dispatch, selectedDeviceId]);

  console.log('listRequest DEVICESSS:', listRequest);

  const ListRequestByDeviceId = () => {
    const rows =
      listRequest && listRequest.length > 0
        ? listRequest.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.roomName}</td>
              <td>{dayjs(row.checkinDate).format('DD-MM-YYYY')}</td>
              <td>{row.requestedBy}</td>
              <td>{row.checkinSlot}</td>
              <td>{row.checkoutSlot}</td>
            </tr>
          ))
        : null;
    return listRequest && listRequest.length > 0 ? (
      <ScrollArea sx={{ height: 200 }}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed' }}
        >
          <thead className={classes.header}>
            <tr>
              <Th
                style={{
                  width: '60px',
                }}
                sorted={null}
                reversed={null}
                onSort={null}
              >
                STT
              </Th>

              <Th sorted={null} reversed={null} onSort={null}>
                Name
              </Th>

              <Th sorted={null} reversed={null} onSort={null}>
                Check in date
              </Th>
              <Th sorted={null} reversed={null} onSort={null}>
                Requested by
              </Th>
              <Th sorted={null} reversed={null} onSort={null}>
                Slot start
              </Th>
              <Th sorted={null} reversed={null} onSort={null}>
                Slot End
              </Th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0px',
        }}
      >
        <h1>Dont have any room with this type</h1>
      </div>
    );
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
      size={isShownListRequest && listRequest.length > 0 ? '50%' : null}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>Thay đổi thông báo này sau đi</Text>
        <div className={classes.modalFooter}>
          {listRequest.length > 0 ? (
            <Button
              leftIcon={<ScanEye />}
              style={{ backgroundColor: 'blue', width: '60%', margin: 10 }}
              onClick={() => setShownListRequest(!isShownListRequest)}
            >
              Requests use this device
            </Button>
          ) : null}
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
      {isShownListRequest && listRequest.length > 0 ? (
        <ListRequestByDeviceId />
      ) : null}
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
