import React from "react";
import {Button, createStyles, Modal, Text} from "@mantine/core";
import {Archive, X} from "tabler-icons-react";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  setSuccessModalMessage,
  toggleSuccessModal
} from "../../redux/features/room/room.slice";
import {disableRoomById} from "../../redux/features/room/thunk/disable-room-by-id";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import {deleteRoomById} from "../../redux/features/room/thunk/delete-room-by-id";

interface DeleteRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleUpdateModalShown(): void;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = (props) => {

  const {classes} = useStyles();

  const selectedRoomId = useAppSelector((state) => state.room.selectedRoom.id);

  const dispatch = useAppDispatch();

  const handleDisableSelectedRoom = () => {
    dispatch(deleteRoomById(selectedRoomId))
      .then(() => {
        props.toggleShown();
        props.toggleUpdateModalShown();
        dispatch(toggleSuccessModal());
        dispatch(setSuccessModalMessage("Successfully disabled this room!"));
        dispatch(fetchRooms());
      })
  }

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalTitle}>Are you sure?</Text>
    )
  };

  return (
    <Modal
      closeOnClickOutside={false}
      centered
      zIndex={200}
      title={<ModalHeaderTitle/>}
      opened={props.isShown}
      onClose={() => props.toggleShown()}>
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Disable this will make this room <b>unusable</b> even it has been booked before.
          <b> Users who booked this room</b> will receive the notification about this and that associated booking will
          also be <b>cancelled</b>!
        </Text>
        <div className={classes.modalFooter}>
          <Button onClick={() => props.toggleShown()} leftIcon={<X/>} style={{
            backgroundColor: FPT_ORANGE_COLOR
          }}>Cancel</Button>
          <Button color="red" leftIcon={<Archive/>}
                  onClick={() => handleDisableSelectedRoom()}>
            Disable this room
          </Button>
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
    margin: 10
  },
  modalBody: {
    margin: 10
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  }
});

export default DeleteRoomModal;
