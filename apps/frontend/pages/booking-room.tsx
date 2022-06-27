import { Button, createStyles, Modal, Table, Text } from '@mantine/core';
import AdminLayout from '../components/AdminLayout';
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
import { fetchRoomBookingById } from '../redux/features/room-booking/thunk/fetch-room-booking-by-id';
import TableHeader from '../components/actions/table-header.component';
import TableFooter from '../components/actions/table-footer.component';
import NoDataFound from '../components/no-data-found';
import { BookingRequestParams } from '../models/pagination/booking-room-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import Header from '../components/common/header.component';
import { TableBody } from '../components/booking-room/table-body.component';
import InfoModal from '../components/actions/modal/info-modal.component';
import dayjs from 'dayjs';

const defaultPagination = {
  limit: 5,
  page: 1,
  search: '',
  reasonType: '',
  checkInAt: '2022-01-01T06:48:05.100Z',
  checkOutAt: '2022-06-27T06:48:05.100Z',
  sort: 'name',
  dir: 'ASC',
};

const BookingRoom = () => {
  const { classes } = useStyles();
  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const roomBooking = useAppSelector((state) => state.roomBooking.roomBooking);

  const roomBookingList = useAppSelector(
    (state) => state.roomBooking.roomBookings
  );

  const [pagination, setPagination] =
    useState<BookingRequestParams>(defaultPagination);
  console.log('PAGING: ',pagination);
  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoomBookings(pagination));
  }, [
    pagination.page,
    pagination.limit,
    pagination.search,
    pagination.reasonType,
    pagination.checkInAt,
    pagination.checkOutAt,
    pagination.sort,
    pagination.dir,
    debounceSearchValue,
    pagination,
    dispatch,
  ]);

  const infoFields = [
    {
      label: 'Id',
      id: 'id',
      name: 'id',
      value: roomBooking.id,
      readOnly: true,
    },
    {
      label: 'Room Name',
      id: 'roomName',
      name: 'roomName',
      value: roomBooking.roomName,
      readOnly: true,
    },
    {
      label: 'Booked At',
      id: 'bookedAt',
      name: 'bookedAt',
      value: dayjs(roomBooking.bookedAt).format('HH:mm DD/MM/YYYY'),
      readOnly: true,
    },
    {
      label: 'Time Check in',
      id: 'timeCheckin',
      name: 'timeCheckin',
      value: dayjs(roomBooking.timeCheckin).format('HH:mm DD/MM/YYYY'),
      readOnly: true,
    },
    {
      label: 'Time Check out',
      id: 'timeCheckout',
      name: 'timeCheckout',
      value: dayjs(roomBooking.timeCheckout).format('HH:mm DD/MM/YYYY'),
      readOnly: true,
    },
    {
      label: 'Request By',
      id: 'requestedBy',
      name: 'requestedBy',
      value: roomBooking.requestedBy,
      readOnly: true,
    },
    {
      label: 'Status',
      id: 'status',
      name: 'status',
      value: roomBooking.status,
      readOnly: true,
    },
    {
      label: 'Reason Type',
      id: 'reasonType',
      name: 'reasonType',
      value: roomBooking.reasonType,
      readOnly: true,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: roomBooking.description,
      readOnly: true,
    },
  ];

  const toggleSortDirection = (label) => {
    setPagination({
      ...pagination,
      sort: label,
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

  const ModalHeaderTitle: React.FC = () => {
    return (
      <div className={classes.container}>
        <Ticket size={30} />
        <Text className={classes.textModalTitle}>New Request Booking</Text>
      </div>
    );
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

  return (
    <AdminLayout>
      <Header title="Room Booking" icon={<Ticket size={50} />} />

      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.roomName}
      />

      {roomBookingList.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={(label) => toggleSortDirection(label)}
            data={roomBookingList.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Room Booking Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />
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
        {isAddShown ? (
          <Modal
            size={'70%'}
            opened={isAddShown}
            title={<ModalHeaderTitle />}
            onClose={() => setAddShown(false)}
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
