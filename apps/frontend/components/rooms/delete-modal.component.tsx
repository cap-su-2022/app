import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { Check, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { deleteRoomById } from '../../redux/features/room/thunk/delete-room-by-id';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-request-by-room';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import { showNotification } from '@mantine/notifications';

interface DeleteRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const selectedRoomId = useAppSelector((state) => state.room.room.id);
  const [listRequest, setListRequest] = useState([]);
  const [isShownListRequest, setShownListRequest] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    // if (listRequest.length > 0) {
    //   showNotification({
    //     id: 'delete-data',
    //     color: 'red',
    //     title: 'Error while delete room',
    //     message: 'Chưa xử lý vụ delete room đã có người book',
    //     icon: <X />,
    //     autoClose: 3000,
    //   });
    // } else {
      dispatch(deleteRoomById(selectedRoomId))
        .catch((e) =>
          showNotification({
            id: 'delete-data',
            color: 'red',
            title: 'Error while delete room',
            message: e.message ?? 'Failed to delete room',
            icon: <X />,
            autoClose: 3000,
          })
        )
        .then(() =>
          showNotification({
            id: 'delete-data',
            color: 'teal',
            title: 'Room was deleted',
            message: 'Room was successfully deleted',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .then(() => {
          props.toggleShown();
          dispatch(fetchRooms(props.pagination));
          dispatch(fetchDeletedRooms(''));
          listRequest.map((request) => dispatch(cancelBooking(request.id)));
        });
    // }
  };

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(fetchRequestByRoomId(selectedRoomId))
        .unwrap()
        .then((response) => setListRequest(response));
    }
  }, [dispatch, selectedRoomId]);

  useEffect(() => {
    if (!props.isShown) {
      setShownListRequest(false);
    }
  }, [props.isShown]);

  const ListRequestByRoomId = () => {
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
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
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
      size={isShownListRequest && listRequest.length > 0 ? '50%' : null}
      centered
      zIndex={100}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Delete this room will make it <b>unusable</b> even if it has been
          booked before.
          <b> Users who booked this room</b> will receive a notification about
          this and that associated booking will also be <b>cancelled</b>!<br />
          <br />
          This room also will not be available from now on after being deleted.
        </Text>
        <div className={classes.modalFooter}>
          {listRequest.length > 0 ? (
            <Button
              leftIcon={<ScanEye />}
              style={{ backgroundColor: 'blue', width: '60%', margin: 10 }}
              onClick={() => setShownListRequest(!isShownListRequest)}
            >
              Requests use this room
            </Button>
          ) : null}

          <Button
            color="red"
            leftIcon={<Trash />}
            onClick={() => handleDeleteRoom()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Delete this room
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
        <ListRequestByRoomId />
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

export default DeleteRoomModal;
