import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { Archive, ScanEye, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { disableRoomById } from '../../redux/features/room/thunk/disable-room-by-id';
import { fetchRooms } from '../../redux/features/room/thunk/fetch-rooms';
import { PagingParams } from '../../models/pagination-params/paging-params.model';
import { fetchDisabledRooms } from '../../redux/features/room/thunk/fetch-disabled-rooms';
import { cancelBooking } from '../../redux/features/room-booking/thunk/cancel-booking';
import Th from '../table/th.table.component';
import dayjs from 'dayjs';
import { fetchRequestByRoomId } from '../../redux/features/room-booking/thunk/fetch-request-by-room';
import { fetchAccounts } from '../../redux/features/account/thunk/fetch-accounts.thunk';
import { disableAccountById } from '../../redux/features/account/thunk/disable-by-id';
import { fetchDisabledAccounts } from '../../redux/features/account/thunk/fetch-disabled.thunk';
import { fetchRequestByAccountId } from '../../redux/features/room-booking/thunk/fetch-room-booking-by-account';

interface DisableModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleInforModalShown(): void;
  pagination: PagingParams;
}
const DisableModal: React.FC<DisableModalProps> = (props) => {
  const { classes } = useStyles();
  const selectedAccountId = useAppSelector((state) => state.account.account.id);
  const [listRequest, setListRequest] = useState([]);
  const [isShownListRequest, setShownListRequest] = useState(false);

  const dispatch = useAppDispatch();

  const handleDisableSelectedAccount = () => {
    dispatch(disableAccountById(selectedAccountId)).then(() => {
      props.toggleShown();
      props.toggleInforModalShown();
      dispatch(fetchDisabledAccounts(''));
      dispatch(fetchAccounts(props.pagination));
      listRequest.map((request) => dispatch(cancelBooking(request.id)));
    });
  };
  useEffect(() => {
    if (selectedAccountId) {
      dispatch(fetchRequestByAccountId(selectedAccountId))
        .unwrap()
        .then((response) => setListRequest(response));
    }
  }, [dispatch, selectedAccountId]);

  const ListRequestByAccountId = () => {
    const rows =
      listRequest && listRequest.length > 0
        ? listRequest.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.roomName}</td>
              <td>{dayjs(row.timeCheckin).format('HH:mm DD/MM/YYYY')}</td>
              <td>{dayjs(row.timeCheckout).format('HH:mm DD/MM/YYYY')}</td>
            </tr>
          ))
        : null;
    return listRequest && listRequest.length > 0 ? (
      <ScrollArea sx={{ height: 300 }}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed' }}
        >
          <thead className={classes.header}>
            <tr>
              <Th
                style={{
                  width: '60px',
                }}
                sorted={null}
                reversed={null}
                onSort={null}
              >
                STT
              </Th>

              <Th sorted={null} reversed={null} onSort={null}>
                Room requested
              </Th>

              <Th sorted={null} reversed={null} onSort={null}>
                Time start
              </Th>
              <Th sorted={null} reversed={null} onSort={null}>
                Time end
              </Th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0px',
        }}
      >
        <h1>Dont have any room with this account</h1>
      </div>
    );
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
      size={isShownListRequest && listRequest.length > 0 ? '50%' : null}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.modalContainer}>
        <Text className={classes.modalBody}>
          Disabling the account will make the account inaccessible to the
          system. This account&apos;s pending booking requests will be cancelled
        </Text>
        <div className={classes.modalFooter}>
          {listRequest.length > 0 ? (
            <Button
              leftIcon={<ScanEye />}
              style={{ backgroundColor: 'blue', width: '60%', margin: 10 }}
              onClick={() => setShownListRequest(!isShownListRequest)}
            >
              List request on this room
            </Button>
          ) : null}

          <Button
            color="red"
            leftIcon={<Archive />}
            onClick={() => handleDisableSelectedAccount()}
            style={{
              width: '60%',
              margin: 10,
            }}
          >
            Disable this account
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
      {isShownListRequest && listRequest.length > 0 ? (
        <ListRequestByAccountId />
      ) : null}
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

export default DisableModal;
