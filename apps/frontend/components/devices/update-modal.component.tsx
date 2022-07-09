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
import { PaginationResponse } from '../../models/pagination-response.payload';
import { RoomType } from '../../models/room-type.model';
import { updateDeviceById } from '../../redux/features/devices/thunk/update-by-id';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';

interface UpdateModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
  deviceTypes: any[];
}

const UpdateDeviceValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Device name must be at least 2 characters')
    .max(100, 'Device name can only maximum at 100 characters')
    .required('Device name is required'),
  description: Yup.string().max(
    500,
    'Device description can only maximum at 500 characters'
  ),
});

const DeviceUpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { classes } = useStyles();
  const device = useAppSelector((state) => state.device.device);
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<string>('');

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  useEffect(() => {
    setDeviceType(device.deviceTypeId);
  }, [device.deviceTypeId]);

  const handleUpdateSubmit = async (values) => {
    dispatch(
      updateDeviceById({
        id: values.id,
        payload: {
          ...values,
          type: deviceType,
        },
      })
    )
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while updating library device',
          message: e.message ?? 'Failed to update library device',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Library device was updated',
          message: 'Library device was successfully updated',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => props.toggleShown())
      .then(() => dispatch(fetchDevices(props.pagination)))
      .finally(() => {
        formik.resetForm();
      });
  };

  const formik = useFormik({
    initialValues: {
      id: device.id,
      name: device.name,
      description: device.description,
      type: device.deviceTypeId,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleUpdateSubmit(values),
    validationSchema: UpdateDeviceValidation,
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
        size={dimension.width / 2}
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
                required
                label="Device ID"
                description="Device ID is unique"
              >
                <TextInput
                  icon={<Id />}
                  disabled
                  id="device-id"
                  name="id"
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={formik.values.id}
                />
              </InputWrapper>
              <InputWrapper
                required
                label="Device name"
                description="Device name is unique. Maximum length is 100 characters"
              >
                <TextInput
                  icon={<ClipboardText />}
                  id="device-name"
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
                label="Device Type"
                description="Separate libray device type"
              >
                <Select
                  onChange={(e) => {
                    setUpdateDisabled(false);
                    setDeviceType(e);
                  }}
                  searchable
                  defaultChecked={true}
                  name="type"
                  id="device-type"
                  data={props.deviceTypes}
                  value={deviceType}
                />
              </InputWrapper>
              <InputWrapper
                description="(Optional) Maximum length is 500 characters."
                label="Device Description"
              >
                <Textarea
                  id="device-description"
                  name="description"
                  icon={<FileDescription />}
                  error={formik.errors.description}
                  onChange={formik.handleChange}
                  radius="md"
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

export default DeviceUpdateModal;
