import React, {useState} from "react";
import {Button, createStyles, Select, Text, TextInput, Tooltip} from "@mantine/core";
import {
  Archive, Download,
  Plus,
  RotateClockwise,
  Search,
  SortAscendingLetters, SortDescendingLetters,
  Trash
} from "tabler-icons-react";
import {ItemsPerPageData} from "../../models/table/items-per-page.model";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  changeRoomsSize,
  changeRoomsSortDirection,
  resetRoomFilter, toggleRoomAddModalVisible,
  toggleRoomsDownloadModalVisible
} from "../../redux/features/room/room.slice";
import {fetchDisabledRooms} from "../../redux/features/room/thunk/fetch-disabled-rooms";
import {fetchDeletedRooms} from "../../redux/features/room/thunk/fetch-deleted-rooms";


interface TableHeaderProps {
  searchText: string;
  handleChangeSearchText(e: string): void;
  toggleRestoreDisabledModalShown(): void;
  toggleRestoreDeletedModalShown(): void;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {

  const {classes} = useStyles();

  const dispatch = useAppDispatch();

  const itemsPerPage = useAppSelector((state) => state.room.size);
  const direction = useAppSelector((state) => state.room.direction);
  const [isDisabledRoomTooltipShown, setDisabledRoomTooltipShown] = useState<boolean>(false);
  const [isAddRoomTooltipShown, setAddRoomTooltipShown] = useState<boolean>(false);

  return (
    <div className={classes.tableSearchHeader}>
      <div className={classes.leftContainer}>
        <TextInput
          className={classes.searchInput}
          autoFocus={true}
          label="Search"
          placeholder="Search by any field"
          mb="md"
          icon={<Search size={14}/>}
          value={props.searchText}
          onChange={(e) => props.handleChangeSearchText(e.currentTarget.value)}
        />
        <Select
          style={{
            width: 100
          }}
          label="Items per page"
          placeholder="Pick one"
          value={String(itemsPerPage)}
          onChange={(e) => {
            dispatch(changeRoomsSize(Number(e)));
          }}
          data={ItemsPerPageData}
        />
        <div className={classes.sortButtonContainer}>
          <Text className={classes.sortButtonContainerTitle}>Sort</Text>
          <Button variant="outline" onClick={() => dispatch(changeRoomsSortDirection())}>
            {direction === 'ASC' ? <SortAscendingLetters/> : <SortDescendingLetters/>}
          </Button>
        </div>

        <div className={classes.sortButtonContainer}>
          <Text className={classes.sortButtonContainerTitle}>Reset</Text>
          <Button variant="outline" color="indigo" onClick={() => dispatch(resetRoomFilter())}>
            <RotateClockwise/>
          </Button>
        </div>

        <div className={classes.sortButtonContainer}>
          <Text className={classes.sortButtonContainerTitle}>Download</Text>
          <Button variant="outline" color="violet" onClick={() => dispatch(toggleRoomsDownloadModalVisible())}>
            <Download/>
          </Button>
        </div>

      </div>
      <div className={classes.rightContainer}>
        <Tooltip
          label={"Add new room"}
          opened={isAddRoomTooltipShown}
          allowPointerEvents
          withArrow
          wrapLines
          transition="rotate-left"
          transitionDuration={250}
          width={120}
        >
          <Button variant="outline" color="green"
                  onClick={() => {
                    dispatch(toggleRoomAddModalVisible());
                  }}>
            <Plus/>
          </Button>
        </Tooltip>

        <Tooltip
          label={"View disabled rooms"}
          opened={isDisabledRoomTooltipShown}
          allowPointerEvents
          withArrow
          wrapLines
          transition="rotate-left"
          transitionDuration={250}
          width={160}
        >
          <Button variant="outline" color="green"
                  onClick={() => {
                    setDisabledRoomTooltipShown(!isDisabledRoomTooltipShown);
                    dispatch(fetchDisabledRooms()).then(() => props.toggleRestoreDisabledModalShown());
                  }}>
            <Archive/>
          </Button>
        </Tooltip>

        <Button variant="outline" color="red"
                onClick={() => {
                  dispatch(fetchDeletedRooms()).then(() => props.toggleRestoreDeletedModalShown())
                  setDisabledRoomTooltipShown(!isDisabledRoomTooltipShown);
                }}>
          <Trash/>
        </Button>
      </div>
    </div>);
};

const useStyles = createStyles({
  tableSearchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 0.15,
    margin: 10
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 0.1,
    alignItems: 'center',
    marginRight: 10
  },
  searchInput: {
    width: 300
  },
  sortButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4
  },
  sortButtonContainerTitle: {
    fontWeight: 500,
    fontSize: 15
  },

});

export default TableHeader;
