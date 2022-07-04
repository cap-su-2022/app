import React from "react";
import {Button, createStyles, Modal, Text} from "@mantine/core";
import {Archive, X} from "tabler-icons-react";
import {FPT_ORANGE_COLOR} from "@app/constants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {cancelBooking} from "../../redux/features/room-booking/thunk/cancel-booking";
import { BookingRequestParams } from "../../models/pagination-params/booking-room-params.model";
import { fetchRoomBookings } from "../../redux/features/room-booking/thunk/fetch-room-booking-list";

interface DisableRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: BookingRequestParams;
}
const CancelRequestModal: React.FC<DisableRoomModalProps> = (props) => {

  const {classes} = useStyles();
  const selectedRequestId = useAppSelector((state) => state.roomBooking.roomBooking.id);

  const dispatch = useAppDispatch();

  const handleCancelSelectedRequest = () => {
    dispatch(cancelBooking(selectedRequestId))
      .then(() => {
        props.toggleShown();
        props.toggleInforModalShown();
        dispatch(fetchRoomBookings(props.pagination));
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
        After canceling this request, we will send a notification to the person who booked this room.
        </Text>
        <div className={classes.modalFooter}>
          <Button onClick={() => props.toggleShown()} leftIcon={<X/>} style={{
            backgroundColor: FPT_ORANGE_COLOR
          }}>Cancel</Button>
          <Button color="red" leftIcon={<Archive/>}
                  onClick={() => handleCancelSelectedRequest()}>
            Cancel this request
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

export default CancelRequestModal;
