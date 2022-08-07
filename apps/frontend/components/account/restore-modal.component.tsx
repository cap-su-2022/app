import React from 'react';
import {
  Button,
  createStyles,
  Modal,
  Text,
} from '@mantine/core';
import { Check, RotateClockwise, ScanEye, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchAccounts } from '../../redux/features/account/thunk/fetch-accounts.thunk';
import { showNotification } from '@mantine/notifications';
import { restoreDisabledAccount } from 'apps/frontend/redux/features/account/thunk/restore-disabled.thunk';

interface RestoreModalProps {
  isShown: boolean;

  toggleShown(): void;

  toggleInforModalShown(): void;

  pagination: PagingParams;
}

const RestoreModal: React.FC<RestoreModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedAccountId = useAppSelector((state) => state.account.account.id);

  const dispatch = useAppDispatch();

  const handleRestoreSelectedAccount = () => {
    dispatch(restoreDisabledAccount(selectedAccountId))
      .catch((e) =>
        showNotification({
          id: 'restore-data',
          color: 'red',
          title: 'Error while restore account',
          message: e.message ?? 'Failed to restore account',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'restore-data',
          color: 'teal',
          title: 'This account was restored',
          message: 'This account was successfully restored',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => {
        props.toggleShown();
        props.toggleInforModalShown();
        dispatch(fetchAccounts(props.pagination));
      });
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitle}>Are you sure?</Text>;
  };

  return (
    <Modal
      closeOnClickOutside={true}
      centered
      zIndex={200}
      title={<ModalHeaderTitle />}
      size={null}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Active this account will make the account can log into the system.
        </Text>
        <div className={classes.modalFooter}>
          <Button
            color="green"
            leftIcon={<RotateClockwise />}
            onClick={() => handleRestoreSelectedAccount()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Avtice this account
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
    </Modal>
  );
};

const useStyles = createStyles((theme) => ({
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
}));

export default RestoreModal;
