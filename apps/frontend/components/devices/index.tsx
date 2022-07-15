import { GetServerSideProps } from 'next';
import AdminLayout from '../../components/layout/admin.layout';
import { Button, createStyles, ScrollArea, Table } from '@mantine/core';
import {
  ArchiveOff,
  BuildingWarehouse,
  Download,
  PencilOff,
  Plus,
} from 'tabler-icons-react';
import React, { useEffect, useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebouncedValue } from '@mantine/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { getRoomById } from '../../redux/features/room/thunk/get-room-by-id';
import NoDataFound from '../../components/no-data-found';
import TableHeader from '../../components/actions/table-header.component';
import { TableBody } from '../../components/rooms/table-body.component';
import TableFooter from '../../components/actions/table-footer.component';
import DisableDeviceModal from '../../components/devices/disable-modal.component';
import DeleteRoomModal from '../../components/rooms/delete-modal.component';
import AddRoomModal from '../../components/rooms/add-modal.component';
import DownloadModal from '../../components/rooms/download-modal.compnent';
import RestoreDisabledRoomModal from '../../components/rooms/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../../components/rooms/restore-deleted.modal.component';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { FormikValues, useFormik } from 'formik';
import Header from '../../components/common/header.component';
import RoomInfoModal from '../../components/rooms/info-modal.component';
import UpdateModal from '../../components/devices/update-modal.component';
import { InputTypes } from '../../components/actions/models/input-type.constant';
import { InputUpdateProps } from '../../components/actions/models/input-update-props.model';
import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import { fetchRoomTypeNames } from '../../redux/features/room-type';

import AddModal from '../../components/actions/modal/add-modal.component';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { RoomType } from '../../models/room-type.model';
import { PaginationResponse } from '../../models/pagination-response.payload';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';
import { fetchDeviceById } from '../../redux/features/devices/thunk/fetch-by-id.thunk';
import { fetchDeviceTypeNames } from '../../redux/features/device-type/thunk/fetch-device-type-names.thunk';
import { updateDeviceById } from '../../redux/features/devices/thunk/update-by-id';
import DeviceInfoModal from './info-modal.component';
import RestoreDisabledDeviceModal from './restore-disabled.modal.component';
import DeleteDeviceModal from './delete-modal.component';
import RestoreDeletedDeviceModal from './restore-deleted.modal.component';
import AddDeviceModal from './add-modal.component';

const UpdateDeviceValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum device type name is 1 character')
    .max(100, 'Maximum device type name is 100 characters.')
    .required('Device type name is required'),
  description: Yup.string().max(
    500,
    'Maximum device type description is 500 characters'
  ),
});

const defaultPagination = {
  limit: 5,
  page: 1,
  name: '',
  search: '',
  type: '',
  sort: 'name',
  dir: 'ASC',
};

function DevicesManagement(props: any) {
  const { classes } = useStyles();
  const devices = useAppSelector((state) => state.device.devices);
  const [deviceTypeNames, setDeviceTypeNames] = useState([]);
  const [pagination, setPagination] = useState<PagingParams>(defaultPagination);
  const [debounceSearchValue] = useDebouncedValue(pagination.name, 400);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDevices(pagination));
  }, [
    pagination.page,
    pagination.limit,
    pagination.name,
    pagination.type,
    pagination.sort,
    pagination.dir,
    pagination.search,
    debounceSearchValue,
    pagination,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(fetchDeviceTypeNames())
      .unwrap()
      .then((deviceTypes) => setDeviceTypeNames(deviceTypes));
  }, []);

  const toggleSortDirection = () => {
    setPagination({
      ...pagination,
      dir: pagination.dir === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const handleSearchValue = (val: string) => {
    setPagination({
      ...defaultPagination,
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
    setPagination(defaultPagination);
  };

  const handleFetchById = (idVal) => {
    return dispatch(fetchDeviceById(idVal));
  };

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);
  const [isDisableShown, setDisableShown] = useState<boolean>(false);
  const [isRestoreDisabledShown, setRestoreDisabledShown] =
    useState<boolean>(false);
  const device = useAppSelector((state) => state.device.device);

  const ActionsFilter: React.FC = () => {
    return (
      <>
        <Button
          leftIcon={<Plus />}
          color="green"
          onClick={() => setAddShown(true)}
          style={{ marginRight: 10 }}
        >
          Add
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDisabledShown(true)}
          style={{ marginRight: 10 }}
        >
          <PencilOff color={'red'} />
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDeletedShown(true)}
          style={{ marginRight: 10 }}
        >
          <ArchiveOff />
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
      handleFetchById(id)
        .unwrap()
        .then(() => setDeleteShown(!isDeleteShown));
    },
  };

//   const infoFields = [
//     {
//       label: 'Id',
//       id: 'id',
//       name: 'id',
//       value: room.id,
//       readOnly: true,
//     },
//     {
//       label: 'Name',
//       id: 'name',
//       name: 'name',
//       value: room.name,
//       readOnly: true,
//     },
//     {
//       label: 'Type',
//       id: 'type',
//       name: 'type',
//       value: room.roomTypeName,
//       readOnly: true,
//     },
//     {
//       label: 'Create By',
//       id: 'createdBy',
//       name: 'createdBy',
//       value: room.createdBy,
//       readOnly: true,
//     },
//     {
//       label: 'Create At',
//       id: 'createdAt',
//       name: 'createdAt',
//       value: dayjs(room.createdAt).format('HH:mm DD/MM/YYYY'),
//       readOnly: true,
//     },
//     {
//       label: 'Update By',
//       id: 'updatedBy',
//       name: 'updatedBy',
//       value: room.updatedBy,
//       readOnly: true,
//     },
//     {
//       label: 'Update At',
//       id: 'updatedAt',
//       name: 'updatedAt',
//       value: dayjs(room.updatedAt).format('HH:mm DD/MM/YYYY'),
//       readOnly: true,
//     },
//     {
//       label: 'Description',
//       id: 'description',
//       name: 'description',
//       value: room.description,
//       readOnly: true,
//     },
//   ];

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
  };

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateDeviceById({
        id: values.id,
        payload: values.payload,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateDeviceValidation,
    initialValues: {
      id: device.id,
      name: device.name,
      description: device.description,
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
      <AdminLayout>
        <Header
          title="Devices Management"
          icon={<BuildingWarehouse size={50} />}
        />
        <TableHeader
          actionsLeft={null}
          handleResetFilter={() => handleResetFilter()}
          actions={<ActionsFilter />}
          setSearch={(val) => handleSearchValue(val)}
          search={pagination.search}
        />

        <RestoreDisabledDeviceModal
          isShown={isRestoreDisabledShown}
          toggleShown={() => setRestoreDisabledShown(!isRestoreDisabledShown)}
          pagination={pagination}
        />
        <RestoreDeletedDeviceModal
          isShown={isRestoreDeletedShown}
          toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
          pagination={pagination}
        />

        {devices.items ? (
          <>
            <TableBody
              actionButtonCb={handleActionsCb}
              toggleSortDirection={() => toggleSortDirection()}
              data={devices.items}
              page={pagination.page}
              itemsPerPage={pagination.limit}
            />
            <DeviceInfoModal
              // header="Room Information"
              // fields={infoFields}
              toggleShown={() => setInfoShown(!isInfoShown)}
              isShown={isInfoShown}
              toggleDisableModalShown={() => setDisableShown(!isDisableShown)}
            />
            <DisableDeviceModal
              isShown={isDisableShown}
              toggleShown={() => setDisableShown(!isDisableShown)}
              toggleInforModalShown={() => setInfoShown(!isInfoShown)}
              pagination={pagination}
            />
            <DeleteDeviceModal
              isShown={isDeleteShown}
              toggleShown={() => setDeleteShown(!isDeleteShown)}
              pagination={pagination}
            />
            <UpdateModal
              // formik={updateFormik}
              // handleSubmit={() => updateFormik.handleSubmit()}
              isShown={isUpdateShown}
              toggleShown={() => setUpdateShown(!isUpdateShown)}
              pagination={pagination}
              deviceTypes={deviceTypeNames}
            />
          </>
        ) : (
          <NoDataFound />
        )}

        <AddDeviceModal
          isShown={isAddShown}
          pagination={pagination}
          toggleShown={() => handleAddModalClose()}
          deviceTypes={deviceTypeNames}
        />
        {devices.meta ? (
          <TableFooter
            handlePageChange={(val) => handlePageChange(val)}
            handleLimitChange={(val) => handleLimitChange(val)}
            metadata={devices.meta}
          />
        ) : null}
      </AdminLayout>
    </>
  );
}

const useStyles = createStyles({
  tableContainer: {
    margin: 10,
  },
  table: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default DevicesManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assa: null,
    },
  };
};
