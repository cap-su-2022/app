import React, { CSSProperties, useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
  Image,
  InputWrapper,
} from '@mantine/core';
import {
  Selector,
  ChevronDown,
  ChevronUp,
  InfoCircle,
  Pencil,
  Trash,
} from 'tabler-icons-react';
import NoDataFound from '../../components/no-data-found';
import moment from 'moment';

interface RowData {
  name: string;
  booked_at: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  style?: CSSProperties;
  onSort(): void;
}

function Th({ style, children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th style={style} className={classes.th}>
      {onSort === null ? (
        children
      ) : (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="apart">
            <Text weight={500} size="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size={14} />
            </Center>
          </Group>
        </UnstyledButton>
      )}
    </th>
  );
}

interface TableBodyProps {
  data: any[];
  toggleSortDirection(label): void;
  actionButtonCb: any;
  page: number;
  itemsPerPage: number;
}

export const TableBody: React.FC<TableBodyProps> = (props) => {
  const [sortBy, setSortBy] = useState<keyof RowData>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  console.log("rever: ",reverseSortDirection)

  const { classes } = useStyles();
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    props.toggleSortDirection(field);
  };

  // props.data.map((row, index) => {
  //   console.log('IDDDDD: ', row.id);
  // });

  const rows = props.data.map((row, index) => (
    <tr key={index}>
      <td>
        {props.page === 1
          ? index + 1
          : (props.page - 1) * props.itemsPerPage + (index + 1)}
      </td>
      <td>{row.roomName}</td>
      <td>{moment(row.bookedAt).format('HH:MM DD/MM/YYYY')}</td>
      <td>
        {row.status === 'BOOKING' ? (
          <div className={classes.bookingDisplay}>{row.status}</div>
        ) : null}
        {row.status === 'BOOKED' ? (
          <div className={classes.bookedDisplay}>{row.status}</div>
        ) : null}
        {row.status === 'CHECKED IN' ? (
          <div className={classes.processingDisplay}>{row.status}</div>
        ) : null}
        {row.status === 'CANCELLED' ? (
          <div className={classes.canceledDisplay}>{row.status}</div>
        ) : null}
      </td>
      <td className={classes.actionButtonContainer}>
        <Button
          variant="outline"
          onClick={() => props.actionButtonCb.info(row.id)}
        >
          <InfoCircle />
        </Button>
        <Button
          variant="outline"
          color="green"
          onClick={() => props.actionButtonCb.update(row.id)}
        >
          <Pencil />
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => props.actionButtonCb.delete(row.id)}
        >
          <Trash />
        </Button>
      </td>
    </tr>
  ));

  return props.data.length > 0 ? (
    <Table
      horizontalSpacing="md"
      verticalSpacing="xs"
      sx={{ tableLayout: 'fixed', minWidth: 700 }}
    >
      <thead>
        <tr>
          <Th
            style={{
              width: '5%',
            }}
            sorted={null}
            reversed={reverseSortDirection}
            onSort={null}
          >
            STT
          </Th>

          <Th
            sorted={sortBy === 'name'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('name')}
          >
            Room Name
          </Th>

          <Th
            sorted={sortBy === 'booked_at'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('booked_at')}
          >
            Booked At
          </Th>

          <Th
            sorted={null}
            reversed={reverseSortDirection}
            onSort={null}
          >
            Status
          </Th>

          <Th sorted={null} reversed={reverseSortDirection} onSort={null}>
            Actions
          </Th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  ) : (
    <NoDataFound />
  );
};

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  notFoundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  notFoundText: {
    fontSize: 32,
    fontWeight: 600,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingDisplay: {
    color: '#228be6',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#0000ff1c',
    fontWeight: 600,
  },
  bookedDisplay: {
    color: '#fd7e14',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#fd7e1442',
    fontWeight: 600,
  },
  canceledDisplay: {
    color: 'red',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#ff00001c',
    fontWeight: 600,
  },
  processingDisplay: {
    color: '#40c057',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#00800024',
    fontWeight: 600,
  },
}));
