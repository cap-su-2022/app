import React, { CSSProperties, useState } from 'react';
import {
  createStyles,
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  Button,
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
import Th from '../../components/table/th.table.component';
import dayjs from 'dayjs';

interface RowData {
  name: string;
  requested_at: string;
  checkin_date: string;
}

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   style?: CSSProperties;
//   onSort(): void;
// }

// function Th({ style, children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
//   return (
//     <th style={style} className={classes.th}>
//       {onSort === null ? (
//         <div className={classes.control}>{children}</div>
//       ) : (
//         <UnstyledButton onClick={onSort} className={classes.control}>
//           <Group position="apart">
//             <Text weight={500} size="sm">
//               {children}
//             </Text>
//             <Center className={classes.icon}>
//               <Icon size={14} />
//             </Center>
//           </Group>
//         </UnstyledButton>
//       )}
//     </th>
//   );
// }

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

  const { classes } = useStyles();
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    props.toggleSortDirection(field);
  };

  const rows = props.data.map((row, index) => (
    <tr key={index}>
      <td>
        {props.page === 1
          ? index + 1
          : (props.page - 1) * props.itemsPerPage + (index + 1)}
      </td>
      <td>{row.roomName}</td>
      <td>{dayjs(row.bookedAt).format('ddd DD-MM-YYYY, HH:mm ')}</td>
      <td>{dayjs(row.checkinDate).format('ddd DD-MM-YYYY')}</td>
      <td>{row.requestedBy}</td>
      <td>
        {row.status === 'PENDING' ? (
          <div className={classes.pendingDisplay}>{row.status}</div>
        ) : row.status === 'BOOKED' ? (
          <div className={classes.bookedDisplay}>{row.status}</div>
        ) : row.status === 'CHECKED_OUT' ? (
          <div className={classes.checkedOutDisplay}>{row.status}</div>
        ) : row.status === 'CHECKED_IN' ? (
          <div className={classes.checkedInDisplay}>{row.status}</div>
        ) : row.status === 'CANCELLED' ? (
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
            sorted={sortBy === 'checkin_date'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('checkin_date')}
          >
            Booked At
          </Th>

          <Th
            sorted={sortBy === 'checkin_date'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('checkin_date')}
          >
            Checkin Date
          </Th>

          <Th sorted={null} reversed={null} onSort={null} style={{width: 120}}>
            Request by
          </Th>

          <Th sorted={null} reversed={reverseSortDirection} onSort={null} style={{width: 120}}>
            Status
          </Th>

          <Th
            style={{
              width: '10%',
            }}
            sorted={null}
            reversed={reverseSortDirection}
            onSort={null}
          >
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
  pendingDisplay: {
    color: '#228be6',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#0000ff1c',
    fontWeight: 600,
  },
  checkedOutDisplay: {
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
  bookedDisplay: {
    color: '#40c057',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#00800024',
    fontWeight: 600,
  },
  checkedInDisplay: {
    color: '#fd7e14',
    textAlign: 'center',
    borderRadius: 50,
    width: 100,
    backgroundColor: '#fd7e1430',
    fontWeight: 600,
  },
}));
