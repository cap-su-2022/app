import React, { useState } from 'react';
import {createStyles, Table, ScrollArea, Modal, Text, Button} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {toggleRoomRestoreDisabledModalVisible} from "../../redux/features/room/room.slice";
import {RotateClockwise, Trash} from "tabler-icons-react";



interface TableScrollAreaProps {
  data: { name: string; email: string; company: string }[];
}

const preparedData: TableScrollAreaProps = {
  data: [
    {
      name: 'BangMaple',
      company: 'TPP',
      email: 'bangmaple@ggg'
    },
    {
      name: 'BangMaple',
      company: 'TPP',
      email: 'bangmaple@ggg'
    },
    {
      name: 'BangMaple',
      company: 'TPP',
      email: 'bangmaple@ggg'
    },
    {
      name: 'BangMaple',
      company: 'TPP',
      email: 'bangmaple@ggg'
    },
  ]
}

 function RestoreDisabledRoomModal() {
  const { classes, cx } = useStyles();

  const isShown = useAppSelector((state) => state.room.isRoomRestoreDisabledModalShown);
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);

  const dispatch = useAppDispatch();

  const [scrolled, setScrolled] = useState(false);

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
        <Button style={{
          margin: 5
        }} variant="outline" color="green" leftIcon={<RotateClockwise/>}>
          Activate
        </Button>
        <Button style={{
          margin: 5
        }} variant="outline" color="red" leftIcon={<Trash/>}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text style={{
        fontWeight: '600',
        fontSize: 22
      }}>Restore Disabled Rooms</Text>
    )
  };

  return (
    <Modal opened={isShown}
           onClose={() => dispatch(toggleRoomRestoreDisabledModalVisible())}
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

export default RestoreDisabledRoomModal;
