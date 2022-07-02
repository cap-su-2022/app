import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  Select,
  Table,
  Text,
} from '@mantine/core';
import {
  Check,
  InfoCircle,
  Pencil,
  ScanEye,
  Trash,
  X,
} from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchDeletedRoles,
  deleteRoleById,
  fetchRoles,
} from '../../redux/features/role';
import { PaginationParams } from '../../models/pagination-params.model';
import Th from '../../components/table/th.table.component';
// import { fetchRoomsByRoomType } from '../../redux/features/room/thunk/fetch-rooms-by-room-type';
// import { updateRoomById } from '../../redux/features/room/thunk/update-room-by-id';
import { showNotification } from '@mantine/notifications';

interface DeleteModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PaginationParams;
  // Roles: any[];
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedRoleId = useAppSelector(
    (state) => state.role.role.id
  );
  const [role, setRole] = useState<string>('');
  const [isShownListRoom, setShownListRoom] = useState(false);

  const [listAccount, setListAccount] = useState([]);

  const dispatch = useAppDispatch();

  const handleDeleteRoom = () => {
    dispatch(deleteRoleById(selectedRoleId))
      .catch((e) =>
        showNotification({
          id: 'delete-data',
          color: 'red',
          title: 'Error while delete role',
          message: e.message ?? 'Failed to delete role',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'delete-data',
          color: 'teal',
          title: 'Role was deleted',
          message: 'Role was successfully deleted',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        dispatch(fetchRoles(props.pagination));
        dispatch(fetchDeletedRoles());
      });
  };

  // useEffect(() => {
  //   if (selectedRoomTypeId) {
  //     dispatch(fetchRoomsByRoomType(selectedRoomTypeId))
  //       .unwrap()
  //       .then((response) => setListRoom(response));
  //   }
  // }, [dispatch, selectedRoomTypeId]);

  useEffect(() => {
    if (!props.isShown) {
      setShownListRoom(false);
    }
  }, [props.isShown]);

  // useEffect(() => {
  //   if (!isShownListRoom) {
  //     setRoomType('');
  //   }
  // }, [isShownListRoom]);
  
  // const handleUpdateType = (room, roomTypeId: string) => {
  //   dispatch(
  //     updateRoomById({
  //       id: room.id,
  //       payload: {
  //         ...room,
  //         type: roomTypeId,
  //       },
  //     })
  //   )
  //     .unwrap()
  //     .catch((e) =>
  //       showNotification({
  //         id: 'load-data',
  //         color: 'red',
  //         title: 'Error while updating library room',
  //         message: e.message ?? 'Failed to update library room',
  //         icon: <X />,
  //         autoClose: 3000,
  //       })
  //     )
  //     .then(() =>
  //       showNotification({
  //         id: 'load-data',
  //         color: 'teal',
  //         title: 'Library room was updated',
  //         message: 'Library room was successfully updated',
  //         icon: <Check />,
  //         autoClose: 3000,
  //       })
  //     )
  //     // .then(() => props.toggleShown())
  //     .then(() =>
  //       dispatch(fetchRoomsByRoomType(selectedRoomTypeId))
  //         .unwrap()
  //         .then((response) => setListRoom(response))
  //     );
  // };

  // const ListRoomByRoomType = () => {
  //   const rows =
  //     listRoom && listRoom.length > 0
  //       ? listRoom.map((row, index) => (
  //           <tr key={row.id}>
  //             <td>{index + 1}</td>
  //             <td>{row.name}</td>
  //             <td>
  //               <Select
  //                 name="type"
  //                 id="room-type"
  //                 onChange={(e) => setRoomType(e)}
  //                 searchable
  //                 value={roomType || row.type}
  //                 data={props.roomTypes}
  //                 required
  //               />
  //             </td>
  //             <td className={classes.actionButtonContainer}>
  //               <Button
  //                 variant="outline"
  //                 color="green"
  //                 disabled={
  //                   roomType === row.type || roomType === '' ? true : false
  //                 }
  //                 onClick={() => handleUpdateType(row, roomType)}
  //               >
  //                 Save
  //               </Button>
  //             </td>
  //           </tr>
  //         ))
  //       : null;
  //   return listRoom && listRoom.length > 0 ? (
  //     <Table
  //       horizontalSpacing="md"
  //       verticalSpacing="xs"
  //       sx={{ tableLayout: 'fixed' }}
  //     >
  //       <thead>
  //         <tr>
  //           <Th
  //             style={{
  //               width: '60px',
  //             }}
  //             sorted={null}
  //             reversed={null}
  //             onSort={null}
  //           >
  //             STT
  //           </Th>

  //           <Th sorted={null} reversed={null} onSort={null}>
  //             Name
  //           </Th>

  //           <Th sorted={null} reversed={null} onSort={null}>
  //             Type
  //           </Th>

  //           <Th
  //             style={{
  //               width: '100px',
  //             }}
  //             sorted={null}
  //             reversed={null}
  //             onSort={null}
  //           >
  //             Actions
  //           </Th>
  //         </tr>
  //       </thead>
  //       <tbody>{rows}</tbody>
  //     </Table>
  //   ) : (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         padding: '20px 0px',
  //       }}
  //     >
  //       <h1>Dont have any room with this type</h1>
  //     </div>
  //   );
  // };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Are you sure?</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={true}
      centered
      zIndex={100}
      title={<ModalHeaderTitle />}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
      size={isShownListRoom && listAccount.length > 0 ? '70%' : null}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Deleting this room type will{' '}
          <b>also delete rooms of this room type</b>. And make that rooms
          unusable even if it has been booked before. Users who booked this room
          will receive a notification about this and that associated booking
          will also be cancelled!
        </Text>
        <div className={classes.modalFooter}>
          {listAccount.length > 0 ? (
            <Button
              leftIcon={<ScanEye />}
              style={{ backgroundColor: 'blue', width: '60%', margin: 10 }}
              onClick={() => setShownListRoom(!isShownListRoom)}
            >
              List room with this type
            </Button>
          ) : null}

          <Button
            color="red"
            leftIcon={<Trash />}
            onClick={() => handleDeleteRoom()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Delete this type
          </Button>
          <Button
            onClick={() => props.toggleShown()}
            leftIcon={<X />}
            style={{
              backgroundColor: FPT_ORANGE_COLOR,
              width: '60%',
              margin: 10,
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      {/* {isShownListRoom && listAccount.length > 0 ? <ListRoomByRoomType /> : null} */}
    </Modal>
  );
};

const useStyles = createStyles({
  modalTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
  modalContainer: {
    margin: 10,
  },
  modalBody: {
    margin: 10,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DeleteModal;
