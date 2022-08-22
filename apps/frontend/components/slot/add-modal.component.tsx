import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  Check,
  ChevronsRight,
  ClipboardText,
  FileDescription,
  Plus,
  X,
} from 'tabler-icons-react';
import { useAppDispatch } from '../../redux/hooks';
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { showNotification } from '@mantine/notifications';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { addSlot } from '../../redux/features/slot/thunk/add.thunk';
import { fetchAllSlots } from '../../redux/features/slot';
import { TimeInput } from '@mantine/dates';

interface AddModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const AddRoomValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Name must have at least 1 character.')
    .max(100, 'Name can only have at most 100 characters.')
    .required('Name is required!'),
  description: Yup.string().max(
    500,
    'Description only have at most 500 characters'
  ),
});

const AddSlotModal: React.FC<AddModalProps> = (props) => {
  const { classes } = useStyles();
  const [isAddDisabled, setAddDisabled] = useState<boolean>(false);
  const [slotError, setSlotError] = useState<boolean>(false);
  console.log(slotError)

  const dispatch = useAppDispatch();

  const handleAddSubmit = (values: FormikValues) => {
    if (!Number(values.slotNum)) {
      showNotification({
        id: 'Add-slot',
        color: 'red',
        title: 'Error while add slot',
        message: `Slot num must be a number`,
        icon: <X />,
        autoClose: 3000,
      });
    } else if (!values.timeStart || !values.timeEnd) {
      showNotification({
        id: 'Add-slot',
        color: 'red',
        title: 'Error while add slot',
        message: `Time start and Time end can be null`,
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      dispatch(
        addSlot({
          name: values.name,
          slotNum: values.slotNum,
          timeStart: values.timeStart,
          timeEnd: values.timeEnd,
          description: values.description,
        })
      )
        .unwrap()
        .then(() =>
          dispatch(fetchAllSlots(props.pagination)).finally(() =>
            formik.resetForm()
          )
        )
        .then(() =>
          showNotification({
            id: 'Add-slot',
            color: 'teal',
            title: 'Slot was added',
            message: 'Slot was successfully added',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .then((e) => props.toggleShown())
        .catch((e) => {
          showNotification({
            id: 'Add-slot',
            color: 'red',
            title: 'Error while add slot',
            message: `${e.message}`,
            icon: <X />,
            autoClose: 3000,
          });
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      slotNum: 0,
      timeStart: null,
      timeEnd: null,
      description: '',
    },
    onSubmit: (values) => handleAddSubmit(values),
    validationSchema: AddRoomValidation,
  });

  useEffect(() => {
    if (
      formik.initialValues.name === formik.values.name ||
      formik.initialValues.slotNum == formik.values.slotNum ||
      formik.initialValues.timeStart === formik.values.timeStart ||
      formik.initialValues.timeEnd === formik.values.timeEnd
    ) {
      setAddDisabled(true);
    } else {
      setAddDisabled(false);
    }
  }, [
    formik.values.name,
    formik.values.slotNum,
    formik.values.timeStart,
    formik.values.timeEnd,
  ]);

  useEffect(() => {
    if (formik.values.timeStart && formik.values.timeEnd) {
      if (formik.values.timeStart > formik.values.timeEnd) {
        setSlotError(true);
        setAddDisabled(true);
      } else {
        setSlotError(false);
      }
    }
  }, [formik.values.timeStart, formik.values.timeEnd]);

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalHeaderTitle}>Add new slot</Text>;
  };

  const handleCancelAddModal = () => {
    props.toggleShown();
    formik.resetForm();
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle />}
        size={'30%'}
        centered
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <InputWrapper
                required
                label="Slot name"
                description="Slot name must be unique. Maximum length is 100 characters"
              >
                <TextInput
                  icon={<ClipboardText />}
                  id="slot-name"
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
                label="Slot num"
                description="Order of slots of the day"
              >
                <TextInput
                  icon={<ClipboardText />}
                  id="slot-num"
                  name="slotNum"
                  error={formik.errors.slotNum}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.slotNum}
                />
              </InputWrapper>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <InputWrapper required label="Time start">
                  <TimeInput
                    icon={<ClipboardText />}
                    id="time-start"
                    name="timeStart"
                    error={formik.errors.timeStart}
                    onChange={(e) => formik.setFieldValue('timeStart', e)}
                    className={classes.textInput}
                    radius="md"
                    value={formik.values.timeStart}
                  />
                </InputWrapper>
                <ChevronsRight
                  size={28}
                  strokeWidth={2}
                  color={'black'}
                  style={{ marginRight: 20, position: 'relative', top: 30 }}
                />
                <InputWrapper required label="Time end">
                  <TimeInput
                    icon={<ClipboardText />}
                    id="timeEnd"
                    name="timeEnd"
                    error={formik.errors.timeEnd}
                    onChange={(e) => formik.setFieldValue('timeEnd', e)}
                    className={classes.textInput}
                    radius="md"
                    value={formik.values.timeEnd}
                  />
                </InputWrapper>
              </div>
              {slotError && (
                <div
                  style={{
                    position: 'relative',
                    top: '-.6rem',
                    fontSize: '.9rem',
                    color: 'red',
                  }}
                >
                  Time start can not be be greater than Time end
                </div>
              )}
              <InputWrapper
                label="Slot description"
                description="(Optional) Maximum length is 500 characters."
              >
                <Textarea
                  icon={<FileDescription />}
                  className={classes.textInput}
                  id="slot-description"
                  name="description"
                  error={formik.errors.description}
                  onChange={formik.handleChange}
                  radius="md"
                  value={formik.values.description}
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
                onClick={() => formik.submitForm()}
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
    marginBottom: 20,
  },
});

export default AddSlotModal;
