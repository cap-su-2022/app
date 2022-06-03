import React, { useState } from 'react';
import {createStyles, Table, ScrollArea, Modal, Text, Button} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RotateClockwise} from "tabler-icons-react";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import {fetchDeletedRooms} from "../../redux/features/room/thunk/fetch-deleted-rooms";
import {restoreDeletedRoom} from "../../redux/features/room/thunk/restore-deleted.thunk";

interface RestoreDeletedModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const RestoreDeletedModal: React.FC<RestoreDeletedModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const deletedRooms = useAppSelector((state) => state.room.deletedRooms);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);

  const handleRestoreDeletedRoom = (id: string) => {
    dispatch(restoreDeletedRoom(id)).unwrap()
      .then(() => dispatch(fetchDeletedRooms()))
      .then(() => dispatch(fetchRooms()));
  }
  const rows = deletedRooms?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{new Date(row.updatedAt).toLocaleDateString() + ' ' + new Date(row.updatedAt).toLocaleTimeString()}</td>
      <td style={{
        display: 'flex',
        flexDirection: 'column',

      }}>
        <Button onClick={() => handleRestoreDeletedRoom(row.id)} style={{
          margin: 5
        }} variant="outline" color="green" leftIcon={<RotateClockwise/>}>
          Restore
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text style={{
        fontWeight: '600',
        fontSize: 22
      }}>Restore Deleted Rooms</Text>
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

export default RestoreDeletedModal;