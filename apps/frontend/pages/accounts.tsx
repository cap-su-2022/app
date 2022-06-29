import { Button, createStyles, Table } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import TableHeader from '../components/users/table-header.component';
import Th from '../components/table/th.table.component';
import TableFooter from '../components/users/table-footer.component';
import NoDataFound from '../components/no-data-found';
import AddDeviceModal from '../components/users/add-modal.component';
import RestoreDisabledRoomModal from '../components/users/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../components/users/restore-deleted.modal.component';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { changeRoomsTextSearch } from '../redux/features/room/room.slice';
import { InfoCircle, Pencil } from 'tabler-icons-react';
import { RowData } from '../models/table/row-data.model';
import DevicesHeader from '../components/users/header.component';
import InfoModal from '../components/users/info-modal.component';
import UpdateModal from '../components/users/update-modal.component';
import DisableModal from '../components/users/disable-modal.component';
import DeleteModal from '../components/users/delete-modal.component';
import { User } from '../models/user.model';
import { fetchUsers } from '../redux/features/user/thunk/fetch-users.thunk';
import { fetchUserById } from '../redux/features/user/thunk/fetch-by-id.thunk';
import AdminLayout from '../components/layout/admin.layout';
interface UserRowData extends RowData, User {}

function UsersPage() {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector((state) => state.user.users);
  const itemsPerPage = useAppSelector((state) => state.user.size);
  const activePage = useAppSelector((state) => state.user.currentPage);
  const searchText = useAppSelector((state) => state.user.textSearch);
  const currentPage = useAppSelector((state) => state.user.currentPage);
  const direction = useAppSelector((state) => state.user.direction);
  //modal
  const [isAddModalShown, setAddModalShown] = useState<boolean>(false);
  const [isDetailModalShown, setDetailModalShown] = useState<boolean>(false);
  const [isUpdateModalShown, setUpdateModalShown] = useState<boolean>(false);
  const [isDisableModalShown, setDisableModalShown] = useState<boolean>(false);
  const [isDeleteModalShown, setDeleteModalShown] = useState<boolean>(false);
  const [isRestoreDisabledModalShown, setRestoreDisabledModalShown] =
    useState<boolean>(false);
  const [isRestoreDeletedModalShown, setRestoreDeletedModalShown] =
    useState<boolean>(false);
  const [isDownloadModalShown, setDownloadModalShown] =
    useState<boolean>(false);

  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  const [sortBy, setSortBy] = useState<keyof UserRowData>(null);

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch((e) => {
        router.replace('/login');
      });
  }, [debouncedSearchValue, itemsPerPage, activePage, direction]);

  const handleShowInfoModal = async (id: string) => {
    dispatch(fetchUserById(id))
      .unwrap()
      .then(() => setDetailModalShown(!isDetailModalShown));
  };

  const handleShowUpdateModal = (id: string) => {
    dispatch(fetchUserById(id))
      .unwrap()
      .then(() => setUpdateModalShown(!isUpdateModalShown));
  };

  const setSorting = (field: keyof UserRowData) => {
    //   const reversed = field === sortBy ? !reverseSortDirection : false;
    //  setReverseSortDirection(reversed);
  };

  const handleSearchChange = (search: string) => {
    if (!isSpinnerLoading) {
      dispatch(changeRoomsTextSearch(search));
    }
  };

  const handleRenderRows = () => {
    return users.map((row, index) => (
      <tr key={row.id}>
        <td>{row.stt}</td>
        <td>{row.username}</td>
        <td>{row.role}</td>
        <td>
          {row.isDisabled ? (
            <Button compact color="red" variant="light" radius="xl" size="md">
              Disabled
            </Button>
          ) : (
            <Button compact color="green" variant="light" radius="xl" size="md">
              Active
            </Button>
          )}
        </td>
        <td>
          <div
            style={{
              display: 'flex',
            }}
          >
            <Button
              style={{
                marginRight: 5,
              }}
              onClick={() => handleShowInfoModal(row.id)}
              variant="outline"
              color="orange"
            >
              <InfoCircle size={20} />
            </Button>
            <Button
              variant="outline"
              color="blue"
              onClick={() => handleShowUpdateModal(row.id)}
            >
              <Pencil size={20} />
            </Button>
          </div>
        </td>
      </tr>
    ));
  };
  return (
    <AdminLayout>
      <DevicesHeader />
      <TableHeader
        searchText={searchText}
        toggleAddModalShown={() => setAddModalShown(!isAddModalShown)}
        toggleDownloadModalShown={() =>
          setDownloadModalShown(!isDownloadModalShown)
        }
        toggleRestoreDeletedModalShown={() =>
          setRestoreDeletedModalShown(!isRestoreDeletedModalShown)
        }
        toggleRestoreDisabledModalShown={() =>
          setRestoreDisabledModalShown(!isRestoreDisabledModalShown)
        }
        handleChangeSearchText={(val) => handleSearchChange(val)}
      />

      {users?.length > 0 ? (
        <>
          <div
            style={{
              margin: 10,
            }}
          >
            <Table
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
              }}
              horizontalSpacing="md"
              verticalSpacing="xs"
              //  sx={{tableLayout: 'auto', minWidth: 1000}}
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
                    sorted={sortBy === 'username'}
                    reversed={null}
                    onSort={() => setSorting('username')}
                  >
                    Username
                  </Th>
                  <Th
                    sorted={sortBy === 'role'}
                    reversed={null}
                    onSort={() => setSorting('role')}
                  >
                    Role
                  </Th>
                  <Th
                    sorted={sortBy === 'isDisabled'}
                    reversed={null}
                    onSort={() => setSorting('isDisabled')}
                  >
                    Status
                  </Th>
                  <Th onSort={null} reversed sorted>
                    Action
                  </Th>
                </tr>
              </thead>
              <tbody>{handleRenderRows()}</tbody>
            </Table>
          </div>
          <TableFooter />
        </>
      ) : (
        <NoDataFound />
      )}
      <UpdateModal
        isShown={isUpdateModalShown}
        toggleShown={() => setUpdateModalShown(!isUpdateModalShown)}
        toggleDeleteModalShown={() => setDeleteModalShown(!isDeleteModalShown)}
      />
      <InfoModal
        isShown={isDetailModalShown}
        toggleShown={() => setDetailModalShown(!isDetailModalShown)}
        toggleDisableModalShown={() =>
          setDisableModalShown(!isDisableModalShown)
        }
      />
      <DisableModal
        isShown={isDisableModalShown}
        toggleShown={() => setDisableModalShown(!isDisableModalShown)}
        toggleDetailModalShown={() => setDetailModalShown(!isDetailModalShown)}
      />
      <DeleteModal
        isShown={isDeleteModalShown}
        toggleShown={() => setDeleteModalShown(!isDeleteModalShown)}
        toggleUpdateModalShown={() => setUpdateModalShown(!isUpdateModalShown)}
      />

      <AddDeviceModal
        isShown={isAddModalShown}
        toggleShown={() => setAddModalShown(!isAddModalShown)}
      />

      {/*  <DownloadModal isShown={isDownloadModalShown}
                     toggleShown={() => setDownloadModalShown(!isDownloadModalShown)}/>*/}
      <RestoreDisabledRoomModal
        isShown={isRestoreDisabledModalShown}
        toggleShown={() =>
          setRestoreDisabledModalShown(!isRestoreDisabledModalShown)
        }
      />
      <RestoreDeletedRoomModal
        isShown={isRestoreDeletedModalShown}
        toggleShown={() =>
          setRestoreDeletedModalShown(!isRestoreDeletedModalShown)
        }
      />
    </AdminLayout>
  );
}

const useStyles = createStyles((theme) => {
  return {};
});

export default UsersPage;
