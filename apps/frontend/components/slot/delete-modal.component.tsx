import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  Select,
  Table,
  Text,
} from '@mantine/core';
import {
  Check,
  ScanEye,
  Trash,
  X,
} from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchDeletedRoomTypes,
  fetchRoomTypes,
} from '../../redux/features/room-type/';
import { deleteRoomTypeById } from '../../redux/features/room-type/';
import { PaginationParams } from '../../models/pagination-params.model';
import Th from '../../components/table/th.table.component';
import { fetchRoomsByRoomType } from '../../redux/features/room/thunk/fetch-rooms-by-room-type';
import { showNotification } from '@mantine/notifications';
import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import { fetchAllSlots } from '../../redux/features/slot/thunk/fetch-slots.thunk';
import { fetchDeletedSlots } from '../../redux/features/slot/thunk/fetch-deleted-device-types';
import dayjs from 'dayjs';
import { fetchRequestsBySlot } from '../../redux/features/room-booking/thunk/fetch-request-by-slot';
import { deleteSlotById } from '../../redux/features/slot/thunk/delete-slot-by-id.thunk';

interface DeleteModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PaginationParams;
  // slots: any[];
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedSlotId = useAppSelector(
    (state) => state.slot.slot.id
  );
  const [slot, setSlot] = useState<string>('');
  const [isShownListRequest, setShownListRequest] = useState(false);

  const [listRequest, setListRequest] = useState([]);
  console.log("LIST REQUEST: ", listRequest);

  const dispatch = useAppDispatch();

  const handleDeleteSlot = () => {
    if (listRequest.length > 0) {
      showNotification({
        id: 'delete-data',
        color: 'red',
        title: 'Error while delete slot',
        message:
          'Chưa xử lý vụ delete slot đã có người book',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      dispatch(deleteSlotById(selectedSlotId))
        .catch((e) =>
          showNotification({
            id: 'delete-data',
            color: 'red',
            title: 'Error while delete slot',
            message: e.message ?? 'Failed to delete slot',
            icon: <X />,
            autoClose: 3000,
          })
        )
        .then(() =>
          showNotification({
            id: 'delete-data',
            color: 'teal',
            title: 'Slot was deleted',
            message: 'Slot was successfully deleted',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .then(() => {
          props.toggleShown();
          dispatch(fetchAllSlots(props.pagination));
          dispatch(fetchDeletedSlots(''));
        });
    }
  };

  useEffect(() => {
    if (selectedSlotId) {
      dispatch(fetchRequestsBySlot(selectedSlotId))
        .unwrap()
        .then((response) => setListRequest(response));
    }
  }, [dispatch, selectedSlotId]);

  useEffect(() => {
    if (!props.isShown) {
      setShownListRequest(false);
    }
  }, [props.isShown]);

  // useEffect(() => {
  //   if (!isShownListRequest) {
  //     setRoomType('');
  //   }
  // }, [isShownListRoom]);

  // const handleUpdateType = (room, roomTypeId: string) => {
  //   dispatch(
  //     updateRoomById({
  //       id: room.id,
  //       payload: {
  //         ...room,
  //         type: roomTypeId,
  //       },
  //     })
  //   )
  //     .unwrap()
  //     .catch((e) =>
  //       showNotification({
  //         id: 'load-data',
  //         color: 'red',
  //         title: 'Error while updating library room',
  //         message: e.message ?? 'Failed to update library room',
  //         icon: <X />,
  //         autoClose: 3000,
  //       })
  //     )
  //     .then(() =>
  //       showNotification({
  //         id: 'load-data',
  //         color: 'teal',
  //         title: 'Library room was updated',
  //         message: 'Library room was successfully updated',
  //         icon: <Check />,
  //         autoClose: 3000,
  //       })
  //     )
  //     // .then(() => props.toggleShown())
  //     .then(() =>
  //       dispatch(fetchRoomsByRoomType(selectedRoomTypeId))
  //         .unwrap()
  //         .then((response) => setListRoom(response))
  //     );
  // };

  const ListRequestBySlot = () => {
    const rows =
      listRequest && listRequest.length > 0
        ? listRequest.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.roomName}</td>
              <td>{dayjs(row.checkinDate).format("DD-MM-YYYY")}</td>
              <td>{row.requestedBy}</td>
              <td>{row.checkinSlot}</td>
              <td>{row.checkoutSlot}</td>
            </tr>
          ))
        : null;
    return listRequest && listRequest.length > 0 ? (
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
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
      zIndex={100}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
      size={isShownListRequest && listRequest.length > 0 ? '50%' : null}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Deleting this room type will{' '}
          <b>also delete rooms of this room type</b>. And make that rooms
          unusable even if it has been booked before. Users who booked this room
          will receive a notification about this and that associated booking
          will also be cancelled!
        </Text>
        <div className={classes.modalFooter}>
          {listRequest?.length > 0 ? (
            <Button
              leftIcon={<ScanEye />}
              style={{ backgroundColor: 'blue', width: '60%', margin: 10 }}
              onClick={() => setShownListRequest(!isShownListRequest)}
            >
              List request use slot
            </Button>
          ) : null}

          <Button
            color="red"
            leftIcon={<Trash />}
            onClick={() => handleDeleteSlot()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Delete this slot
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
      {isShownListRequest && listRequest.length > 0 ? <ListRequestBySlot /> : null}
    </Modal>
  );
};

const useStyles = createStyles({
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
});

export default DeleteModal;
