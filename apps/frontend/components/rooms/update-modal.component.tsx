import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useWindowDimensions } from '../../hooks/use-window-dimensions';
import {
  Check,
  ClipboardText,
  FileDescription,
  Id,
  Pencil,
  Trash,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Form, FormikProvider, useFormik, FormikProps } from 'formik';
import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { LIBRARY_ROOM_TYPE } from '../../constants/library-room-type.model';
import * as Yup from 'yup';
import { showNotification } from '@mantine/notifications';
import { InputUpdateProps } from '../../components/actions/models/input-update-props.model';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchRoomTypes } from '../../redux/features/room-type';
import { PaginationResponse } from '../../models/pagination-response.payload';
import { RoomType } from '../../models/room-type.model';

interface UpdateModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
  roomTypes: any[];
}

const UpdateRoomValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Room name must be at least 2 characters')
    .max(100, 'Room name can only maximum at 100 characters')
    .required('Room name is required'),
  description: Yup.string().max(
    500,
    'Room description can only maximum at 500 characters'
  ),
});

const RoomUpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { classes } = useStyles();
  const room = useAppSelector((state) => state.room.room);
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<string>('');

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  useEffect(() => {
    setRoomType(room.roomTypeId);
  }, [room.roomTypeId]);

  const handleUpdateSubmit = async (values) => {
    dispatch(
      updateRoomById({
        id: values.id,
        payload: {
          ...values,
          type: roomType,
        },
      })
    )
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while updating library room',
          message: e.message ?? 'Failed to update library room',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Library room was updated',
          message: 'Library room was successfully updated',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => props.toggleShown())
      .then(() => dispatch(fetchRooms(props.pagination)))
      .finally(() => {
        formik.resetForm();
      });
  };

  const formik = useFormik({
    initialValues: {
      id: room.id,
      name: room.name,
      description: room.description,
      type: room.roomTypeId,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleUpdateSubmit(values),
    validationSchema: UpdateRoomValidation,
  });

  useEffect(() => {
    if (
      formik.initialValues.name === formik.values.name &&
      formik.initialValues.description === formik.values.description
    ) {
      setUpdateDisabled(true);
    } else {
      setUpdateDisabled(false);
    }
  }, [formik.values.name, formik.values.description, formik.initialValues.name, formik.initialValues.description]);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Update Room Information</Text>
    );
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size='lg'
        centered
        opened={props.isShown}
        onClose={() => {
          formik.resetForm();
          props.toggleShown();
        }}
      >
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <InputWrapper
                label="Room ID"
                style={{marginBottom: 20}}
              >
                <TextInput
                  icon={<Id />}
                  disabled
                  id="room-id"
                  name="id"
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={formik.values.id}
                />
              </InputWrapper>
              <InputWrapper
                required
                label="Room name"
                style={{marginBottom: 20}}
              >
                <TextInput
                  icon={<ClipboardText />}
                  id="room-name"
                  name="name"
                  error={formik.errors.name}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.name}
                />
              </InputWrapper>
              <InputWrapper
                required
                label="Room Type"
                style={{marginBottom: 20}}
              >
                <Select
                  onChange={(e) => {
                    setUpdateDisabled(false);
                    setRoomType(e);
                  }}
                  searchable
                  defaultChecked={true}
                  name="type"
                  id="room-type"
                  data={props.roomTypes}
                  value={roomType}
                />
              </InputWrapper>
              <InputWrapper
                label="Room Description"
              >
                <Textarea
                  id="room-description"
                  name="description"
                  icon={<FileDescription />}
                  error={formik.errors.description}
                  onChange={formik.handleChange}
                  radius="md"
                  minRows={4}
                  value={formik.values.description}
                />
              </InputWrapper>
            </div>

            <div className={classes.modalFooter}>
              <Button
                color="green"
                disabled={isUpdateDisabled}
                onClick={() => formik.submitForm()}
                leftIcon={<Pencil />}
              >
                Update
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Modal>
    </>
  );
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 10,
  },
  modalInputDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 10,
  },
});

export default RoomUpdateModal;
