import { GetServerSideProps } from 'next';
import AdminLayout from '../../components/layout/admin.layout';
import { Button, createStyles } from '@mantine/core';
import {
  ArchiveOff,
  BuildingWarehouse,
  Download,
  PencilOff,
  Plus,
} from 'tabler-icons-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebouncedValue } from '@mantine/hooks';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { getRoomById } from '../../redux/features/room/thunk/get-room-by-id';
import NoDataFound from '../../components/no-data-found';
import TableHeader from '../../components/actions/table-header.component';
import { TableBody } from '../../components/rooms/table-body.component';
import TableFooter from '../../components/actions/table-footer.component';
import AddRoomModal from '../../components/rooms/add-modal.component';
import DeleteRoomModal from '../../components/rooms/delete-modal.component';
import DisableRoomModal from '../../components/rooms/disable-modal.component';
import DownloadModal from '../../components/rooms/download-modal.compnent';
import RoomInfoModal from '../../components/rooms/info-modal.component';
import RestoreDisabledRoomModal from '../../components/rooms/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../../components/rooms/restore-deleted.modal.component';
import UpdateModal from '../../components/rooms/update-modal.component';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import Header from '../../components/common/header.component';
import { fetchRoomTypeNames } from '../../redux/features/room-type';

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
  const [isDownShown, setDownShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);
  const [isDisableShown, setDisableShown] = useState<boolean>(false);
  const [isRestoreDisabledShown, setRestoreDisabledShown] =
    useState<boolean>(false);

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
        <Button variant="outline" color="violet" onClick={() => setDownShown(true)}>
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

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
  };

  const handleDownModalClose = () => {
    setDownShown(false);
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
              // formik={updateFormik}
              // handleSubmit={() => updateFormik.handleSubmit()}
              isShown={isUpdateShown}
              toggleShown={() => setUpdateShown(!isUpdateShown)}
              pagination={pagination}
              roomTypes={roomTypeNames}
            />
          </>
        ) : (
          <NoDataFound />
        )}
        <DownloadModal
          isShown={isDownShown}
          toggleShown={() => handleDownModalClose()}
        />
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
