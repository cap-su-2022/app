import React, {useEffect, useState} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Check, RotateClockwise, Search, Trash, X} from 'tabler-icons-react';
import dayjs from 'dayjs';
import {useDebouncedValue} from '@mantine/hooks';
import {PagingParams} from '../../models/pagination-params/paging-params.model';
import NoDataFound from '../no-data-found';
import {fetchDisabledAccounts} from '../../redux/features/account/thunk/fetch-disabled.thunk';
import {restoreDisabledAccount} from '../../redux/features/account/thunk/restore-disabled.thunk';
import {fetchAccounts} from '../../redux/features/account/thunk/fetch-accounts.thunk';
import {deleteAccountById} from '../../redux/features/account/thunk/delete-by-id';
import {fetchDeletedAccounts} from '../../redux/features/account/thunk/fetch-deleted.thunk';
import {showNotification} from "@mantine/notifications";

interface RestoreDisabledModalProps {
  isShown: boolean;

  toggleShown(): void;

  pagination: PagingParams;
}

const RestoreDisabledModal: React.FC<RestoreDisabledModalProps> = (
  props
) => {
  const {classes, cx} = useStyles();
  const disabledAccounts = useAppSelector((state) => state.account.disabledAccounts);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState<string>('');

  const [searchDebounced] = useDebouncedValue<string>(search, 400);

  useEffect(() => {
    dispatch(fetchDisabledAccounts(search));
  }, [searchDebounced]);

  const handleActiveAccount = (id: string) => {
    dispatch(restoreDisabledAccount(id))
      .unwrap()
      .catch(
        (e) =>
          showNotification({
              id: 'restore-data',
              color: 'red',
              title: 'Error while activate account',
              message: e.message ?? 'Failed to activate account',
              icon: <X/>,
              autoClose: 3000,
            }
          )).then(() =>
      showNotification({
        id: 'restore-data',
        color: 'teal',
        title: 'This account was activated',
        message: 'This account was successfully activated',
        icon: <Check/>,
        autoClose: 3000,
      })
    )
      .then(() => dispatch(fetchAccounts(props.pagination)))
      .then(() =>
        dispatch(fetchDisabledAccounts(search))
          .unwrap()
          .then((disabledAccounts) =>
            disabledAccounts.length < 1 ? props.toggleShown() : null
          )
      );
  };

  const handleDeleteAccount = (id: string) => {
    dispatch(deleteAccountById(id))
      .unwrap()
      .catch(
        (e) =>
          showNotification({
              id: 'delete-data',
              color: 'red',
              title: 'Error while disable account',
              message: e.message ?? 'Failed to disable account',
              icon: <X/>,
              autoClose: 3000,
            }
          )).then(() =>
      showNotification({
        id: 'delete-data',
        color: 'teal',
        title: 'This account was deleted',
        message: 'This account was successfully deleted',
        icon: <Check/>,
        autoClose: 3000,
      })
    )
      .then(() => dispatch(fetchAccounts(props.pagination)))
      .then(() =>
        dispatch(fetchDisabledAccounts(search))
          .unwrap()
          .then((disabledAccounts) =>
            disabledAccounts.length < 1 ? props.toggleShown() : null
          )
          .then(() => {
            dispatch(fetchDeletedAccounts(''));
          })
      );
  };

  const rows = disabledAccounts?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.username}</td>
      <td>{row.fullname}</td>
      <td>{dayjs(row.disabledAt).format('HH:mm DD/MM/YYYY')}</td>
      <td>{row.disabledBy}</td>
      <td
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={() => handleActiveAccount(row.id)}
          style={{
            margin: 5,
          }}
          variant="outline"
          color="green"
          leftIcon={<RotateClockwise/>}
        >
          Activate
        </Button>
        <Button
          onClick={() => handleDeleteAccount(row.id)}
          style={{
            margin: 5,
          }}
          variant="outline"
          color="red"
          leftIcon={<Trash/>}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Restore Disabled Accounts</Text>
    );
  };

  return (
    <Modal
      opened={props.isShown}
      onClose={() => props.toggleShown()}
      centered
      size="70%"
      title={<ModalHeaderTitle/>}
      closeOnClickOutside={true}
      closeOnEscape={false}
    >
      <InputWrapper label="Search">
        <TextInput
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search/>}
        />
      </InputWrapper>
      {disabledAccounts?.length > 0 ? (
        <>
          <ScrollArea
            sx={{height: 500}}
            onScrollPositionChange={({y}) => setScrolled(y !== 0)}
          >
            <div>
              <Table sx={{minWidth: 700}}>
                <thead
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
                >
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Fullname</th>
                  <th>Disabled at</th>
                  <th>Disabled by</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </ScrollArea>
        </>
      ) : (
        <NoDataFound/>
      )}
    </Modal>
  );
};

const useStyles = createStyles((theme) => ({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22,
  },
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

export default RestoreDisabledModal;
