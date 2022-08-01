import React from 'react';
import {
  Button,
  createStyles,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Archive, Check, CircleCheck, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import { BookingRequestParams } from '../../models/pagination-params/booking-room-params.model';
import { fetchRoomBookings } from '../../redux/features/room-booking/thunk/fetch-room-booking-list';
import { showNotification } from '@mantine/notifications';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { acceptCheckoutRequest } from '../../redux/features/room-booking/thunk/accept-checkout-request';

interface CheckoutRequestModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: BookingRequestParams;
}

const CheckoutRequestModal: React.FC<CheckoutRequestModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedRequestId = useAppSelector(
    (state) => state.roomBooking.roomBooking.id
  );

  const dispatch = useAppDispatch();

  const handleCheckoutSelectedRequest = () => {
    dispatch(acceptCheckoutRequest(selectedRequestId))
      .catch((e) =>
        showNotification({
          id: 'checkout-booking-room',
          color: 'red',
          title: 'Error while checkout booking room',
          message: e.message ?? 'Failed to checkout booking room',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'checkout-booking-room',
          color: 'teal',
          title: 'This booking room was checkoutled',
          message: 'This booking room was successfully checkoutled',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        props.toggleInforModalShown();
        dispatch(fetchRoomBookings(props.pagination));
      });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Check in request</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={false}
      centered
      zIndex={200}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <Text className={classes.modalBody}>
        Are you sure accept user to Check-out
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
          onClick={() => handleCheckoutSelectedRequest()}
          variant="outline"
          color={'green'}
          leftIcon={<CircleCheck />}
        >
          Check out
        </Button>
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default CheckoutRequestModal;
