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
import DisableRoomModal from '../../components/rooms/disable-modal.component';
import DeleteRoomModal from '../../components/rooms/delete-modal.component';
import AddRoomModal from '../../components/rooms/add-modal.component';
import DownloadModal from '../../components/rooms/download-modal.compnent';
import RestoreDisabledRoomModal from '../../components/rooms/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../../components/rooms/restore-deleted.modal.component';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { FormikValues, useFormik } from 'formik';
import Header from '../../components/common/header.component';
import RoomInfoModal from '../../components/rooms/info-modal.component';
import UpdateModal from '../../components/rooms/update-modal.component';
import { InputTypes } from '../../components/actions/models/input-type.constant';
import { InputUpdateProps } from '../../components/actions/models/input-update-props.model';
import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import { fetchRoomTypeNames } from '../../redux/features/room-type';

import AddModal from '../../components/actions/modal/add-modal.component';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { RoomType } from '../../models/room-type.model';
import { PaginationResponse } from '../../models/pagination-response.payload';

const UpdateRoomValidation = Yup.object().shape({
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

const defaultPagination = {
  limit: 5,
  page: 1,
  name: '',
  search: '',
  type: '',
  sort: 'name',
  dir: 'ASC',
};

function RoomsManagement(props: any) {
  const { classes } = useStyles();
  const rooms = useAppSelector((state) => state.room.rooms);
  const [roomTypeNames, setRoomTypeNames] = useState([]);
  const [pagination, setPagination] = useState<PagingParams>(defaultPagination);
  const [debounceSearchValue] = useDebouncedValue(pagination.name, 400);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRooms(pagination));
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
    dispatch(fetchRoomTypeNames())
      .unwrap()
      .then((roomTypes) => setRoomTypeNames(roomTypes));
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
    return dispatch(getRoomById(idVal));
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
  const room = useAppSelector((state) => state.room.room);

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
      updateRoomById({
        id: values.id,
        payload: values.payload,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateRoomValidation,
    initialValues: {
      id: room.id,
      name: room.name,
      description: room.description,
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
          title="Rooms Management"
          icon={<BuildingWarehouse size={50} />}
        />
        <TableHeader
          actionsLeft={null}
          handleResetFilter={() => handleResetFilter()}
          actions={<ActionsFilter />}
          setSearch={(val) => handleSearchValue(val)}
          search={pagination.search}
        />

        <RestoreDisabledRoomModal
          isShown={isRestoreDisabledShown}
          toggleShown={() => setRestoreDisabledShown(!isRestoreDisabledShown)}
          pagination={pagination}
        />
        <RestoreDeletedRoomModal
          isShown={isRestoreDeletedShown}
          toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
          pagination={pagination}
        />

        {rooms.items ? (
          <>
            <TableBody
              actionButtonCb={handleActionsCb}
              toggleSortDirection={() => toggleSortDirection()}
              data={rooms.items}
              page={pagination.page}
              itemsPerPage={pagination.limit}
            />
            <RoomInfoModal
              // header="Room Information"
              // fields={infoFields}
              toggleShown={() => setInfoShown(!isInfoShown)}
              isShown={isInfoShown}
              toggleDisableModalShown={() => setDisableShown(!isDisableShown)}
            />
            <DisableRoomModal
              isShown={isDisableShown}
              toggleShown={() => setDisableShown(!isDisableShown)}
              toggleInforModalShown={() => setInfoShown(!isInfoShown)}
              pagination={pagination}
            />
            <DeleteRoomModal
              isShown={isDeleteShown}
              toggleShown={() => setDeleteShown(!isDeleteShown)}
              pagination={pagination}
            />
            <UpdateModal
              formik={updateFormik}
              handleSubmit={() => updateFormik.handleSubmit()}
              isShown={isUpdateShown}
              toggleShown={() => setUpdateShown(!isUpdateShown)}
              pagination={pagination}
              roomTypes={roomTypeNames}
            />
          </>
        ) : (
          <NoDataFound />
        )}

        <AddRoomModal
          isShown={isAddShown}
          pagination={pagination}
          toggleShown={() => handleAddModalClose()}
          roomTypes={roomTypeNames}
        />
        {rooms.meta ? (
          <TableFooter
            handlePageChange={(val) => handlePageChange(val)}
            handleLimitChange={(val) => handleLimitChange(val)}
            metadata={rooms.meta}
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

export default RoomsManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assa: null,
    },
  };
};
