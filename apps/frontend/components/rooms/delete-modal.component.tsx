import React from 'react';
import { Button, createStyles, Modal, Text } from '@mantine/core';
import { Archive, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { deleteRoomById } from '../../redux/features/room/thunk/delete-room-by-id';
import { RoomParams } from '../../models/pagination-params/room-params.model';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';

interface DeleteRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: RoomParams;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedRoomId = useAppSelector((state) => state.room.room.id);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteRoomById(selectedRoomId)).then(() => {
      props.toggleShown();
      dispatch(fetchRooms(props.pagination));
      dispatch(fetchDeletedRooms());
    });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Are you sure?</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={false}
      centered
      zIndex={2000}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Delete this will make this room <b>unusable</b> even if it has been
          booked before.
          <b> Users who booked this room</b> will receive a notification about
          this and that associated booking will also be <b>cancelled</b>!<br />
          <br />
          This room also will not be available from now on after being deleted.
        </Text>
        <div className={classes.modalFooter}>
          <Button
            onClick={() => props.toggleShown()}
            leftIcon={<X />}
            style={{
              backgroundColor: FPT_ORANGE_COLOR,
            }}
          >
            Cancel
          </Button>
          <Button
            color="red"
            leftIcon={<Trash />}
            onClick={() => handleDeleteRoom()}
          >
            Delete this room
          </Button>
          <div style={{textAlign: 'center', width: '100%', marginTop: 10 }}>
            <Button leftIcon={<ScanEye />} style={{ backgroundColor: 'blue' }}>
              View list request for this room
            </Button>
          </div>
        </div>
      </div>
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default DeleteRoomModal;
