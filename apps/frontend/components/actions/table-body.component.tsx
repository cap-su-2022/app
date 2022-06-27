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
interface RowData {
  name: string;
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
  toggleSortDirection(): void;
  actionButtonCb: any;
}

export const TableBody: React.FC<TableBodyProps> = (props) => {
  const [sortBy, setSortBy] = useState<keyof RowData>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const { classes } = useStyles();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    props.toggleSortDirection();
  };

  const rows = props.data.map((row, index) => (
    <tr key={row.name}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
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
            Row
          </Th>
          <Th
            style={{
              width: '75%',
            }}
            sorted={sortBy === 'name'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('name')}
          >
            Name
          </Th>
          <Th sorted={null} reversed={reverseSortDirection} onSort={null}>
            Actions
          </Th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  ) : (
    <div className={classes.notFoundContainer}>
      <Image src="/location_search.svg" width={500} />
      <div className={classes.notFoundText}>No result found</div>
    </div>
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
}));
