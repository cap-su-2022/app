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
import { Check, RotateClockwise, X } from 'tabler-icons-react';
import { PaginationParams } from '../../models/pagination-params.model';
import dayjs from 'dayjs';
import { fetchDeletedBookingReasons, fetchBookingReasons, restoreDeletedBookingReasonById } from '../../redux/features/booking-reason';
import { showNotification } from '@mantine/notifications';

interface RestoreDeletedModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PaginationParams;
}

const RestoreDeletedModal: React.FC<RestoreDeletedModalProps> = (
  props
) => {
  const { classes, cx } = useStyles();
  const deletedBookingReasons = useAppSelector((state) => state.bookingReason.deletedBookingReasons);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    dispatch(fetchDeletedBookingReasons());
  }, []);

  const handleRestoreDeletedRoomType = (id: string) => {
    dispatch(restoreDeletedBookingReasonById(id))
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'restore-data',
          color: 'red',
          title: 'Error while restore reason',
          message: e.message ?? 'Failed to restore reason',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'restore-data',
          color: 'teal',
          title: 'Reason was restored',
          message: 'Reason was successfully restored',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        dispatch(fetchDeletedBookingReasons());
        dispatch(fetchBookingReasons(props.pagination));
      })
  };
  const rows = deletedBookingReasons?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{  dayjs(row.deletedAt).format('HH:mm DD/MM/YYYY')}</td>
      <td>{row.deletedBy}</td>
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
        Restore Deleted Room Type
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
        <Table>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Deleted At</th>
              <th>Deleted By</th>
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
