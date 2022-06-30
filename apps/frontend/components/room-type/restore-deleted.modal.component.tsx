import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Modal,
  Text,
  Button,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RotateClockwise } from 'tabler-icons-react';
import { fetchRoomTypes } from '../../redux/features/room-type';
import { fetchDeletedRoomTypes } from '../../redux/features/room-type';
import { restoreDeletedRoomTypeById } from '../../redux/features/room-type';
import { RoomParams } from '../../models/pagination-params/room-params.model';
import dayjs from 'dayjs';

interface RestoreDeletedModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: RoomParams;
}

const RestoreDeletedModal: React.FC<RestoreDeletedModalProps> = (
  props
) => {
  const { classes, cx } = useStyles();
  const deletedRoomTypes = useAppSelector((state) => state.roomType.deletedRoomTypes);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    dispatch(fetchDeletedRoomTypes());
  }, []);

  const handleRestoreDeletedRoomType = (id: string) => {
    dispatch(restoreDeletedRoomTypeById(id))
      .unwrap()
      .then(() => dispatch(fetchDeletedRoomTypes()))
      .then(() => dispatch(fetchRoomTypes(props.pagination)));
  };
  const rows = deletedRoomTypes?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={() => handleRestoreDeletedRoomType(row.id)}
          style={{
            margin: 5,
          }}
          variant="outline"
          color="green"
          leftIcon={<RotateClockwise />}
        >
          Restore
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text
        style={{
          fontWeight: '600',
          fontSize: 22,
        }}
      >
        Restore Deleted Rooms
      </Text>
    );
  };

  return (
    <Modal
      opened={props.isShown}
      onClose={() => props.toggleShown()}
      centered
      size="85%"
      title={<ModalHeaderTitle />}
      closeOnClickOutside={true}
      closeOnEscape={false}
    >
      <ScrollArea
        sx={{ height: 500 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default RestoreDeletedModal;
