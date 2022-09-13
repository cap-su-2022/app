import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import AdminLayout from '../../components/layout/admin.layout';
import Header from '../../components/common/header.component';
import { BuildingWarehouse, Plus, TrashOff, X } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  defaultPaginationParams,
  PaginationParams,
} from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import TableHeader from '../../components/actions/table-header.component';
import { TableBody } from './table-body.component';
import TableFooter from '../../components/actions/table-footer.component';
import AddModal from './add-modal.component';
import { InputTypes } from '../../components/actions/models/input-type.constant';
import InfoModal from '../../components/actions/modal/info-modal.component';
import RestoreDeletedModal from './restore-deleted.modal.component';
import dayjs from 'dayjs';
import { fetchAllSlots } from '../../redux/features/slot';
import { fetchSlotById } from '../../redux/features/slot/thunk/fetch-by-id.thunk';
import DeleteModal from './delete-modal.component';
import NoDataFound from '../no-data-found';

// const AddSlotValidation = Yup.object().shape({
//   name: Yup.string()
//     .trim()
//     .min(1, 'Minimum device type name is 1 character')
//     .max(100, 'Maximum device type name is 100 characters.')
//     .required('Device type name is required'),
//   // description: Yup.string().max(
//   //   500,
//   //   'Maximum Device type description is 500 characters'
//   // ),
// });

const ManageSlot: React.FC<any> = () => {
  //BUGG
  //const slot = useAppSelector((state) => state.slot.slot);
  //const slots = useAppSelector((state) => state.slot.slots);

  const slot = {} as any;
  const slots =[] as any;

  const [pagination, setPagination] = useState<PaginationParams>(
    defaultPaginationParams
  );

  const [debounceSearchValue] = useDebouncedValue(pagination.search, 400);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllSlots(pagination));
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
    return dispatch(fetchSlotById(idVal));
  };

  const [id, setId] = useState<string>('');
  const [isInfoShown, setInfoShown] = useState<boolean>(false);
  const [isAddShown, setAddShown] = useState<boolean>(false);
  const [isDeleteShown, setDeleteShown] = useState<boolean>(false);
  const [isRestoreDeletedShown, setRestoreDeletedShown] =
    useState<boolean>(false);
  const [isShowListItems, setShowListItems] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [itemsOfData, setItemsOfData] = useState<any>([]);

  const ActionsFilter: React.FC = () => {
    return (
      <div>
        <Button
          leftIcon={<Plus />}
          color="green"
          onClick={() => setAddShown(!isAddShown)}
          style={{ marginRight: 10 }}
        >
          Add
        </Button>

        <Button
          variant="outline"
          color="red"
          onClick={() => setRestoreDeletedShown(true)}
        >
          <TrashOff />
        </Button>
      </div>
    );
  };

  const handleActionsCb = {
    info: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setInfoShown(!isInfoShown));
    },
    delete: (id) => {
      setId(id);
      handleFetchById(id)
        .unwrap()
        .then(() => setDeleteShown(!isDeleteShown));
    },
  };

  const infoFields = [
    {
      label: 'Id',
      id: 'id',
      name: 'id',
      value: slot.id,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      value: slot.name,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Description',
      id: 'description',
      name: 'description',
      value: slot.description,
      readOnly: true,
      inputtype: InputTypes.TextArea,
    },
    {
      label: 'Slot num',
      id: 'slotNum',
      name: 'slotNum',
      value: slot.slotNum + '',
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Time starts',
      id: 'timeStart',
      name: 'timeStart',
      value: slot.timeStart,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },

    {
      label: 'Created at',
      id: 'createAt',
      name: 'createAt',
      value: dayjs(slot.createdAt).format('HH:mm DD/MM/YYYY'),
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Time ends',
      id: 'timeEnd',
      name: 'timeEnd',
      value: slot.timeEnd,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Created By',
      id: 'createBy',
      name: 'createBy',
      value: slot.createdBy,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
  ];

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
  };

  return (
    <AdminLayout>
      <Header title="Slots Management" icon={<BuildingWarehouse size={50} />} />
      <TableHeader
        handleResetFilter={() => handleResetFilter()}
        actions={<ActionsFilter />}
        actionsLeft={null}
        setSearch={(val) => handleSearchValue(val)}
        search={pagination.search}
      />

      <RestoreDeletedModal
        isShown={isRestoreDeletedShown}
        toggleShown={() => setRestoreDeletedShown(!isRestoreDeletedShown)}
        pagination={pagination}
        search={pagination.search}
      />
      {slots.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={slots.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
            search={pagination.search}
          />
          <InfoModal
            header="Slot Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            isShown={isInfoShown}

            isShowListItems={null}
            itemsOfData={null}
            title={null}
            itemsOfDataButton={null}
          />

          <DeleteModal
            isShown={isDeleteShown}
            toggleShown={() => setDeleteShown(!isDeleteShown)}
            pagination={pagination}
            // slots={slots}
          />
        </>
      ) : (
        <NoDataFound />
      )}
      <AddModal
        // header="Add new slot"
        isShown={isAddShown}
        toggleShown={() => handleAddModalClose()}
        pagination={pagination}
      />
      {slots.meta ? (
        <TableFooter
          handlePageChange={(val) => handlePageChange(val)}
          handleLimitChange={(val) => handleLimitChange(val)}
          metadata={slots.meta}
        />
      ) : null}
    </AdminLayout>
  );
};


export default ManageSlot;
