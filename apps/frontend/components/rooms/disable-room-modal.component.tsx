import React from "react";
import {Button, createStyles, Modal, Text} from "@mantine/core";
import {Archive, X} from "tabler-icons-react";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  setSuccessModalMessage, toggleRoomDetailModalShown,
  toggleRoomDisableModalVisible,
  toggleSuccessModal
} from "../../redux/features/room/room.slice";
import {disableRoomById} from "../../redux/features/room/thunk/disable-room-by-id";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";

const DisableRoomModal: React.FC = () => {

  const {classes} = useStyles();

  const isShown = useAppSelector((state) => state.room.isRoomDisableModalShown);
  const selectedRoomId = useAppSelector((state) => state.room.selectedRoom.id);

  const dispatch = useAppDispatch();

  const handleDisableSelectedRoom = () => {
    dispatch(disableRoomById(selectedRoomId))
      .then(() => {
        dispatch(toggleRoomDisableModalVisible());
        dispatch(toggleRoomDetailModalShown());
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
      opened={isShown}
      onClose={() => dispatch(toggleRoomDisableModalVisible())}>
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Disable this will make this room <b>unusable</b> even it has been booked before.
          <b> Users who booked this room</b> will receive the notification about this and that associated booking will
          also be <b>cancelled</b>!
        </Text>
        <div className={classes.modalFooter}>
          <Button onClick={() => dispatch(toggleRoomDisableModalVisible())} leftIcon={<X/>} style={{
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
    fontWeight: '600',
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

export default DisableRoomModal;
