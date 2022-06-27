import {GetServerSideProps} from "next";
import AdminLayout from "../components/AdminLayout";
import {
  Button,
  createStyles,
  ScrollArea,
  Table,
} from "@mantine/core";
import {
  InfoCircle, Pencil,
} from "tabler-icons-react";
import React, {useEffect, useReducer, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import Th from "../components/table/th.table.component";
import {RowData} from "../models/table/row-data.model";
import {useRouter} from "next/router";
import {useDebouncedValue} from "@mantine/hooks";
import RoomInfoModal from "../components/rooms/info-modal.component";
import {getRoomById} from "../redux/features/room/thunk/get-room-by-id";
import TableHeader from "../components/rooms/table-header.component";
import {fetchRooms} from "../redux/features/room/thunk/fetch-rooms";
import NoDataFound from "../components/no-data-found";
import {
  changeRoomsTextSearch,
} from "../redux/features/room/room.slice";
import TableFooter from "../components/rooms/table-footer.component";
import RoomUpdateModal from "../components/rooms/update-modal.component";
import RoomsHeader from "../components/rooms/header.component";
import DisableRoomModal from "../components/rooms/disable-modal.component";
import DeleteRoomModal from "../components/rooms/delete-modal.component";
import AddRoomModal from "../components/rooms/add-modal.component";
import DownloadModal from "../components/rooms/download-modal.compnent";
import RestoreDisabledRoomModal from "../components/rooms/restore-disabled.modal.component";
import RestoreDeletedRoomModal from "../components/rooms/restore-deleted.modal.component";
import { RoomParams } from '../models/pagination/room-params.model';

const defaultPagination = {
  limit: 5,
  page: 1,
  name: '',
  type: '',
  sort: 'ASC',
};


function RoomsManagement(props: any) {
  const { classes } = useStyles();
  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const room = useAppSelector((state) => state.room.selectedRoom);


  const rooms = useAppSelector(
    (state) => state.room.rooms
  );

  const [pagination, setPagination] =
    useState<RoomParams>(defaultPagination);
  console.log(pagination)
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
    debounceSearchValue,
    pagination,
    dispatch,
  ]);

  const infoFields = [
    {
      label: 'Id',
      id: 'id',
      name: 'id',
      value: room.id,
      readOnly: true,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: room.name,
      readOnly: true,
    },
    {
      label: 'Type',
      id: 'type',
      name: 'type',
      value: room.type,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: room.description,
      readOnly: true,
    },
    {
      label: 'Create By',
      id: 'createdBy',
      name: 'createdBy',
      value: room.createdBy,
      readOnly: true,
    },
    {
      label: 'Create At',
      id: 'createdAt',
      name: 'createdAt',
      value: room.createdAt,
      readOnly: true,
    },
    {
      label: 'Update By',
      id: 'updatedBy',
      name: 'updatedBy',
      value: room.updatedBy,
      readOnly: true,
    },
    {
      label: 'Update At',
      id: 'updatedAt',
      name: 'updatedAt',
      value: room.updatedAt,
      readOnly: true,
    },
  ];

  const toggleSortDirection = () => {
    setPagination({
      ...pagination,
      dir: pagination.dir === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const handleSearchValue = (val: string) => {
    setPagination({
      ...defaultPagination,
      name: val,
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

  const handleFetchById = (idVal) => {
    return dispatch(fetchRoomBookingById(idVal));
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

  const handleResetFilter = () => {
    setPagination(defaultPagination);
  };
////////////////////////////////////

  const router = useRouter();


  const itemsPerPage = useAppSelector((state) => state.room.size);
  const activePage = useAppSelector((state) => state.room.currentPage);
  const searchText = useAppSelector((state) => state.room.textSearch);
  const currentPage = useAppSelector((state) => state.room.currentPage);
  const direction = useAppSelector((state) => state.room.direction);

  //modal
  const [isAddModalShown, setAddModalShown] = useState<boolean>(false);
  const [isDetailModalShown, setDetailModalShown] = useState<boolean>(false);
  const [isUpdateModalShown, setUpdateModalShown] = useState<boolean>(false);
  const [isDisableModalShown, setDisableModalShown] = useState<boolean>(false);
  const [isDeleteModalShown, setDeleteModalShown] = useState<boolean>(false);
  const [isRestoreDisabledModalShown, setRestoreDisabledModalShown] = useState<boolean>(false);
  const [isRestoreDeletedModalShown, setRestoreDeletedModalShown] = useState<boolean>(false);
  const [isDownloadModalShown, setDownloadModalShown] = useState<boolean>(false);

  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  const [sortBy, setSortBy] = useState<keyof RoomsRowData>(null);
  const [sortName, setSortName] = useState<"ASC" | "DESC">("ASC");
  const [sortUpdatedAt, setSortUpdatedAt] = useState<"ASC" | "DESC">("ASC");

  useEffect(() => {
    dispatch(fetchRooms()).unwrap().catch(() => {
      router.replace("/login");
    });

  }, [debouncedSearchValue, itemsPerPage, activePage, direction]);


  const handleShowInfoModal = async (id: string) => {
    dispatch(getRoomById(id)).unwrap()
      .then(() => setDetailModalShown(!isDetailModalShown));
  }

  const handleShowUpdateModal = (id: string) => {
    dispatch(getRoomById(id)).unwrap()
      .then(() => setUpdateModalShown(!isUpdateModalShown));

  }


  const setSorting = (field: keyof RoomsRowData) => {
 //   const reversed = field === sortBy ? !reverseSortDirection : false;
  //  setReverseSortDirection(reversed);

  };

  const handleSearchChange = (search: string) => {
    if (!isSpinnerLoading) {
      dispatch(changeRoomsTextSearch(search));
    }

  };

  const handleRenderRows = () => {
    return rooms.map((row, index) => (
      <tr key={row.id}>
        <td>{row.stt}</td>
        <td>{row.name}</td>
        <td>{row.type}</td>
        <td>{new Date(row.updatedAt).toLocaleDateString() + " " + new Date(row.updatedAt).toLocaleTimeString()}</td>
        <td>
          {row.isDisabled
            ? <Button compact color="red"
                      variant="light"
                      radius="xl"
                      size="md">Disabled</Button>
            : <Button compact color="green"
                      variant="light"
                      radius="xl"
                      size="md">Active</Button>
          }
        </td>
        <td>
          <div style={{
            display: 'flex',
          }}>
            <Button style={{
              marginRight: 5
            }} onClick={() => handleShowInfoModal(row.id)}
                    variant="outline"
                    color="orange">
              <InfoCircle size={20}/>
            </Button>
            <Button variant="outline" color="blue"
            onClick={() => handleShowUpdateModal(row.id)}>
              <Pencil size={20}/>
            </Button>
          </div>
        </td>
      </tr>
    ));
  }

  const THead = () => {
    return (
      <thead>
      <tr>
        <Th
          sorted={sortBy === 'stt'}
          reversed={null}
          onSort={null}
        >
          STT
        </Th>
        <Th
          sorted={sortBy === "name"}
          reversed={null}
          onSort={() => setSorting("name")}
        >
          Name
        </Th>
        <Th
          sorted={sortBy === "type"}
          reversed={null}
          onSort={() => setSorting("type")}
        >
          Type
        </Th>
        <Th
          sorted={sortBy === "updatedAt"}
          reversed={null}
          onSort={() => setSorting("updatedAt")}
        >
          Updated At
        </Th>
        <Th onSort={null}>
          Status
        </Th>
        <Th onSort={null}>
          Action
        </Th>
      </tr>
      </thead>
    );
  }

  return (
    <>
      <AdminLayout>
        <RoomsHeader/>

        <TableHeader searchText={searchText}
                     toggleAddModalShown={() => setAddModalShown(!isAddModalShown)}
                     toggleDownloadModalShown={() => setDownloadModalShown(!isDownloadModalShown)}
                     toggleRestoreDeletedModalShown={() => setRestoreDeletedModalShown(!isRestoreDeletedModalShown)}
                     toggleRestoreDisabledModalShown={() => setRestoreDisabledModalShown(!isRestoreDisabledModalShown)}
                     handleChangeSearchText={(val) => handleSearchChange(val)}/>

        {rooms?.length > 0 ? <>
            <div className={classes.tableContainer}>
              <Table className={classes.table}
                     horizontalSpacing="md"
                     verticalSpacing="xs"
                    //  sx={{tableLayout: 'auto', minWidth: 1000}}
              >
                <THead/>
                <tbody>
                {handleRenderRows()}
                </tbody>
              </Table>
            </div>
            <TableFooter/>
          </>

          : <NoDataFound/>}
        <RoomUpdateModal
          isShown={isUpdateModalShown}
          toggleShown={() => setUpdateModalShown(!isUpdateModalShown)}
          toggleDeleteModalShown={() => setDeleteModalShown(!isDeleteModalShown)}
        />
        <RoomInfoModal isShown={isDetailModalShown}
                       toggleShown={() => setDetailModalShown(!isDetailModalShown)}
                       toggleDisableRoomModalShown={() => setDisableModalShown(!isDisableModalShown)}
        />
        <DisableRoomModal isShown={isDisableModalShown}
                          toggleShown={() => setDisableModalShown(!isDisableModalShown)}
                          toggleDetailModalShown={() => setDetailModalShown(!isDetailModalShown)}/>
        <DeleteRoomModal
          isShown={isDeleteModalShown}
          toggleShown={() => setDeleteModalShown(!isDeleteModalShown)}
          toggleUpdateModalShown={() => setUpdateModalShown(!isUpdateModalShown)}/>

        <AddRoomModal isShown={isAddModalShown} toggleShown={() => setAddModalShown(!isAddModalShown)}/>

        <DownloadModal isShown={isDownloadModalShown} toggleShown={() => setDownloadModalShown(!isDownloadModalShown)}/>
        <RestoreDisabledRoomModal
          isShown={isRestoreDisabledModalShown}
          toggleShown={() => setRestoreDisabledModalShown(!isRestoreDisabledModalShown)} />
        <RestoreDeletedRoomModal
          isShown={isRestoreDeletedModalShown}
          toggleShown={() => setRestoreDeletedModalShown(!isRestoreDeletedModalShown)} />
      </AdminLayout>
    </>
  );


}

const useStyles = createStyles({
  tableContainer: {
    margin: 10
  },
  table: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
})


export default RoomsManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      assa: null,
    }
  };
}
