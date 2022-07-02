import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import Header from '../common/header.component';
import { ArchiveOff, BuildingWarehouse, Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchRoleById,
  fetchRoles,
  updateRoleById,
  addRole,
} from '../../redux/features/role';
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
import RestoreDeletedModal from '../role/restore-deleted.modal.component';
import DeleteModal from '../role/delete-modal.component';

const AddRoleValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum role name is 1 character ')
    .max(100, 'Maximum role name is 100 characters.')
    .required('Role name is required'),
  description: Yup.string().max(
    500,
    'Maximum role description is 500 characters'
  ),
});

const UpdateRoleValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum role name is 1 character')
    .max(100, 'Maximum role name is 100 characters.')
    .required('Role name is required'),
  description: Yup.string().max(
    500,
    'Maximum role description is 500 characters'
  ),
});

const ManageRole: React.FC<any> = () => {
  const roles = useAppSelector((state) => state.role.roles);
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoles(pagination));
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
  const role = useAppSelector((state) => state.role.role);

  const handleFetchById = (idVal) => {
    return dispatch(fetchRoleById(idVal));
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
      handleFetchById(id)
      setDeleteShown(!isDeleteShown);
    },
  };

  const infoFields = [
    {
      label: 'Id',
      id: 'id',
      name: 'id',
      value: role.id,
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: role.name,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: role.description,
      readOnly: true,
    },
  ];

  const addFields: InputAddProps[] = [
    {
      label: 'Name',
      description: 'Role must be unique between others (Max 100 char.)',
      id: 'name',
      name: 'name',
      required: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Description',
      description:
        'Role description describe additional information (Max 500 char.)',
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
      description: 'Id of role',
      inputtype: InputTypes.TextInput,
      label: 'Id',
      readOnly: true,
      required: false,
      value: role.id,
    },
    {
      id: 'name',
      name: 'name',
      description: 'Role name',
      inputtype: InputTypes.TextInput,
      label: 'Role name',
      readOnly: false,
      required: true,
      value: role.name,
    },
    {
      id: 'description',
      name: 'description',
      description: 'Role description',
      inputtype: InputTypes.TextArea,
      label: 'Description',
      readOnly: false,
      required: false,
      value: role.description,
    },
  ];
  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    addFormik.resetForm();
  };
  const handleAddSubmit = (values: FormikValues) => {
    dispatch(
      addRole({
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleAddModalClose());
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateRoleById({
        id: values.id,
        name: values.name,
        description: values.description,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateRoleValidation,
    initialValues: {
      id: role.id,
      name: role.name,
      description: role.description,
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
  };

  const addFormik = useFormik({
    validationSchema: AddRoleValidation,
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    onSubmit: (e) => handleAddSubmit(e),
  });
  return (
    <AdminLayout>
      <Header title="Role Manager" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      <RestoreDeletedModal
        isShown={isRestoreDeletedShown}
        toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
        pagination={pagination}
      />
      {roles.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={roles.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Role Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />

          <UpdateModal
            fields={updateFields}
            formik={updateFormik}
            handleSubmit={() => updateFormik.handleSubmit()}
            header="Update current role"
            isShown={isUpdateShown}
            toggleShown={() => setUpdateShown(!isUpdateShown)}
          />

          <DeleteModal
            isShown={isDeleteShown}
            toggleShown={() => setDeleteShown(!isDeleteShown)}
            pagination={pagination}
            // roomTypes={roomTypeNames}
          />
        </>
      ) : null}
      <AddModal
        header="Add new role"
        isShown={isAddShown}
        toggleShown={() => handleAddModalClose()}
        formik={addFormik}
        fields={addFields}
        handleSubmit={() => addFormik.handleSubmit()}
      />
      {roles.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={roles.meta}
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

export default ManageRole;
