import { Button, createStyles, Modal, Table, Text } from '@mantine/core';
import AdminLayout from '../components/layout/admin.layout';
import React, { useEffect, useState } from 'react';
import {
  BuildingWarehouse,
  Download,
  InfoCircle,
  Pencil,
  Plus,
  Ticket,
} from 'tabler-icons-react';
import NewBookingRequestComponent from '../components/booking-room/new-booking-request.component';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { changeRoomBookingTextSearch } from '../redux/features/room-booking/room-booking.slice';
import Th from '../components/table/th.table.component';
import { RowData } from '../models/table/row-data.model';
import { fetchRoomBookings } from '../redux/features/room-booking/thunk/fetch-room-booking-list';
import TableHeader from '../components/actions/table-header.component';
import TableFooter from '../components/actions/table-footer.component';
import NoDataFound from '../components/no-data-found';
import { PaginationParams } from '../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import Header from '../components/common/header.component';
import moment from 'moment';

const defaultPagination = {
  limit: 5,
  page: 1,
  roomName: '',
  search: '',
  reasonType: '',
  checkInAt: '2022-01-01T06:48:05.100Z',
  checkOutAt: '2022-06-21T06:48:05.100Z',
  sort: 'ASC',
};

interface RoomBookingListRowData extends RowData {
  id: string;
  stt: number;
  status: string;
  roomName: string;
  checkInAt: string;
  checkOutAt: string;
  roomId: string;
  reasonType: string;
  bookedAt: string;
  // timeCheckin: string;
  // timeCheckout: string;
}

const BookingRoom = () => {
  const { classes } = useStyles();

  const roomBookingList = useAppSelector(
    (state) => state.roomBooking.roomBookings
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(defaultPagination);

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(pagination.dir);
    dispatch(fetchRoomBookings(pagination));
  }, [
    pagination.page,
    pagination.limit,
    pagination.roomName,
    pagination.reasonType,
    pagination.checkInAt,
    pagination.checkOutAt,
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

  // const itemsPerPage = useAppSelector((state) => state.roomBooking.size);
  // const activePage = useAppSelector((state) => state.roomBooking.currentPage);
  // const searchText = useAppSelector((state) => state.roomBooking.textSearch);
  // const currentPage = useAppSelector((state) => state.roomBooking.currentPage);
  // const direction = useAppSelector((state) => state.roomBooking.direction);
  const isSpinnerLoading = useAppSelector((state) => state.spinner.isEnabled);

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

  const handleSearchChange = (search: string) => {
    if (!isSpinnerLoading) {
      dispatch(changeRoomBookingTextSearch(search));
    }
  };
  const setSorting = (field: keyof RoomBookingListRowData) => {
    //   const reversed = field === sortBy ? !reverseSortDirection : false;
    //  setReverseSortDirection(reversed);
  };
  const HeaderTitle: React.FC = () => {
    return (
      <div className={classes.container}>
        <Ticket size={50} />
        <Text className={classes.text}>Booking Room</Text>
      </div>
    );
  };

  const ModalHeaderTitle: React.FC = () => {
    return (
      <div className={classes.container}>
        <Ticket size={30} />
        <Text className={classes.textModalTitle}>New Request Booking</Text>
      </div>
    );
  };

  const THead = () => {
    return (
      <thead>
        <tr>
          <Th reversed={null} onSort={null}>
            STT
          </Th>
          <Th reversed={null} onSort={() => setSorting('roomName')}>
            Room Name
          </Th>

          <Th reversed={null} onSort={() => setSorting('checkInAt')}>
            Time Checking
          </Th>
          <Th reversed={null} onSort={() => setSorting('checkOutAt')}>
            Time Checkout
          </Th>
          <Th reversed={null} onSort={() => setSorting('status')}>
            Booking Status
          </Th>
          <Th onSort={null}>Action</Th>
        </tr>
      </thead>
    );
  };

  const handleRenderRows = () => {
    return roomBookingList.items.map((row, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{row.roomName}</td>

        <td>{moment(row.checkInAt).format('HH:MM DD/MM/YYYY')}</td>
        <td>{moment(row.checkOutAt).format('HH:MM DD/MM/YYYY')}</td>
        <td className={classes.statusRow}>
          {row.status === 'BOOKING' ? (
            <div className={classes.bookingDisplay}>{row.status}</div>
          ) : null}
          {row.status === 'BOOKED' ? (
            <div className={classes.bookedDisplay}>{row.status}</div>
          ) : null}
          {row.status === 'CHECKED IN' ? (
            <div className={classes.processingDisplay}>{row.status}</div>
          ) : null}
          {row.status === 'CANCELLED' ? (
            <div className={classes.canceledDisplay}>{row.status}</div>
          ) : null}
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
              // onClick={() => handleShowInfoModal(row.id)}
              variant="outline"
              color="orange"
            >
              <InfoCircle size={20} />
            </Button>
            <Button
              variant="outline"
              color="blue"
              // onClick={() => handleShowUpdateModal(row.id)}
            >
              <Pencil size={20} />
            </Button>
          </div>
        </td>
      </tr>
    ));
  };

  const ActionsLeftFilter: React.FC = () => {
    return (
      <Button variant="outline" color="violet">
        <Download />
      </Button>
    );
  };

  const ActionsRightFilter: React.FC = () => {
    return (
      <Button
        variant="outline"
        color="violet"
        onClick={() => setAddModalShown(true)}
      >
        <Plus />
      </Button>
    );
  };

  return (
    <AdminLayout>
      <Header title="Room Booking" icon={<Ticket size={50} />} />

      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsLeftFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />

      {roomBookingList.items ? (
        <>
          <div className={classes.tableContainer}>
            <Table
              className={classes.table}
              horizontalSpacing="md"
              verticalSpacing="xs"
            >
              <THead />
              <tbody>{handleRenderRows()}</tbody>
            </Table>
          </div>
          <TableFooter
            handlePageChange={(val) => handlePageChange(val)}
            handleLimitChange={(val) => handleLimitChange(val)}
            metadata={roomBookingList.meta}
          />
        </>
      ) : (
        <NoDataFound />
      )}

      <div>
        {isAddModalShown ? (
          <Modal
            size={'70%'}
            opened={isAddModalShown}
            title={<ModalHeaderTitle />}
            onClose={() => setAddModalShown(false)}
          >
            <NewBookingRequestComponent />
          </Modal>
        ) : null}
      </div>
    </AdminLayout>
  );
};

const useStyles = createStyles({
  text: {
    marginLeft: 10,
    fontWeight: 600,
    fontSize: 30,
  },
  container: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textModalTitle: {
    marginLeft: 10,
    fontWeight: 600,
    fontSize: 20,
  },
  tableContainer: {
    margin: 10,
  },
  table: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  statusRow: {
    textAlign: 'center',
  },
  bookingDisplay: {
    color: '#228be6',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#0000ff1c',
    fontWeight: 600,
  },
  bookedDisplay: {
    color: '#fd7e14',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#fd7e1442',
    fontWeight: 600,
  },
  canceledDisplay: {
    color: 'red',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#ff00001c',
    fontWeight: 600,
  },
  processingDisplay: {
    color: '#40c057',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#00800024',
    fontWeight: 600,
  },
});

export default BookingRoom;
