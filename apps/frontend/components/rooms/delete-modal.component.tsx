import React, { useEffect, useState } from 'react';
import { Button, createStyles, Modal, Select, Table, Text } from '@mantine/core';
import { Archive, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { deleteRoomById } from '../../redux/features/room/thunk/delete-room-by-id';
import { RoomParams } from '../../models/pagination-params/room-params.model';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-room-booking-by-room';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';

interface DeleteRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: RoomParams;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedRoomId = useAppSelector((state) => state.room.room.id);
  const [listRequest, setListRequest] = useState([]);
  const [isShownListRequest, setShownListRequest] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteRoomById(selectedRoomId)).then(() => {
      props.toggleShown();
      dispatch(fetchRooms(props.pagination));
      dispatch(fetchDeletedRooms(''));
    });
  };

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(fetchRequestByRoomId(selectedRoomId))
        .unwrap()
        .then((response) => setListRequest(response));
    }
  }, [dispatch, selectedRoomId]);

  const ListRequestByRoomId = () => {
    const rows =
      listRequest && listRequest.length > 0
        ? listRequest.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.requestedBy}</td>
              <td>
                {dayjs(row.timeCheckin).format('HH:mm DD/MM/YYYY')}
              </td>
              <td>
                {dayjs(row.timeCheckout).format('HH:mm DD/MM/YYYY')}
              </td>
              {/* <td className={classes.actionButtonContainer}>
                <Button
                  variant="outline"
                  color="green"
                  disabled={
                    roomType === row.type || roomType === '' ? true : false
                  }
                  onClick={() => handleUpdateType(row, roomType)}
                >
                  Save
                </Button>
              </td> */}
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
              Request By
            </Th>

            <Th sorted={null} reversed={null} onSort={null}>
              Time start
            </Th>
            <Th sorted={null} reversed={null} onSort={null}>
              Time end
            </Th>

            {/* <Th
              style={{
                width: '100px',
              }}
              sorted={null}
              reversed={null}
              onSort={null}
            >
              Actions
            </Th> */}
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
      size={isShownListRequest && listRequest.length > 0 ? '70%' : null}
      centered
      zIndex={2000}
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
              List request on this room
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
            Delete this type
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
      {isShownListRequest && listRequest.length > 0 ? <ListRequestByRoomId/> : null}

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

export default DeleteRoomModal;
