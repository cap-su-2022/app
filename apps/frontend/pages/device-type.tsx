import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import AdminLayout from '../components/layout/admin.layout';
import Header from '../components/common/header.component';
import { BuildingWarehouse, InfoCircle, Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchDeviceTypes,
  fetchDeviceTypeById,
  updateDeviceTypeById,
  deleteDeviceTypeById,
  addDeviceType,
} from '../redux/features/device-type';
import {
  defaultPaginationParams,
  PaginationParams,
} from '../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import TableHeader from '../components/actions/table-header.component';
import { TableBody } from '../components/actions/table-body.component';
import TableFooter from '../components/actions/table-footer.component';
import * as Yup from 'yup';
import AddModal from '../components/actions/modal/add-modal.component';
import { FormikValues, useFormik } from 'formik';
import { InputAddProps } from '../components/actions/models/input-add-props.model';
import { InputTypes } from '../components/actions/models/input-type.constant';
import InfoModal from '../components/actions/modal/info-modal.component';
import UpdateModal from '../components/actions/modal/update-modal.component';
import { InputUpdateProps } from '../components/actions/models/input-update-props.model';

const AddDeviceTypeValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum device type name is 1 character')
    .max(100, 'Maximum device type name is 100 characters.')
    .required('Device type name is required'),
  description: Yup.string().max(
    500,
    'Maximum Device type description is 500 characters'
  ),
});

const UpdateDeviceTypeValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum device type name is 1 character')
    .max(100, 'Maximum device type name is 100 characters.')
    .required('Device type name is required'),
  description: Yup.string().max(
    500,
    'Maximum device type description is 500 characters'
  ),
});

const ManageDeviceType: React.FC<any> = () => {
  const styles = useStyles();
  const deviceTypes = useAppSelector((state) => state.deviceType.deviceTypes);
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDeviceTypes(pagination));
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

  const handleFetchById = (idVal) => {
    return dispatch(fetchDeviceTypeById(idVal));
  };

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const deviceType = useAppSelector((state) => state.deviceType.deviceType);

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
      value: deviceType.id,
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: deviceType.name,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: deviceType.description,
      readOnly: true,
    },
  ];

  const addFields: InputAddProps[] = [
    {
      label: 'Name',
      description:
        'Device type name must be unique between others (Max 100 char.)',
      id: 'name',
      name: 'name',
      required: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Description',
      description:
        'Device type description describe additional information (Max 500 char.)',
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
      description: 'Id of Device type',
      inputtype: InputTypes.TextInput,
      label: 'Id',
      readOnly: true,
      required: false,
      value: deviceType.id,
    },
    {
      id: 'name',
      name: 'name',
      description: 'Device type name',
      inputtype: InputTypes.TextInput,
      label: 'Device type name',
      readOnly: false,
      required: true,
      value: deviceType.name,
    },
    {
      id: 'description',
      name: 'description',
      description: 'Device type description',
      inputtype: InputTypes.TextArea,
      label: 'Description',
      readOnly: false,
      required: false,
      value: deviceType.description,
    },
  ];
  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    addFormik.resetForm();
  };
  const handleAddSubmit = (values: FormikValues) => {
    dispatch(
      addDeviceType({
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleAddModalClose());
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateDeviceTypeById({
        id: values.id,
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateDeviceTypeValidation,
    initialValues: {
      id: deviceType.id,
      name: deviceType.name,
      description: deviceType.description,
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
  };

  const addFormik = useFormik({
    validationSchema: AddDeviceTypeValidation,
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    onSubmit: (e) => handleAddSubmit(e),
  });

  return (
    <AdminLayout>
      <Header title="Device Type" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {deviceTypes.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={deviceTypes.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Device Type Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />

          <UpdateModal
            fields={updateFields}
            formik={updateFormik}
            handleSubmit={() => updateFormik.handleSubmit()}
            header="Update current device type"
            isShown={isUpdateShown}
            toggleShown={() => setUpdateShown(!isUpdateShown)}
          />
        </>
      ) : null}
      <AddModal
        header="Add new device type"
        isShown={isAddShown}
        toggleShown={() => handleAddModalClose()}
        formik={addFormik}
        fields={addFields}
        handleSubmit={() => addFormik.handleSubmit()}
      />
      {deviceTypes.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={deviceTypes.meta}
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

export default ManageDeviceType;
