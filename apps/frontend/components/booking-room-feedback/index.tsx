import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {PaginationParams} from "../../models/pagination-params.model";
import {useDebouncedValue} from "@mantine/hooks";
import {ArchiveOff, BuildingWarehouse, Check, Download, Plus, X} from "tabler-icons-react";
import AdminLayout from "../layout/admin.layout";
import Header from "../common/header.component";
import TableHeader from "../actions/table-header.component";
import {TableBody} from './table-body.component';
import InfoModal from "./info-modal.component";
import NoDataFound from "../no-data-found";
import TableFooter from "../actions/table-footer.component";
import {
  fetchBookingRoomFeedbacks
} from "../../redux/features/booking-room-feedback/thunk/fetch-booking-room-feedbacks.thunk";
import {
  fetchBookingRoomFeedbackById
} from "../../redux/features/booking-room-feedback/thunk/fetch-booking-room-feedback-by-id.thunk";
import {Button, createStyles} from "@mantine/core";


const defaultPaginationParams = {
  page: 1,
  limit: 5,
  search: '',
  dir: 'DESC',
  sort: 'createdAt',
};


const ManageBookingRoomFeedback: React.FC<any> = () => {
  const styles = useStyles();
  const bookingRoomFeedbacks = useAppSelector((state) => state.bookingRoomFeedback.bookingRoomFeedbacks);
  const [isDownShown, setDownShown] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );
  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);
  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);


  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookingRoomFeedbacks(pagination));
  }, [
    pagination.page,
    pagination.limit,
    pagination.dir,
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
      ...defaultPaginationParams,
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
    setPagination(defaultPaginationParams);
  };

  const handleFetchById = (idVal) => {
    return dispatch(fetchBookingRoomFeedbackById(idVal));
  };

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);

  const handleActionsCb = {
    info: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setInfoShown(!isInfoShown));
    },

  };


  const ActionsFilter: React.FC = () => {

    return (
      <>
        <Button
          variant="outline"
          color="violet"
          onClick={() => setDownShown(true)}
        >
          <Download/>
        </Button>
      </>
    );
  }


  return (
    <AdminLayout>
      <Header title="Booking Room Feedback" icon={<BuildingWarehouse size={50}/>}/>
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        search={pagination.search}
        actions={<ActionsFilter/>}
        setSearch={(val) => handleSearchValue(val)}
        actionsLeft={null}
      />

      {bookingRoomFeedbacks?.items ? (

        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={bookingRoomFeedbacks.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Booking Room Feedback Information"
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
          />
        </>
      ) : <NoDataFound/>}

      {bookingRoomFeedbacks?.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={bookingRoomFeedbacks.meta}
        />
      ) : null}
    </AdminLayout>
  );
};
const useStyles = createStyles((theme) => {
  return {
    container: {},
  };
});

export default ManageBookingRoomFeedback;
