import React, { useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  Select,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import {
  Archive,
  Download,
  Plus,
  RotateClockwise,
  Search,
  SortAscendingLetters,
  SortDescendingLetters,
  Trash,
} from 'tabler-icons-react';
import { ItemsPerPageData } from '../../models/table/items-per-page.model';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeRoomsSize,
  changeRoomsSortDirection,
  resetRoomFilter,
} from '../../redux/features/room/room.slice';
import { fetchDisabledRooms } from '../../redux/features/room/thunk/fetch-disabled-rooms';
import { fetchDeletedRooms } from '../../redux/features/room/thunk/fetch-deleted-rooms';
import ItemNotFoundModal from '../not-found-modal.component';

interface TableHeaderProps {
  searchText: string;
  handleChangeSearchText(e: string): void;
  toggleAddModalShown(): void;
  //   toggleDownloadModalShown(): void;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const itemsPerPage = useAppSelector((state) => state.room.size);
  const direction = useAppSelector((state) => state.room.direction);
  const [isNotFoundModalShown, setNotFoundModalShown] =
    useState<boolean>(false);

  return (
    <div className={classes.tableSearchHeader}>
      <div className={classes.leftContainer}>
        <TextInput
          className={classes.searchInput}
          autoFocus={true}
          label="Search"
          placeholder="Search by any field"
          mb="md"
          icon={<Search size={14} />}
          value={props.searchText}
          onChange={(e) => props.handleChangeSearchText(e.currentTarget.value)}
        />

        <div className={classes.sortButtonContainer}>
          <Text className={classes.sortButtonContainerTitle}>Reset</Text>
          <Button
            variant="outline"
            color="indigo"
            onClick={() => dispatch(resetRoomFilter())}
          >
            <RotateClockwise />
          </Button>
        </div>

        <div className={classes.sortButtonContainer}>
          <Text className={classes.sortButtonContainerTitle}>Download</Text>
          <Button
            variant="outline"
            color="violet"
            // onClick={() => props.toggleDownloadModalShown()}
          >
            <Download />
          </Button>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <Button
          variant="outline"
          color="green"
          onClick={() => props.toggleAddModalShown()}
        >
          <Plus />
        </Button>
      </div>
      {isNotFoundModalShown ? (
        <ItemNotFoundModal
          isShown={isNotFoundModalShown}
          toggleShown={() => setNotFoundModalShown(!isNotFoundModalShown)}
        />
      ) : null}
    </div>
  );
};

const useStyles = createStyles({
  tableSearchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 1130px)': {
      flexDirection: 'column',
    },
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 0.15,
    margin: 10,
    '@media (max-width: 1130px)': {
      justifyContent: 'flex-start',
    },
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 0.1,
    alignItems: 'center',
    marginRight: 10,
    '@media (max-width: 1130px)': {
      justifyContent: 'space-between',
      margin: '0 0 10px 10px',
      maxWidth: '200px',
    },
  },
  searchInput: {
    width: 300,
    '@media (max-width: 865px)': {
      maxWidth: '100px',
    },
  },
  sortButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
  },
  sortButtonContainerTitle: {
    fontWeight: 500,
    fontSize: 15,
  },
});

export default TableHeader;
