import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import AdminLayout from '../AdminLayout';
import Header from '../common/header.component';
import { BuildingWarehouse, InfoCircle, Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchRoomTypeById,
  fetchRoomTypes,
} from '../../redux/features/room-type';
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
import { addRoomType } from '../../redux/features/room-type/thunk/add-room-type.thunk';
import { InputAddProps } from '../actions/models/input-add-props.model';
import { InputTypes } from '../actions/models/input-type.constant';
import UpdateModal from '../actions/modal/update-modal.component';
import { updateRoomTypeById } from '../../redux/features/room-type/thunk/update-room-type-by-id.thunk';
import { InputUpdateProps } from '../actions/models/input-update-props.model';

const AddRoomTypeValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum room type name is 1 character')
    .max(100, 'Maximum room type name is 100 characters.')
    .required('Room type name is required'),
  description: Yup.string().max(
    500,
    'Maximum room type description is 500 characters'
  ),
});

const UpdateRoomTypeValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum room type name is 1 character')
    .max(100, 'Maximum room type name is 100 characters.')
    .required('Room type name is required'),
  description: Yup.string().max(
    500,
    'Maximum room type description is 500 characters'
  ),
});

const ManageRoomType: React.FC<any> = () => {
  const styles = useStyles();
  const roomTypes = useAppSelector((state) => state.roomType.roomTypes);
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(pagination.dir);
    dispatch(fetchRoomTypes(pagination));
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
  const roomType = useAppSelector((state) => state.roomType.roomType);

  const handleFetchById = (idVal) => {
    return dispatch(fetchRoomTypeById(idVal));
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
      value: roomType.id,
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: roomType.name,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: roomType.description,
      readOnly: true,
    },
  ];

  const addFields: InputAddProps[] = [
    {
      label: 'Name',
      description:
        'Room type name must be unique between others (Max 100 char.)',
      id: 'name',
      name: 'name',
      required: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Description',
      description:
        'Room type description describe additional information (Max 500 char.)',
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
      description: 'Id of Room type',
      inputtype: InputTypes.TextInput,
      label: 'Id',
      readOnly: true,
      required: false,
      value: roomType.id,
    },
    {
      id: 'name',
      name: 'name',
      description: 'Room type name',
      inputtype: InputTypes.TextInput,
      label: 'Room type name',
      readOnly: false,
      required: true,
      value: roomType.name,
    },
    {
      id: 'description',
      name: 'description',
      description: 'Room type description',
      inputtype: InputTypes.TextArea,
      label: 'Description',
      readOnly: false,
      required: false,
      value: roomType.description,
    },
  ];
  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    addFormik.resetForm();
  };
  const handleAddSubmit = (values: FormikValues) => {
    dispatch(
      addRoomType({
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleAddModalClose());
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateRoomTypeById({
        id: values.id,
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateRoomTypeValidation,
    initialValues: {
      id: roomType.id,
      name: roomType.name,
      description: roomType.description,
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
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
      <Header title="Room Type" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {roomTypes.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={roomTypes.items}
          />
          <InfoModal
            header="Room Type Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />
          <AddModal
            header="Add new room type"
            isShown={isAddShown}
            toggleShown={() => handleAddModalClose()}
            formik={addFormik}
            fields={addFields}
            handleSubmit={() => addFormik.handleSubmit()}
          />
          <UpdateModal
            fields={updateFields}
            formik={updateFormik}
            handleSubmit={() => updateFormik.handleSubmit()}
            header="Update current room type"
            isShown={isUpdateShown}
            toggleShown={() => setUpdateShown(!isUpdateShown)}
          />
        </>
      ) : null}
      {roomTypes.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={roomTypes.meta}
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

export default ManageRoomType;