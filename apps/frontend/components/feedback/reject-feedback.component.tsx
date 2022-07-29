import React from 'react';
import {
  Button,
  createStyles,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Archive, Check, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showNotification } from '@mantine/notifications';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchFeedbacks } from '../../redux/features/feedback/thunk/fetch-feedback';
import { rejectFeedback } from '../../redux/features/feedback/thunk/reject-feedback';
import { FeedbackPaginationParams } from '../../models/pagination-params/feedback-paging-params.model';

interface RejectFeedbackModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: FeedbackPaginationParams;
}

const validation = Yup.object().shape({
  replyMessage: Yup.string()
    .trim()
    .min(10, 'Reason must be at least 10 characters')
    .max(100, 'Reason can only maximum at 100 characters')
    .required('Reason is required'),
});

const RejectFeedbackModal: React.FC<RejectFeedbackModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedFeedbackId = useAppSelector(
    (state) => state.feedback.feedback.id
  );

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      id: selectedFeedbackId,
      replyMessage: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => handleRejectSelectedFeedback(values),
    validationSchema: validation,
  });

  const handleRejectSelectedFeedback = (values) => {
    dispatch(rejectFeedback(values))
      .catch((e) =>
        showNotification({
          id: 'reject-feedback',
          color: 'red',
          title: 'Error while reject feedback',
          message: e.message ?? 'Failed to reject feedback',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'reject-feedback',
          color: 'teal',
          title: 'This feedback was rejectled',
          message: 'This feedback was successfully rejectled',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        props.toggleInforModalShown();
        dispatch(fetchFeedbacks(props.pagination));
      });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Reject feedback</Text>;
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
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className={classes.modalContainer}>
            <div>
              <Textarea
                minRows={4}
                placeholder="Reason"
                label="Reason"
                required
                id="replyMessage"
                name="replyMessage"
                error={formik.errors.replyMessage}
                onChange={formik.handleChange}
                radius="md"
                value={formik.values.replyMessage}
              />
            </div>
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
                leftIcon={<Archive />}
                onClick={() => formik.handleSubmit()}
              >
                Reject this feedback
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
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

export default RejectFeedbackModal;
