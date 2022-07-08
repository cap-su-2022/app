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
import { updateAccountById } from '../../redux/features/account/thunk/update-account-by-id';
import { fetchAccounts } from '../../redux/features/account/thunk/fetch-accounts.thunk';

interface UpdateModalProps {
  isShown: boolean;
  toggleShown(): void;
  formik: FormikProps<any>;
  handleSubmit(): void;
  pagination: PagingParams;
  role: any[];
}

const UpdateAccountValidation = Yup.object().shape({
  fullname: Yup.string()
    .trim()
    .min(2, 'Fullname must be at least 2 characters')
    .max(100, 'Fullname can only maximum at 100 characters')
    .required('Fullname is required'),
  description: Yup.string().max(
    500,
    'Description can only maximum at 500 characters'
  ),
});

const AccountUpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { classes } = useStyles();
  const account = useAppSelector((state) => state.account.account);
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  useEffect(() => {
    setRole(account.roleId);
  }, [account.roleId]);

  const handleUpdateSubmit = async (values) => {
    dispatch(
      updateAccountById({
        id: values.id,
        payload: {
          ...values,
          roleId: role,
        },
      })
    )
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while updating account',
          message: e.message ?? 'Failed to update account',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Account was updated',
          message: 'Account was successfully updated',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => props.toggleShown())
      .then(() => dispatch(fetchAccounts(props.pagination)))
      .finally(() => {
        formik.resetForm();
      });
  };

  const formik = useFormik({
    initialValues: {
      id: account.id,
      fullname: account.fullname,
      description: account.description,
      roleId: account.role,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleUpdateSubmit(values),
    validationSchema: UpdateAccountValidation,
  });

  useEffect(() => {
    if (
      formik.initialValues.fullname === formik.values.fullname &&
      formik.initialValues.description === formik.values.description &&
      formik.initialValues.roleId === formik.values.roleId
    ) {
      setUpdateDisabled(true);
    } else {
      setUpdateDisabled(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.description,
    formik.values.fullname,
    formik.values.roleId,
  ]);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Update Account Information</Text>
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
                label="Account ID"
                description="Account ID is unique"
              >
                <TextInput
                  icon={<Id />}
                  disabled
                  id="account-id"
                  name="id"
                  className={classes.textInput}
                  radius="md"
                  readOnly
                  value={formik.values.id}
                />
              </InputWrapper>
              <InputWrapper
                required
                label="Fullname"
              >
                <TextInput
                  icon={<ClipboardText />}
                  id="fullname"
                  name="fullname"
                  error={formik.errors.fullname}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.fullname}
                />
              </InputWrapper>
              <InputWrapper
                required
                label="Role"
                description="Separate libray room type"
              >
                <Select
                  onChange={(e) => {
                    setUpdateDisabled(false);
                    setRole(e);
                  }}
                  searchable
                  defaultChecked={true}
                  name="type"
                  id="room-type"
                  data={props.role}
                  value={role}
                />
              </InputWrapper>
              <InputWrapper
                description="(Optional) Maximum length is 500 characters."
                label="Description"
              >
                <Textarea
                  id="description"
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
              {/* <Button
                onClick={() => props.toggleDeleteModalShown()}
                variant="outline"
                color={"red"}
                leftIcon={<Trash/>}
              >
                Delete this room
              </Button> */}

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

export default AccountUpdateModal;
