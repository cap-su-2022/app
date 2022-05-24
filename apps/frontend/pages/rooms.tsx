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
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import Th from "../components/table/th.table.component";
import {RowData} from "../models/table/row-data.model";
import {useRouter} from "next/router";
import {useDebouncedValue} from "@mantine/hooks";
import RoomInfoModal from "../components/rooms/room-info-modal.component";
import {getRoomById} from "../redux/features/room/thunk/get-room-by-id";
import TableHeader from "../components/rooms/table-header.component";
import {fetchRooms} from "../redux/features/room/thunk/fetch-rooms";
import NoDataFound from "../components/no-data-found";
import {
  changeRoomsTextSearch,
} from "../redux/features/room/room.slice";
import TableFooter from "../components/rooms/table-footer.component";
import RoomUpdateModal from "../components/rooms/room-update-modal.component";
import RoomsHeader from "../components/rooms/header.component";
import DisableRoomModal from "../components/rooms/disable-room-modal.component";
import DeleteRoomModal from "../components/rooms/delete-room-modal.component";
import AddRoomModal from "../components/rooms/add-room-modal.component";
import DownloadModal from "../components/rooms/download-modal.compnent";
import RestoreDisabledRoomModal from "../components/rooms/restore-disabled-room.modal.component";

interface RoomsRowData extends RowData {
  stt: number;
  id: string;
  name: string;
  isDisabled: boolean;
  updatedAt: string;
}

interface TableSortProps {
  currentPage: number;
  totalPage: number;
  size: number;
  data: RoomsRowData[];
}

const initialState = {
  data: {
    totalPage: 0,
    data: [],
    currentPage: 0,
    size: 0,
  },
  search: '',
  page: 1,
  itemPerPage: 3,
  direction: 'ASC',
  isAddModalShown: false,
};

interface RoomsResponseModel {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  isDeleted: string;
  isDisabled: string
}


function RoomsManagement(props: any) {
  const {classes} = useStyles();

  const dispatch = useAppDispatch();
  const router = useRouter();


  const rooms = useAppSelector((state) => state.room.rooms);

  const itemsPerPage = useAppSelector((state) => state.room.size);
  const activePage = useAppSelector((state) => state.room.currentPage);
  const searchText = useAppSelector((state) => state.room.textSearch);
  const currentPage = useAppSelector((state) => state.room.currentPage);
  const direction = useAppSelector((state) => state.room.direction);
  //modal
  const [isDetailModalShown, setDetailModalShown] = useState<boolean>(false);
  const [isUpdateModalShown, setUpdateModalShown] = useState<boolean>(false);
  const [isDisableModalShown, setDisableModalShown] = useState<boolean>(false);
  const [isDeleteRoomModalShown, setDeleteRoomModalShown] = useState<boolean>(false);
  const [isRestoreDisabledModalShown, setRestoreDisabledModalShown] = useState<boolean>(false);
  const [isRestoreDeletedModalShown, setRestoreDeletedModalShown] = useState<boolean>(false);

  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  const [sortBy, setSortBy] = useState<keyof RoomsRowData>(null);

  useEffect(() => {
    dispatch(fetchRooms()).unwrap().catch(() => {
      router.replace('/login');
    });

  }, [debouncedSearchValue, itemsPerPage, activePage, direction]);


  const handleShowInfoModal = async (id: string) => {
    dispatch(getRoomById(id))
      .then(() => setDetailModalShown(!isDetailModalShown));
  }

  const handleShowUpdateModal = (id: string) => {
    dispatch(getRoomById(id))
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
        <td>{(rooms.length * (currentPage - 1)) + (index+ currentPage)}</td>
        <td>{row.name}</td>
        <td>{new Date(row.updatedAt).toDateString()}</td>
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

  return (
    <>
      <AdminLayout>
        <RoomsHeader/>

        <TableHeader searchText={searchText}
                     toggleRestoreDeletedModalShown={() => setRestoreDeletedModalShown(!isRestoreDeletedModalShown)}
                     toggleRestoreDisabledModalShown={() => setRestoreDisabledModalShown(!isRestoreDisabledModalShown)}
                     handleChangeSearchText={(val) => handleSearchChange(val)}/>

        {rooms?.length > 0 ? <>
            <div style={{
              margin: 10
            }}>
              <Table style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10
              }}
                     horizontalSpacing="md"
                     verticalSpacing="xs"
                     sx={{tableLayout: 'auto', minWidth: 1000}}
              >
                <thead>
                <tr>
                  <Th
                    sorted={sortBy === 'stt'}
                    reversed={null}
                    onSort={() => setSorting('stt')}
                  >
                    STT
                  </Th>
                  <Th
                    sorted={sortBy === 'name'}
                    reversed={null}
                    onSort={() => setSorting('name')}
                  >
                    Name
                  </Th>
                  <Th
                    sorted={sortBy === 'updatedAt'}
                    reversed={null}
                    onSort={() => setSorting('updatedAt')}
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
          toggleDeleteModalShown={() => setDeleteRoomModalShown(!isDeleteRoomModalShown)}
        />
        <RoomInfoModal isShown={isDetailModalShown}
                       toggleShown={() => setDetailModalShown(!isDetailModalShown)}
                       toggleDisableRoomModalShown={() => setDisableModalShown(!isDisableModalShown)}
        />
        <DisableRoomModal isShown={isDisableModalShown}
                          toggleShown={() => setDisableModalShown(!isDisableModalShown)}
                          toggleDetailModalShown={() => setDetailModalShown(!isDetailModalShown)}/>
        <DeleteRoomModal
          isShown={isDeleteRoomModalShown}
          toggleShown={() => setDeleteRoomModalShown(!isDeleteRoomModalShown)}
          toggleUpdateModalShown={() => setUpdateModalShown(!isUpdateModalShown)}/>

        <AddRoomModal/>

        <DownloadModal/>
        <RestoreDisabledRoomModal
          isShown={isRestoreDisabledModalShown}
          toggleShown={() => setRestoreDisabledModalShown(!isRestoreDisabledModalShown)} />
        <RestoreDisabledRoomModal
          isShown={isRestoreDeletedModalShown}
          toggleShown={() => setRestoreDeletedModalShown(!isRestoreDeletedModalShown)} />
      </AdminLayout>
    </>
  );


}

const useStyles = createStyles({

})
/*
* <tr>
              <td>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
* */

export default RoomsManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      assa: null,
    }
  };
}
