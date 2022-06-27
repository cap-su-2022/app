import { Button, createStyles, Table } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AdminLayout from '../components/layout/admin.layout';
import TableHeader from '../components/devices/table-header.component';
import Th from '../components/table/th.table.component';
import TableFooter from '../components/devices/table-footer.component';
import NoDataFound from '../components/no-data-found';
import AddDeviceModal from '../components/devices/add-modal.component';
import DownloadModal from '../components/rooms/download-modal.compnent';
import RestoreDisabledRoomModal from '../components/rooms/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../components/rooms/restore-deleted.modal.component';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { changeRoomsTextSearch } from '../redux/features/room/room.slice';
import { InfoCircle, Pencil } from 'tabler-icons-react';
import { RowData } from '../models/table/row-data.model';
import DevicesHeader from '../components/devices/header.component';
import { fetchDevices } from '../redux/features/devices/thunk/fetch-devices.thunk';
import InfoModal from '../components/devices/info-modal.component';
import { fetchDeviceById } from '../redux/features/devices/thunk/fetch-by-id.thunk';
import UpdateModal from '../components/devices/update-modal.component';
import DisableModal from '../components/devices/disable-modal.component';
import DeleteModal from '../components/devices/delete-modal.component';
interface RoomsRowData extends RowData {
  stt: number;
  id: string;
  name: string;
  isDisabled: boolean;
  updatedAt: string;
}

function DevicesPage() {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const devices = useAppSelector((state) => state.device.devices);
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
  const [isRestoreDisabledModalShown, setRestoreDisabledModalShown] =
    useState<boolean>(false);
  const [isRestoreDeletedModalShown, setRestoreDeletedModalShown] =
    useState<boolean>(false);
  const [isDownloadModalShown, setDownloadModalShown] =
    useState<boolean>(false);

  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);
  const [debouncedSearchValue] = useDebouncedValue(searchText, 400);

  const [sortBy, setSortBy] = useState<keyof RoomsRowData>(null);

  useEffect(() => {
    dispatch(fetchDevices())
      .unwrap()
      .catch(() => {
        router.replace('/login');
      });
  }, [debouncedSearchValue, itemsPerPage, activePage, direction]);

  const handleShowInfoModal = async (id: string) => {
    dispatch(fetchDeviceById(id)).then(() =>
      setDetailModalShown(!isDetailModalShown)
    );
  };

  const handleShowUpdateModal = (id: string) => {
    dispatch(fetchDeviceById(id)).then(() =>
      setUpdateModalShown(!isUpdateModalShown)
    );
  };

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
    return devices.map((row, index) => (
      <tr key={row.id}>
        <td>{row.stt}</td>
        <td>{row.name}</td>
        <td>
          {new Date(row.updatedAt).toLocaleDateString() +
            ' ' +
            new Date(row.updatedAt).toLocaleTimeString()}
        </td>
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

      {devices?.length > 0 ? (
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
                  <Th onSort={null}>Status</Th>
                  <Th onSort={null}>Action</Th>
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

      <DownloadModal
        isShown={isDownloadModalShown}
        toggleShown={() => setDownloadModalShown(!isDownloadModalShown)}
      />
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

export default DevicesPage;
