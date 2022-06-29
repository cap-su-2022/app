import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import Header from '../common/header.component';
import { BuildingWarehouse, Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchBookingReasonById,
  fetchBookingReasons,
  updateBookingReasonById,
  addBookingReason,
} from '../../redux/features/booking-reason';
import {
  defaultPaginationParams,
  PaginationParams,
} from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import { TableBody } from '../actions/table-body.component';
import TableFooter from '../actions/table-footer.component';
import TableHeader from '../actions/table-header.component';
import InfoModal from '../actions/modal/info-modal.component';
import * as Yup from 'yup';
import AddModal from '../actions/modal/add-modal.component';
import { FormikValues, useFormik } from 'formik';
import { InputAddProps } from '../actions/models/input-add-props.model';
import { InputTypes } from '../actions/models/input-type.constant';
import UpdateModal from '../actions/modal/update-modal.component';
import { InputUpdateProps } from '../actions/models/input-update-props.model';
import AdminLayout from '../layout/admin.layout';

const AddBookingReasonValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum booking reason is 1 character')
    .max(100, 'Maximum booking reason is 100 characters.')
    .required('Booking reason name is required'),
  description: Yup.string().max(
    500,
    'Maximum booking reason description is 500 characters'
  ),
});

const UpdateBookingReasonValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum booking reason is 1 character')
    .max(100, 'Maximum booking reason is 100 characters.')
    .required('Booking reason name is required'),
  description: Yup.string().max(
    500,
    'Maximum booking reason description is 500 characters'
  ),
});

const ManageBookingReason: React.FC<any> = () => {
  const bookingReasons = useAppSelector(
    (state) => state.bookingReason.bookingReasons
  );
  console.log(bookingReasons)
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookingReasons(pagination));
  }, [
    pagination.page,
    pagination.limit,
    pagination.dir,
    pagination.sort,
    debounceSearchValue,
    pagination,
    dispatch,
  ]);

  const toggleSortDirection = () => {
    setPagination({
      ...pagination,
      dir: pagination.dir === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const handleSearchValue = (val: string) => {
    setPagination({
      ...defaultPaginationParams,
      search: val,
    });
  };

  const handleLimitChange = (val: number) => {
    setPagination({
      ...pagination,
      limit: val,
    });
  };

  const handlePageChange = (val: number) => {
    setPagination({
      ...pagination,
      page: val,
    });
  };

  const handleResetFilter = () => {
    setPagination(defaultPaginationParams);
  };

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const bookingReason = useAppSelector(
    (state) => state.bookingReason.bookingReason
  );

  const handleFetchById = (idVal) => {
    return dispatch(fetchBookingReasonById(idVal));
  };

  const ActionsFilter: React.FC = () => {
    return (
      <Button
        leftIcon={<Plus />}
        color="green"
        onClick={() => setAddShown(!isAddShown)}
      >
        Add
      </Button>
    );
  };

  const handleActionsCb = {
    info: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setInfoShown(!isInfoShown));
    },
    update: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setUpdateShown(!isUpdateShown));
    },
    delete: (id) => {
      setId(id);
      setDeleteShown(!isDeleteShown);
    },
  };

  const infoFields = [
    {
      label: 'Id',
      id: 'id',
      name: 'id',
      value: bookingReason.id,
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: bookingReason.name,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: bookingReason.description,
      readOnly: true,
    },
  ];

  const addFields: InputAddProps[] = [
    {
      label: 'Name',
      description:
        'Booking reason must be unique between others (Max 100 char.)',
      id: 'name',
      name: 'name',
      required: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Description',
      description:
        'Booking reason description describe additional information (Max 500 char.)',
      id: 'description',
      name: 'description',
      required: false,
      inputtype: InputTypes.TextArea,
    },
  ];

  const updateFields: InputUpdateProps[] = [
    {
      id: 'id',
      name: 'id',
      description: 'Id of Booking reason',
      inputtype: InputTypes.TextInput,
      label: 'Id',
      readOnly: true,
      required: false,
      value: bookingReason.id,
    },
    {
      id: 'name',
      name: 'name',
      description: 'Booking reason name',
      inputtype: InputTypes.TextInput,
      label: 'Booking reason name',
      readOnly: false,
      required: true,
      value: bookingReason.name,
    },
    {
      id: 'description',
      name: 'description',
      description: 'Booking reason description',
      inputtype: InputTypes.TextArea,
      label: 'Description',
      readOnly: false,
      required: false,
      value: bookingReason.description,
    },
  ];
  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    addFormik.resetForm();
  };
  const handleAddSubmit = (values: FormikValues) => {
    dispatch(
      addBookingReason({
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleAddModalClose());
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateBookingReasonById({
        id: values.id,
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateBookingReasonValidation,
    initialValues: {
      id: bookingReason.id,
      name: bookingReason.name,
      description: bookingReason.description,
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
  };

  const addFormik = useFormik({
    validationSchema: AddBookingReasonValidation,
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    onSubmit: (e) => handleAddSubmit(e),
  });
  console.log(bookingReasons.items)
  console.log('ahuhu')
  return (
    <AdminLayout>
      <Header title="Booking Reason" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {bookingReasons.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={bookingReasons.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Booking Reason Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />

          <UpdateModal
            fields={updateFields}
            formik={updateFormik}
            handleSubmit={() => updateFormik.handleSubmit()}
            header="Update current booking reason"
            isShown={isUpdateShown}
            toggleShown={() => setUpdateShown(!isUpdateShown)}
          />
        </>
      ) : null}
      <AddModal
        header="Add new booking reason"
        isShown={isAddShown}
        toggleShown={() => handleAddModalClose()}
        formik={addFormik}
        fields={addFields}
        handleSubmit={() => addFormik.handleSubmit()}
      />
      {bookingReasons.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={bookingReasons.meta}
        />
      ) : null}
    </AdminLayout>
  );
};

const useStyles = createStyles((theme) => {
  return {
    container: {},
  };
});

export default ManageBookingReason;
