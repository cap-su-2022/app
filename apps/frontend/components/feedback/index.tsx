import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import Header from '../common/header.component';
import {
  ArchiveOff,
  BrandHipchat,
  BuildingWarehouse,
  Check,
  Plus,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PaginationParams } from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import TableHeader from '../actions/table-header.component';
import { TableBody } from './table-body.component';
import TableFooter from '../actions/table-footer.component';
import InfoModal from './info-modal.component';
import * as Yup from 'yup';
import AddModal from '../actions/modal/add-modal.component';
import { FormikValues, useFormik } from 'formik';
import { InputAddProps } from '../actions/models/input-add-props.model';
import { InputTypes } from '../actions/models/input-type.constant';
import AdminLayout from '../layout/admin.layout';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import NoDataFound from '../no-data-found';
import { fetchFeedbacks } from '../../redux/features/feedback/thunk/fetch-feedback';
import { fetchFeedbackById } from '../../redux/features/feedback/thunk/fetch-feedback-by-id.thunk';

const AddRoomTypeValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum room type name is 1 character')
    .max(100, 'Maximum room type name is 100 characters.')
    .required('Room type name is required'),
  description: Yup.string().max(
    500,
    'Maximum room type description is 500 characters'
  ),
});

const defaultPaginationParams: PaginationParams = {
  page: 1,
  limit: 5,
  search: '',
  dir: 'ASC',
  sort: 'created_at',
};

// const UpdateRoomTypeValidation = Yup.object().shape({
//   name: Yup.string()
//     .trim()
//     .min(1, 'Minimum room type name is 1 character')
//     .max(100, 'Maximum room type name is 100 characters.')
//     .required('Room type name is required'),
//   description: Yup.string().max(
//     500,
//     'Maximum room type description is 500 characters'
//   ),
// });

const ManageFeedback: React.FC<any> = () => {
  const styles = useStyles();
  const feedbacks = useAppSelector((state) => state.feedback.feedbacks);
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeedbacks(pagination));
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
  // const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);

  const handleFetchById = (idVal) => {
    return dispatch(fetchFeedbackById(idVal));
  };

  const ActionsFilter: React.FC = () => {
    return (
      <div>
        <Button
          leftIcon={<Plus />}
          color="green"
          onClick={() => setAddShown(!isAddShown)}
          style={{ marginRight: 10 }}
        >
          Add
        </Button>
        {/* <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDisabledShown(true)}
          style={{ marginRight: 10 }}
        >
          <PencilOff color={'red'} />
        </Button> */}
        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDeletedShown(true)}
        >
          <ArchiveOff />
        </Button>
      </div>
    );
  };

  const handleActionsCb = {
    info: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then((res) => console.log(res))
        .then(() => setInfoShown(!isInfoShown));
    },
    delete: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setDeleteShown(!isDeleteShown));
    },
  };

  const addFields: InputAddProps[] = [
    {
      label: 'Description',
      description: null,
      id: 'description',
      name: 'description',
      required: false,
      inputtype: InputTypes.TextArea,
    },
  ];

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    addFormik.resetForm();
  };
  const handleAddSubmit = (values: FormikValues) => {
    dispatch(
      addFeedback({
        description: values.description,
      })
    )
      .unwrap()
      .then(() =>
        showNotification({
          id: 'Add-feedback',
          color: 'teal',
          title: 'Feedback was sended',
          message: 'Feedback was successfully sended',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then((e) => handleAddModalClose())
      .catch((e) => {
        showNotification({
          id: 'Add-feedback',
          color: 'red',
          title: 'Error while send feedback',
          message: `${e.message}`,
          icon: <X />,
          autoClose: 3000,
        });
      });
  };

  const addFormik = useFormik({
    validationSchema: AddRoomTypeValidation,
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    onSubmit: (e) => handleAddSubmit(e),
  });

  return (
    <AdminLayout>
      <Header title="Feedback" icon={<BrandHipchat size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actionsLeft={null}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {/* <RestoreDeletedModal
        isShown={isRestoreDeletedShown}
        toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
        pagination={pagination}
      /> */}
      {feedbacks.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={feedbacks.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Feedback Information"
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />

          {/* <DeleteModal
            isShown={isDeleteShown}
            toggleShown={() => setDeleteShown(!isDeleteShown)}
            pagination={pagination}
          /> */}
        </>
      ) : (
        <NoDataFound />
      )}
      <AddModal
        header="Add new room type"
        isShown={isAddShown}
        toggleShown={() => handleAddModalClose()}
        formik={addFormik}
        fields={addFields}
        handleSubmit={() => addFormik.handleSubmit()}
      />
      {feedbacks.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={feedbacks.meta}
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

export default ManageFeedback;
