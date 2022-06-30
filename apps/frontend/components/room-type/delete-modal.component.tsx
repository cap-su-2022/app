import React from 'react';
import { Button, createStyles, Modal, Text } from '@mantine/core';
import { Archive, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDeletedRoomTypes, fetchRoomTypes } from '../../redux/features/room-type/';
import { deleteRoomTypeById } from '../../redux/features/room-type/';
import { PaginationParams } from '../../models/pagination-params.model';
// import { fetchDeletedRoomTypes } from '../../redux/features/room-type';

interface DeleteModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PaginationParams;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedRoomTypeId = useAppSelector((state) => state.roomType.roomType.id);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteRoomTypeById(selectedRoomTypeId)).then(() => {
      props.toggleShown();
      dispatch(fetchRoomTypes(props.pagination));
      dispatch(fetchDeletedRoomTypes());
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
          Deleting this room type will <b>also delete rooms of this room type</b>. And
          make that rooms unusable even if it has been booked before. Users who
          booked this room will receive a notification about this and that
          associated booking will also be cancelled!
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
            Delete this type
          </Button>
          <div style={{ textAlign: 'center', width: '100%', marginTop: 10 }}>
            <Button leftIcon={<ScanEye />} style={{ backgroundColor: 'blue' }}>
              View list room with this type
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

export default DeleteModal;
