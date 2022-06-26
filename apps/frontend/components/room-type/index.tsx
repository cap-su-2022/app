import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import AdminLayout from '../AdminLayout';
import Header from '../common/header.component';
import { BuildingWarehouse, InfoCircle } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRoomTypes } from '../../redux/features/room-type';
import { PaginationParams } from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import InfoModal from './actions/info-modal.component';
import { TableBody } from "../actions/table-body.component";
import TableFooter from "../actions/table-footer.component";
import TableHeader from "../actions/table-header.component";

const defaultPagination = {
  dir: 'ASC',
  search: '',
  sort: 'name',
  limit: 5,
  page: 1,
};

const ManageRoomType: React.FC<any> = () => {
  const styles = useStyles();
  const roomTypes = useAppSelector((state) => state.roomType.roomTypes);
  const [pagination, setPagination] =
    useState<PaginationParams>(defaultPagination);

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(pagination.dir);
    dispatch(fetchRoomTypes(pagination));
  }, [pagination.page, pagination.limit, pagination.dir, pagination.sort, debounceSearchValue, pagination, dispatch]);

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

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);

  const ActionsFilter: React.FC = () => {
    return (
      <Button color="primary">
        <InfoCircle />
      </Button>
    );
  };

  const handleActionsCb = {
    info: (id) => {
      setId(id);
      setInfoShown(!isInfoShown);
    },
  };

  return (
    <AdminLayout>
      <Header title="Room Type" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />
      {roomTypes.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={roomTypes.items}
          />
          <InfoModal
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}
            id={id}
          />
        </>
      ) : null}
      {roomTypes.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={roomTypes.meta}
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

export default ManageRoomType;
