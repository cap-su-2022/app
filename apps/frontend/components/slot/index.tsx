import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllSlots } from '../../redux/features/slot';
import {
  defaultPaginationParams,
  PaginationParams,
} from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import {
  fetchRoomTypeById,
  fetchRoomTypes,
} from '../../redux/features/room-type';
import Header from '../common/header.component';
import { BuildingWarehouse, Download, Plus } from 'tabler-icons-react';
import TableHeader from '../actions/table-header.component';
import { TableBody } from '../actions/table-body.component';
import InfoModal from '../actions/modal/info-modal.component';
import UpdateModal from '../actions/modal/update-modal.component';
import AddModal from '../actions/modal/add-modal.component';
import TableFooter from '../actions/table-footer.component';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import { InputUpdateProps } from '../actions/models/input-update-props.model';
import { InputTypes } from '../actions/models/input-type.constant';
import { FormikValues, useFormik } from 'formik';
import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import * as Yup from 'yup';
const UpdateRoomValidation = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Minimum device type name is 1 character')
    .max(100, 'Maximum device type name is 100 characters.')
    .required('Device type name is required'),
  description: Yup.string().max(
    500,
    'Maximum device type description is 500 characters'
  ),
});
const SlotManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const slots = useAppSelector((state) => state.slot.slots);
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [id, setId] = useState<string>();

  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  useEffect(() => {
    dispatch(fetchAllSlots(pagination));
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
    return dispatch(fetchRoomTypeById(idVal));
  };
  const ActionsFilter: React.FC = () => {
    return (
      <>
        <Button
          variant="outline"
          color="violet"
          onClick={() => setAddShown(true)}
          style={{ marginRight: 10 }}
        >
          <Plus />
        </Button>
        <Button variant="outline" color="violet">
          <Download />
        </Button>
      </>
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
      value: '',
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: '',
      readOnly: true,
    },
    {
      label: 'Type',
      id: 'type',
      name: 'type',
      value: '',
      readOnly: true,
    },
    {
      label: 'Create By',
      id: 'createdBy',
      name: 'createdBy',
      value: '',
      readOnly: true,
    },
    {
      label: 'Create At',
      id: 'createdAt',
      name: 'createdAt',
      value: dayjs('').format('HH:mm DD/MM/YYYY'),
      readOnly: true,
    },
    {
      label: 'Update By',
      id: 'updatedBy',
      name: 'updatedBy',
      value: '',
      readOnly: true,
    },
    {
      label: 'Update At',
      id: 'updatedAt',
      name: 'updatedAt',
      value: dayjs('').format('HH:mm DD/MM/YYYY'),
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: '',
      readOnly: true,
    },
  ];

  const updateFields: InputUpdateProps[] = [
    {
      id: 'id',
      name: 'id',
      description: 'Id of Room',
      inputtype: InputTypes.TextInput,
      label: 'Id',
      readOnly: true,
      required: false,
      value: '',
    },
    {
      id: 'name',
      name: 'name',
      description: 'Room name',
      inputtype: InputTypes.TextInput,
      label: 'Room name',
      readOnly: false,
      required: true,
      value: '',
    },
    {
      id: 'type',
      name: 'type',
      description: 'Room type',
      inputtype: InputTypes.Select,
      label: 'Room type',
      readOnly: false,
      required: true,
      data: [],
      value: '',
    },
    {
      id: 'description',
      name: 'description',
      description: 'Room description',
      inputtype: InputTypes.TextArea,
      label: 'Description',
      readOnly: false,
      required: false,
      value: '',
    },
  ];

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateRoomById({
        id: values.id,
        payload: { name: values.name, description: values.description },
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateRoomValidation,
    initialValues: {
      id: '',
      name: '',
      description: '',
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
  };

  return (
    <>
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {slots.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={slots.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Room Type Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
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

      {slots.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={slots.meta}
        />
      ) : null}
    </>
  );
};

export default SlotManagement;
