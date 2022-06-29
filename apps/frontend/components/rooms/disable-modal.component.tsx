import React from "react";
import {Button, createStyles, Modal, Text} from "@mantine/core";
import {Archive, X} from "tabler-icons-react";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {disableRoomById} from "../../redux/features/room/thunk/disable-room-by-id";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import { RoomParams } from "../../models/pagination-params/room-params.model";
import { fetchDisabledRooms } from "../../redux/features/room/thunk/fetch-disabled-rooms";

interface DisableRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: RoomParams;
}
const DisableRoomModal: React.FC<DisableRoomModalProps> = (props) => {

  const {classes} = useStyles();
  const selectedRoomId = useAppSelector((state) => state.room.room.id);

  const dispatch = useAppDispatch();

  const handleDisableSelectedRoom = () => {
    dispatch(disableRoomById(selectedRoomId))
      .then(() => {
        props.toggleShown();
        props.toggleInforModalShown();
        dispatch(fetchDisabledRooms(''))
        dispatch(fetchRooms(props.pagination));
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

export default DisableRoomModal;
