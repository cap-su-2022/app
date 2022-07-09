import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Modal,
  Text,
  Button,
  InputWrapper,
  TextInput,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RotateClockwise, Search } from 'tabler-icons-react';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';
import { restoreDeletedRoom } from '../../redux/features/room/thunk/restore-deleted.thunk';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import dayjs from 'dayjs';
import { useDebouncedValue } from '@mantine/hooks';
import NoDataFound from '../no-data-found';
import { fetchDeletedDevices } from '../../redux/features/devices/thunk/fetch-deleted.thunk';
import { restoreDeletedDevice } from '../../redux/features/devices/thunk/restore-deleted.thunk';
import { fetchDevices } from '../../redux/features/devices/thunk/fetch-devices.thunk';

interface RestoreDeletedDeviceModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const RestoreDeletedDeviceModal: React.FC<RestoreDeletedDeviceModalProps> = (
  props
) => {
  const { classes, cx } = useStyles();
  const deletedDevices = useAppSelector((state) => state.device.deletedDevices);
  console.log(deletedDevices)
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [searchDebounced] = useDebouncedValue<string>(search, 400);

  useEffect(() => {
    dispatch(fetchDeletedDevices(search));
  }, [searchDebounced]);

  const handleRestoreDeletedDevice = (id: string) => {
    dispatch(restoreDeletedDevice(id))
      .unwrap()
      .then(() => dispatch(fetchDeletedDevices('')))
      .then(() => dispatch(fetchDevices(props.pagination)));
  };
  const rows = deletedDevices?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{row.deviceTypeName}</td>
      <td>{dayjs(row.updatedAt).format('HH:mm DD/MM/YYYY')}</td>
      <td>{row.deletedBy}</td>
      <td
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={() => handleRestoreDeletedDevice(row.id)}
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
        Restore Deleted Devices
      </Text>
    );
  };

  return (
    <Modal
      opened={props.isShown}
      onClose={() => props.toggleShown()}
      centered
      size="70%"
      title={<ModalHeaderTitle />}
      closeOnClickOutside={true}
      closeOnEscape={false}
    >
      <InputWrapper label="Search">
        <TextInput
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search />}
        />
      </InputWrapper>
      {deletedDevices.length > 0 ? (
        <>
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
                  <th>Type</th>
                  <th>Delete At</th>
                  <th>Delete By</th>
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

export default RestoreDeletedDeviceModal;
