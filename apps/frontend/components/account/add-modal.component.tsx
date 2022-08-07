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
  Plus,
  X,
} from 'tabler-icons-react';
import { useAppDispatch } from '../../redux/hooks';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { showNotification } from '@mantine/notifications';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchAccounts } from '../../redux/features/account/thunk/fetch-accounts.thunk';

interface AddAccountModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
  listRole: any[];
}

const AddAccountValidation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(8, 'Username must have at least 8 character.')
    .max(50, 'Username can only have at most 50 characters.')
    .required('Username is required!'),
  fullname: Yup.string()
    .trim()
    .min(8, 'Fullname must have at least 8 character.')
    .max(50, 'Fullname can only have at most 50 characters.')
    .required('Fullname is required!'),
  email: Yup.string()
    .trim()
    .min(8, 'Email must have at least 8 character.')
    .max(50, 'Email can only have at most 50 characters.')
    .required('Email is required!'),
  Phone: Yup.string()
    .trim()
    .min(11, 'Phone must have at least 11 digits.')
    .max(11, 'Phone can only have at most 11 digits.'),
  description: Yup.string().max(
    500,
    'Room description only have at most 500 characters'
  ),
});

const AddAccountModal: React.FC<AddAccountModalProps> = (props) => {
  const { classes } = useStyles();
  const [isAddDisabled, setAddDisabled] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const handleAddSubmit = async (values) => {
    return;
    /* dispatch(
      addAccount({
        ...values,
        role: role,
      })
    )
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while adding new account',
          message: e.message ?? 'Failed to add new account',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'New account was added',
          message: 'New account was successfully added to the system',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        dispatch(fetchAccounts(props.pagination)).finally(() =>
          formik.resetForm()
        );
      });*/
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      phone: '',
      email: '',
      description: '',
      role: '23dc0f4f-77f8-47c8-a78f-bcad84e5edee',
    },
    onSubmit: (values) => handleAddSubmit(values),
    validationSchema: AddAccountValidation,
  });

  useEffect(() => {
    if (
      formik.initialValues.username === formik.values.username &&
      formik.initialValues.fullname === formik.values.fullname &&
      formik.initialValues.phone === formik.values.phone &&
      formik.initialValues.email === formik.values.email &&
      formik.initialValues.description === formik.values.description
    ) {
      setAddDisabled(true);
    } else {
      setAddDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.username,
    formik.values.description,
    formik.values.fullname,
    formik.values.phone,
    formik.values.email,
  ]);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>
        Add new room (Chưa add được đâu, khỏi test)
      </Text>
    );
  };

  const handleCancelAddModal = () => {
    props.toggleShown();
    formik.resetForm();
  };

  const handleAddAction = () => {
    if (role === '') {
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'Error while adding library room',
        message: 'Please select the role that exists',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      formik.submitForm();
    }
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size={dimension.width / 2}
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <InputWrapper required label="Username">
                <TextInput
                  icon={<ClipboardText />}
                  id="username"
                  name="username"
                  error={formik.errors.username}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.username}
                />
              </InputWrapper>

              <InputWrapper required label="Fullname">
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

              <InputWrapper required label="Email">
                <TextInput
                  icon={<ClipboardText />}
                  id="email"
                  name="email"
                  error={formik.errors.email}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.email}
                />
              </InputWrapper>

              <InputWrapper required label="Phone">
                <TextInput
                  icon={<ClipboardText />}
                  id="phone"
                  name="phone"
                  error={formik.errors.phone}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.phone}
                />
              </InputWrapper>

              <InputWrapper
                label="Description"
                description="(Optional) Maximum length is 500 characters."
              >
                <Textarea
                  icon={<FileDescription />}
                  className={classes.textInput}
                  id="description"
                  name="description"
                  error={formik.errors.description}
                  onChange={formik.handleChange}
                  radius="md"
                  value={formik.values.description}
                />
              </InputWrapper>
              <InputWrapper required label="Role">
                <Select
                  name="role"
                  id="role"
                  onChange={(e) => setRole(e)}
                  searchable
                  value={role}
                  data={props.listRole}
                />
              </InputWrapper>
            </div>

            <div className={classes.modalFooter}>
              <Button
                onClick={() => handleCancelAddModal()}
                variant="outline"
                color={'red'}
                leftIcon={<X />}
              >
                Cancel
              </Button>

              <Button
                color="green"
                disabled={isAddDisabled}
                onClick={() => handleAddAction()}
                leftIcon={<Plus />}
              >
                Add
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
    justifyContent: 'space-between',
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

export default AddAccountModal;
