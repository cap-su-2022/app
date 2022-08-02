import React, { useEffect, useState } from 'react';
import { Button, createStyles } from '@mantine/core';
import AdminLayout from '../../components/layout/admin.layout';
import Header from '../../components/common/header.component';
import {
  ArchiveOff,
  BuildingWarehouse,
  Check,
  Plus,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  defaultPaginationParams,
  PaginationParams,
} from '../../models/pagination-params.model';
import { useDebouncedValue } from '@mantine/hooks';
import TableHeader from '../../components/actions/table-header.component';
import { TableBody } from './table-body.component';
import TableFooter from '../../components/actions/table-footer.component';
import * as Yup from 'yup';
import AddModal from './add-modal.component';
import { FormikValues, useFormik } from 'formik';
import { InputAddProps } from '../../components/actions/models/input-add-props.model';
import { InputTypes } from '../../components/actions/models/input-type.constant';
import InfoModal from '../../components/actions/modal/info-modal.component';
import RestoreDeletedModal from './restore-deleted.modal.component';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { fetchAllSlots } from '../../redux/features/slot';
import { fetchSlotById } from '../../redux/features/slot/thunk/fetch-by-id.thunk';
import { addSlot } from '../../redux/features/slot/thunk/add.thunk';
import DeleteModal from './delete-modal.component';
import NoDataFound from '../no-data-found';

const AddSlotValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Minimum device type name is 1 character')
    .max(100, 'Maximum device type name is 100 characters.')
    .required('Device type name is required'),
  // description: Yup.string().max(
  //   500,
  //   'Maximum Device type description is 500 characters'
  // ),
});

const ManageSlot: React.FC<any> = () => {
  const styles = useStyles();
  const slot = useAppSelector((state) => state.slot.slot);
  const slots = useAppSelector((state) => state.slot.slots);

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
          <ArchiveOff />
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
      label: 'Time start',
      id: 'timeStart',
      name: 'timeStart',
      value: slot.timeStart,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },

    {
      label: 'Create at',
      id: 'createAt',
      name: 'createAt',
      value: dayjs(slot.createdAt).format('HH:mm DD/MM/YYYY'),
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Time end',
      id: 'timeEnd',
      name: 'timeEnd',
      value: slot.timeEnd,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
    {
      label: 'Create By',
      id: 'createBy',
      name: 'createBy',
      value: slot.createdBy,
      readOnly: true,
      inputtype: InputTypes.TextInput,
    },
  ];

  // const addFields: InputAddProps[] = [
  //   {
  //     label: 'Name',
  //     description:
  //       'Device type name must be unique between others (Max 100 char.)',
  //     id: 'name',
  //     name: 'name',
  //     required: true,
  //     inputtype: InputTypes.TextInput,
  //   },
  //   {
  //     label: 'Slot num',
  //     description: null,
  //     id: 'slotNum',
  //     name: 'slotNum',
  //     required: true,
  //     inputtype: InputTypes.TextInput,
  //   },
  //   {
  //     label: 'Time start',
  //     description: null,
  //     id: 'timeStart',
  //     name: 'timeStart',
  //     required: true,
  //     inputtype: InputTypes.TimeInput,
  //   },
  //   {
  //     label: 'Time end',
  //     description: null,
  //     id: 'timeEnd',
  //     name: 'timeEnd',
  //     required: true,
  //     inputtype: InputTypes.TimeInput,
  //   },
  //   {
  //     label: 'Description',
  //     description:
  //       'Device type description describe additional information (Max 500 char.)',
  //     id: 'description',
  //     name: 'description',
  //     required: false,
  //     inputtype: InputTypes.TextArea,
  //   },
  // ];

  const handleAddModalClose = () => {
    setAddShown(!isAddShown);
    // addFormik.resetForm();
  };
  // const handleAddSubmit = (values: FormikValues) => {
  //   dispatch(
  //     addSlot({
  //       name: values.name,
  //       slotNum: values.slotNum,
  //       description: values.description,
  //     })
  //   )
  //     .unwrap()
  //     .then(() =>
  //       dispatch(fetchAllSlots(pagination)).finally(() => addFormik.resetForm())
  //     )
  //     .then(() =>
  //       showNotification({
  //         id: 'Add-slot',
  //         color: 'teal',
  //         title: 'Slot was added',
  //         message: 'Slot was successfully added',
  //         icon: <Check />,
  //         autoClose: 3000,
  //       })
  //     )
  //     .then((e) => handleAddModalClose())
  //     .catch((e) => {
  //       showNotification({
  //         id: 'Add-slot',
  //         color: 'red',
  //         title: 'Error while add slot',
  //         message: `${e.message}`,
  //         icon: <X />,
  //         autoClose: 3000,
  //       });
  //     });
  // };

  // const addFormik = useFormik({
  //   validationSchema: AddSlotValidation,
  //   initialValues: {
  //     name: '',
  //     slotNum: 0,
  //     description: '',
  //   },
  //   enableReinitialize: true,
  //   onSubmit: (e) => handleAddSubmit(e),
  // });

  return (
    <AdminLayout>
      <Header title="Slot" icon={<BuildingWarehouse size={50} />} />
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
      />
      {slots.items ? (
        <>
          <TableBody
            actionButtonCb={handleActionsCb}
            toggleSortDirection={() => toggleSortDirection()}
            data={slots.items}
            page={pagination.page}
            itemsPerPage={pagination.limit}
          />
          <InfoModal
            header="Slot Information"
            fields={infoFields}
            toggleShown={() => setInfoShown(!isInfoShown)}
            // toggleDisableModalShown={() => setDisableShown(!isDisableShown)}
            isShown={isInfoShown}
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

const useStyles = createStyles((theme) => {
  return {
    container: {},
  };
});

export default ManageSlot;
