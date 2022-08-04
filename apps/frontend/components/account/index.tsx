import {GetServerSideProps} from 'next';
import AdminLayout from '../layout/admin.layout';
import {Button, createStyles, ScrollArea, Table} from '@mantine/core';
import {
  ArchiveOff,
  BuildingWarehouse,
  Download,
  PencilOff,
  Plus,
} from 'tabler-icons-react';
import React, {useEffect, useReducer, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useDebouncedValue} from '@mantine/hooks';
import {getRoomById} from '../../redux/features/room/thunk/get-room-by-id';
import NoDataFound from '../no-data-found';
import TableHeader from '../actions/table-header.component';
import {TableBody} from './table-body.component';
import TableFooter from '../actions/table-footer.component';
import DisableModal from './disable-modal.component';
import DeleteRoomModal from '../rooms/delete-modal.component';
import AddRoomModal from '../rooms/add-modal.component';
import DownloadModal from '../rooms/download-modal.compnent';
import RestoreDisabledRoomModal from '../rooms/restore-disabled.modal.component';
import RestoreDeletedRoomModal from '../rooms/restore-deleted.modal.component';
import {PagingParams} from '../../models/pagination-params/paging-params.model';
import {FormikValues, useFormik} from 'formik';
import Header from '../common/header.component';
import {fetchRoleNames} from '../../redux/features/role';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {RoomType} from '../../models/room-type.model';
import {PaginationResponse} from '../../models/pagination-response.payload';
import {fetchAccounts} from '../../redux/features/account/thunk/fetch-accounts.thunk';
import InfoModal from './info-modal.component';
import {fetchAccountById} from '../../redux/features/account/thunk/fetch-by-id.thunk';
import RestoreDisabledModal from './restore-disabled.modal.component';
import AccountUpdateModal from './update-modal.component';
import {updateAccountById} from '../../redux/features/account/thunk/update-account-by-id';
import AddAccountModal from './add-modal.component';
import RestoreDeletedModal from './restore-deleted.modal.component';
import DeleteModal from './delete-modal.component';


const UpdateAccountValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum name is 1 character')
    .max(100, 'Maximum name is 100 characters.')
    .required('Name is required'),
  description: Yup.string().max(500, 'Maximum description is 500 characters'),
});

const defaultPagination = {
  limit: 5,
  page: 1,
  name: '',
  search: '',
  type: '',
  sort: 'fullname',
  dir: 'ASC',
};

function AccountsManagement(props: any) {
  const {classes} = useStyles();
  const accounts = useAppSelector((state) => state.account.accounts);
  const [roleNames, setRoleNames] = useState([]);
  const [pagination, setPagination] = useState<PagingParams>(defaultPagination);
  const [debounceSearchValue] = useDebouncedValue(pagination.name, 400);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccounts(pagination));
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
    dispatch(fetchRoleNames())
      .unwrap()
      .then((roleName) => setRoleNames(roleName));
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
    return dispatch(fetchAccountById(idVal));
  };

  const [id, setId] = useState<string>('id');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isUpdateShown, setUpdateShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);
  const [isDisableShown, setDisableShown] = useState<boolean>(false);
  const [isRestoreDisabledShown, setRestoreDisabledShown] =
    useState<boolean>(false);
  const account = useAppSelector((state) => state.account.account);

  const ActionsFilter: React.FC = () => {
    return (
      <>
        <Button
          leftIcon={<Plus/>}
          color="green"
          onClick={() => setAddShown(true)}
          style={{marginRight: 10}}
        >
          Add
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDisabledShown(true)}
          style={{marginRight: 10}}
        >
          <PencilOff color={'red'}/>
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDeletedShown(true)}
          style={{marginRight: 10}}
        >
          <ArchiveOff/>
        </Button>
        <Button variant="outline" color="violet">
          <Download/>
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

  const handleUpdateSubmit = (values: FormikValues) => {
    dispatch(
      updateAccountById({
        id: values.id,
        payload: values.payload,
      })
    )
      .unwrap()
      .then((e) => handleUpdateModalClose());
  };

  const updateFormik = useFormik({
    validationSchema: UpdateAccountValidation,
    initialValues: {
      id: account.id,
      name: account.username,
      description: account.description,
    },
    enableReinitialize: true,
    onSubmit: (e) => handleUpdateSubmit(e),
  });

  const handleUpdateModalClose = () => {
    setUpdateShown(!isUpdateShown);
    updateFormik.resetForm();
  };

  return (
    <>
      <AdminLayout>
        <Header
          title="Accounts Management"
          icon={<BuildingWarehouse size={50}/>}
        />
        <TableHeader
          actionsLeft={null}
          handleResetFilter={() => handleResetFilter()}
          actions={<ActionsFilter/>}
          setSearch={(val) => handleSearchValue(val)}
          search={pagination.search}
        />

        <RestoreDisabledModal
          isShown={isRestoreDisabledShown}
          toggleShown={() => setRestoreDisabledShown(!isRestoreDisabledShown)}
          pagination={pagination}
        />
        <RestoreDeletedModal
          isShown={isRestoreDeletedShown}
          toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
          pagination={pagination}
        />

        {accounts?.items ? (
          <>
            <TableBody
              actionButtonCb={handleActionsCb}
              toggleSortDirection={() => toggleSortDirection()}
              data={accounts.items}
              page={pagination.page}
              itemsPerPage={pagination.limit}
              search={pagination.search}
            />
            <InfoModal
              // header="Room Information"
              // fields={infoFields}
              toggleShown={() => setInfoShown(!isInfoShown)}
              isShown={isInfoShown}
              toggleDisableModalShown={() => setDisableShown(!isDisableShown)}
            />
            <DisableModal
              isShown={isDisableShown}
              toggleShown={() => setDisableShown(!isDisableShown)}
              toggleInforModalShown={() => setInfoShown(!isInfoShown)}
              pagination={pagination}
            />

            <DeleteModal
              isShown={isDeleteShown}
              toggleShown={() => setDeleteShown(!isDeleteShown)}
              pagination={pagination}
            />
            <AccountUpdateModal
              formik={updateFormik}
              handleSubmit={() => updateFormik.handleSubmit()}
              isShown={isUpdateShown}
              toggleShown={() => setUpdateShown(!isUpdateShown)}
              pagination={pagination}
              role={roleNames}
            />
          </>
        ) : (
          <NoDataFound/>
        )}

        <AddAccountModal
          isShown={isAddShown}
          pagination={pagination}
          toggleShown={() => handleAddModalClose()}
          listRole={roleNames}
        />
        {accounts?.meta ? (
          <TableFooter
            handlePageChange={(val) => handlePageChange(val)}
            handleLimitChange={(val) => handleLimitChange(val)}
            metadata={accounts.meta}
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

export default AccountsManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assa: null,
    },
  };
};
