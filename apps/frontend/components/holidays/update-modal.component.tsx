import React, {useEffect, useState} from 'react';
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
import {
  Calendar,
  Check, ChevronsRight,
  ClipboardText,
  FileDescription,
  Id,
  Pencil,
  X,
} from 'tabler-icons-react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Form, FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import {showNotification} from '@mantine/notifications';
import {PagingParams} from '../../models/pagination-params/paging-params.model';
import {fetchHolidays} from "../../redux/features/holidays/thunk/fetch-holidays.thunk";
import {updateHolidayById} from "../../redux/features/holidays/thunk/update-holiday-by-id.thunk";
import dayjs from "dayjs";
import {DatePicker} from "@mantine/dates";
import {fetchHolidaysMini} from "../../redux/features/holidays/thunk/fetch-holidays-mini.thunk";

interface UpdateModalProps {
  isShown: boolean;

  toggleShown(): void;

  pagination: PagingParams;
}

const UpdateHolidayValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Holiday name must be at least 2 characters')
    .max(100, 'Holiday name can only maximum at 100 characters')
    .required('Holiday name is required'),
  description: Yup.string().max(
    500,
    'Holiday description can only maximum at 500 characters'
  ),
});

const HolidayUpdateModal: React.FC<UpdateModalProps> = (props) => {
  const {classes} = useStyles();
  const holiday = useAppSelector((state) => state.holiday.holiday);
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const holidays = useAppSelector((state) => state.holiday.holidaysMini);
  const isHoliday = (date) => {
    const dateFormat = dayjs(date).format('YYYY-MM-DD');
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].dateStart <= dateFormat &&
        holidays[i].dateEnd >= dateFormat
      ) {
        return true;
      }
    }
  };

  useEffect(() => {
    dispatch(fetchHolidaysMini()).unwrap();
  }, []);

  const handleUpdateSubmit = async (values) => {
    dispatch(
      updateHolidayById({
        id: values.id,
        name: values.name,
        description: values.description,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd
      })
    )
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while updating holiday',
          message: e.message ?? 'Failed to update holiday',
          icon: <X/>,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Holiday was updated',
          message: 'Holiday was successfully updated',
          icon: <Check/>,
          autoClose: 3000,
        })
      )
      .then(() => props.toggleShown())
      .then(() => dispatch(fetchHolidays(props.pagination)))
      .finally(() => {
        formik.resetForm();
      });
  };

  const formik = useFormik({
    initialValues: {
      id: holiday.id,
      name: holiday.name,
      description: holiday.description,
      dateStart: holiday.dateStart,
      dateEnd: holiday.dateEnd
    },
    enableReinitialize: true,
    onSubmit: (values) => handleUpdateSubmit(values),
    validationSchema: UpdateHolidayValidation,
  });

  useEffect(() => {
    if (
      formik.initialValues.name === formik.values.name &&
      formik.initialValues.description === formik.values.description &&
      formik.initialValues.dateStart === formik.values.dateStart &&
      formik.initialValues.dateEnd === formik.values.dateEnd
    ) {
      setUpdateDisabled(true);
    } else {
      setUpdateDisabled(false);
    }
  }, [formik.values.name,
    formik.values.description,
    formik.initialValues.name,
    formik.initialValues.description,
    formik.initialValues.dateStart,
    formik.initialValues.dateEnd,
    formik.values.dateStart,
    formik.values.dateEnd]);

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Update Holiday Information</Text>
    );
  };

  return (
    <>
      <Modal
        title={<ModalHeaderTitle/>}
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
                required
                label="Holiday name"
                style={{marginBottom: 20}}
              >
                <TextInput
                  icon={<ClipboardText/>}
                  id="holiday-name"
                  name="name"
                  error={formik.errors.name}
                  onChange={formik.handleChange}
                  className={classes.textInput}
                  radius="md"
                  value={formik.values.name}
                />
              </InputWrapper>

              <InputWrapper
                label="Holiday Description"
                style={{marginBottom: 20}}
              >
                <Textarea
                  id="holiday-description"
                  name="description"
                  icon={<FileDescription/>}
                  error={formik.errors.description}
                  onChange={formik.handleChange}
                  radius="md"
                  autosize
                  minRows={4}
                  maxRows={7}
                  value={formik.values.description}
                />
              </InputWrapper>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20
                }}
              >
                <DatePicker
                  id="dateStart"
                  style={{width: '250px'}}
                  label="Date starts"
                  placeholder="Select date"
                  radius="md"
                  required
                  inputFormat="DD-MM-YYYY"
                  value={new Date(formik.values.dateStart)}
                  minDate={dayjs(new Date()).toDate()}
                  excludeDate={(date) => isHoliday(date)}
                  onChange={(date) => {
                    formik.setFieldValue('dateStart', date);
                  }}
                />
                <ChevronsRight
                  size={28}
                  strokeWidth={2}
                  color={'black'}
                  style={{margin: 'auto 40px', position: 'relative', top: 15}}
                />
                <DatePicker
                  id="dateEnd"
                  style={{width: '250px'}}
                  label="Date ends"
                  placeholder="Select date"
                  radius="md"
                  required
                  excludeDate={(date) => isHoliday(date)}
                  inputFormat="DD-MM-YYYY"
                  value={new Date(formik.values.dateEnd)}
                  minDate={dayjs(new Date()).toDate()}
                  onChange={(date) => {
                    formik.setFieldValue('dateEnd', date);
                  }}
                />
              </div>


            </div>

            <div className={classes.modalFooter}>
              <Button
                color="cyan"
                disabled={isUpdateDisabled}
                onClick={() => formik.submitForm()}
                leftIcon={<Pencil/>}
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

export default HolidayUpdateModal;
