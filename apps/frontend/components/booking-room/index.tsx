import {
  Burger,
  Button,
  createStyles,
  Group,
  Modal,
  Text,
} from '@mantine/core';
import AdminLayout from '../../components/layout/admin.layout';
import React, { useEffect, useState } from 'react';
import { Download, Plus, Ticket } from 'tabler-icons-react';
import NewBookingRequestComponent from '../../components/booking-room/new-booking-request.component';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRoomBookings } from '../../redux/features/room-booking/thunk/fetch-room-booking-list';
import { fetchRoomBookingById } from '../../redux/features/room-booking/thunk/fetch-room-booking-by-id';
import TableHeader from '../../components/actions/table-header.component';
import { TableBody } from '../../components/booking-room/table-body.component';
import TableFooter from '../../components/actions/table-footer.component';
import NoDataFound from '../../components/no-data-found';
import { BookingRequestParams } from '../../models/pagination-params/booking-room-params.model';
import CancelRequestModal from '../../components/booking-room/cancel-request.component';
import { useBooleanToggle, useDebouncedValue } from '@mantine/hooks';
import Header from '../../components/common/header.component';
import RequestInfoModal from '../../components/booking-room/info-modal.component';
import SendBookingModal from './option-booking-modal.component';
import AcceptRequestModal from './accept-request-modal.component';
import RejectRequestModal from './reject-request.component';
import CheckinRequestModal from './checkin-request.component';
import CheckoutRequestModal from './checkout-request.component';

const defaultPagination = {
  limit: 5,
  page: 1,
  search: '',
  reasonType: '',
  checkInAt: '',
  checkOutAt: '',
  sort: 'requested_at',
  dir: 'DESC',
  status: '',
};

const BookingRoom = () => {
  const { classes } = useStyles();
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isCancelShown, setCancelShown] = useState<boolean>(false);
  const [isRejectShown, setRejectShown] = useState<boolean>(false);
  const [isAcceptShown, setAcceptShown] = useState<boolean>(false);
  const [isCheckinShown, setCheckinShown] = useState<boolean>(false);
  const [isCheckoutShown, setCheckoutShown] = useState<boolean>(false);
  //   const roomBooking = useAppSelector((state) => state.roomBooking.roomBooking);

  const roomBookingList = useAppSelector(
    (state) => state.roomBooking.roomBookings
  );

  const [pagination, setPagination] =
    useState<BookingRequestParams>(defaultPagination);
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

  const toggleSortDirection = (label) => {
    setPagination({
      ...pagination,
      sort: label,
      dir: pagination.dir === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  const handleSearchValue = (val: string) => {
    setPagination({
      ...pagination,
      search: val,
    });
  };

  const handleChangeStatus = (val: string) => {
    setPagination({
      ...pagination,
      status: val,
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
      handleFetchById(id)
        .unwrap()
        .then(() => setInfoShown(!isInfoShown));
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

  const ActionsFilterLeft: React.FC = () => {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <Button
            variant="outline"
            color="blue"
            onClick={() => handleChangeStatus('PENDING')}
            style={{ marginRight: 10 }}
            size="xs"
          >
            Pending
          </Button>
          <Button
            variant="outline"
            color="green"
            onClick={() => handleChangeStatus('BOOKED')}
            style={{ marginRight: 10 }}
            size="xs"
          >
            Booked
          </Button>
          <Button
            variant="outline"
            color="orange"
            onClick={() => handleChangeStatus('CHECKED_IN')}
            style={{ marginRight: 10 }}
            size="xs"
          >
            Checked in
          </Button>
          <Button
            variant="outline"
            color="violet"
            onClick={() => handleChangeStatus('CHECKED_OUT')}
            style={{ marginRight: 10 }}
            size="xs"
          >
            Checked out
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => handleChangeStatus('CANCELLED')}
            style={{ marginRight: 10 }}
            size="xs"
          >
            Cancelled
          </Button>
        </div>
      </>
    );
  };

  return (
    <AdminLayout>
      <Header title="Room Booking" icon={<Ticket size={50} />} />

      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        actionsLeft={<ActionsFilterLeft />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
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
          <RequestInfoModal
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
            toggleCancelModalShown={() => setCancelShown(!isCancelShown)}
            toggleRejectModalShown={() => setRejectShown(!isRejectShown)}
            toggleAcceptModalShown={() => setAcceptShown(!isAcceptShown)}
            toggleCheckinModalShown={() => setCheckinShown(!isCheckinShown)}
            toggleCheckoutModalShown={() => setCheckoutShown(!isCheckoutShown)}
          />
          <RejectRequestModal
            isShown={isRejectShown}
            toggleShown={() => setRejectShown(!isRejectShown)}
            toggleInforModalShown={() => setInfoShown(!isInfoShown)}
            pagination={pagination}
          />
          <CancelRequestModal
            isShown={isCancelShown}
            toggleShown={() => setCancelShown(!isCancelShown)}
            toggleInforModalShown={() => setInfoShown(!isInfoShown)}
            pagination={pagination}
          />
          <AcceptRequestModal
            isShown={isAcceptShown}
            toggleShown={() => setAcceptShown(!isAcceptShown)}
            toggleInforModalShown={() => setInfoShown(!isInfoShown)}
            pagination={pagination}
          />
          <CheckinRequestModal
            isShown={isCheckinShown}
            toggleShown={() => setCheckinShown(!isCheckinShown)}
            toggleInforModalShown={() => setInfoShown(!isInfoShown)}
            pagination={pagination}
          />
          <CheckoutRequestModal
            isShown={isCheckoutShown}
            toggleShown={() => setCheckoutShown(!isCheckoutShown)}
            toggleInforModalShown={() => setInfoShown(!isInfoShown)}
            pagination={pagination}
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

      <SendBookingModal
        toggleShown={() => setAddShown(!isAddShown)}
        isShown={isAddShown}
        pagination={pagination}
      />
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
