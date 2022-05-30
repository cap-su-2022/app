import React, { useState } from 'react';
import {createStyles, Table, ScrollArea, Modal, Text, Button} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RotateClockwise, Trash} from "tabler-icons-react";
import {restoreDisabledRoom} from "../../redux/features/room/thunk/restore-disabled.thunk";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import {fetchDisabledRooms} from "../../redux/features/room/thunk/fetch-disabled-rooms";
import {deleteRoomById} from "../../redux/features/room/thunk/delete-room-by-id";

interface RestoreDisabledRoomModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const RestoreDisabledRoomModal: React.FC<RestoreDisabledRoomModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);

  const handleActiveRoom = (id: string) => {
    dispatch(restoreDisabledRoom(id)).unwrap()
      .then(() => dispatch(fetchDisabledRooms()))
      .then(() => dispatch(fetchRooms()));
  }

  const handleDeleteRoom = (id: string) => {
    dispatch(deleteRoomById(id)).unwrap()
      .then(() => fetchDisabledRooms())
      .then(() => fetchRooms());
  }

  const rows = disabledRooms?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.updatedAt}</td>
      <td style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Button onClick={() => handleActiveRoom(row.id)} style={{
          margin: 5
        }} variant="outline" color="green" leftIcon={<RotateClockwise/>}>
          Activate
        </Button>
        <Button onClick={() => handleDeleteRoom(row.id)} style={{
          margin: 5
        }} variant="outline" color="red" leftIcon={<Trash/>}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Restore Disabled Rooms</Text>
    )
  };

  return (
    <Modal opened={props.isShown}
           onClose={() => props.toggleShown()}
           centered
           size="85%"
    title={<ModalHeaderTitle/>}
    closeOnClickOutside={false}
    closeOnEscape={false}>
      <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table sx={{ minWidth: 700 }}>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Name</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
}

const useStyles = createStyles((theme) => ({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default RestoreDisabledRoomModal;
