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
import { Ban, Check, RotateClockwise, X } from 'tabler-icons-react';
import {
  fetchRoles,
  fetchDeletedRoles,
  restoreDeletedRoleById,
} from '../../redux/features/role';
import { PaginationParams } from '../../models/pagination-params.model';
import dayjs from 'dayjs';
import PermanentDeleteModal from '../actions/modal/permanant-delete-modal.component';
import { showNotification } from '@mantine/notifications';
import { permanentlyDeleteRoleById } from '../../redux/features/role/thunk/permanently-delete-role-by-id.thunk';
import NoDataFound from '../no-data-found';

interface RestoreDeletedModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PaginationParams;
}

const RestoreDeletedModal: React.FC<RestoreDeletedModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const deletedRoles = useAppSelector((state) => state.role.deletedRoles);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [isPermanentDeleteShown, setPermanentDeleteShown] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(fetchDeletedRoles());
  }, []);

  const handelPermanetDeleteButton = (id) => {
    setId(id);
    setPermanentDeleteShown(true);
  };

  const handelPermanetDeleteButtonOut = () => {
    setId('');
    setPermanentDeleteShown(false);
  };

  const handlePermanentDeleted = (id: string) => {
    dispatch(permanentlyDeleteRoleById(id))
      .unwrap()
      .then(() => dispatch(fetchDeletedRoles()))
      .then(() =>
        showNotification({
          id: 'delete-booking-reason',
          color: 'teal',
          title: 'Reason was permanent deleted',
          message: 'Reason was successfully permanent deleted',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .catch((e) => {
        showNotification({
          id: 'delete-booking-reason',
          color: 'red',
          title: 'Error while permanent deleted reason',
          message: `${e.message}`,
          icon: <X />,
          autoClose: 3000,
        });
      });
    setPermanentDeleteShown(false);
  };

  const handleRestoreDeletedRole = (id: string) => {
    dispatch(restoreDeletedRoleById(id))
      .unwrap()
      .then(() => dispatch(fetchDeletedRoles()))
      .then(() => dispatch(fetchRoles(props.pagination)));
  };
  const rows = deletedRoles?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{dayjs(row.deletedAt).format('HH:mm DD/MM/YYYY')}</td>
      <td>{row.deletedBy}</td>
      <td
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={() => handleRestoreDeletedRole(row.id)}
          style={{
            margin: 5,
          }}
          variant="outline"
          color="green"
          leftIcon={<RotateClockwise />}
        >
          Restore
        </Button>

        <Button
          onClick={() => handelPermanetDeleteButton(row.id)}
          style={{
            margin: 5,
          }}
          variant="outline"
          color="red"
          leftIcon={<Ban />}
        >
          Permanat Delete
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
    <>
      <Modal
        opened={props.isShown}
        onClose={() => props.toggleShown()}
        centered
        size="85%"
        title={<ModalHeaderTitle />}
        closeOnClickOutside={true}
        closeOnEscape={false}
      >
        {deletedRoles.length > 0 ? (
          <>
            <ScrollArea
              sx={{ height: 500 }}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table sx={{ minWidth: 700 }}>
                <thead
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
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
          </>
        ) : (
          <NoDataFound />
        )}
      </Modal>
      <PermanentDeleteModal
        handleSubmit={() => handlePermanentDeleted(id)}
        isShown={isPermanentDeleteShown}
        toggleShown={() => handelPermanetDeleteButtonOut()}
      />
    </>
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
