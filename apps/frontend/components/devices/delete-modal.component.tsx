import React from "react";
import {Button, createStyles, Modal, Text} from "@mantine/core";
import {Archive, Trash, X} from "tabler-icons-react";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import {deleteRoomById} from "../../redux/features/room/thunk/delete-room-by-id";
import {resetRoomFilter} from "../../redux/features/room/room.slice";
import {deleteDeviceById} from "../../redux/features/devices/thunk/delete-by-id";
import {fetchDevices} from "../../redux/features/devices/thunk/fetch-devices.thunk";

interface DeleteModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleUpdateModalShown(): void;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {

  const {classes} = useStyles();

  const selectedDeviceId = useAppSelector((state) => state.device.selectedDevice.id);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteDeviceById(selectedDeviceId))
      .then(() => {
        dispatch(resetRoomFilter());
        props.toggleShown();
        props.toggleUpdateModalShown();
        dispatch(fetchDevices());
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
      zIndex={2000}
      title={<ModalHeaderTitle/>}
      opened={props.isShown}
      onClose={() => props.toggleShown()}>
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Delete this will make this device <b>unusable</b> even it has been booked before.
          <b> Users who booked this device</b> will receive the notification about this and that associated booking will
          also be <b>cancelled</b>!<br/>
          This device also will not be available from now on after being deleted.
        </Text>
        <div className={classes.modalFooter}>
          <Button onClick={() => props.toggleShown()} leftIcon={<X/>} style={{
            backgroundColor: FPT_ORANGE_COLOR
          }}>Cancel</Button>
          <Button color="red" leftIcon={<Trash/>}
                  onClick={() => handleDeleteRoom()}>
            Delete this device
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

export default DeleteModal;
