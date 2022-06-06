import React, {useEffect, useState} from "react";
import {Button, createStyles, Drawer, Menu, Modal, Select, Text, TextInput, Tooltip} from "@mantine/core";
import {
  Archive, Download,
  Filter,
  Plus,
  RotateClockwise,
  Search,
  SortAscendingLetters, SortDescendingLetters,
  Trash,
  X
} from "tabler-icons-react";
import {ItemsPerPageData} from "../../models/table/items-per-page.model";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  changeRoomsSize,
  changeRoomsSortDirection,
  resetRoomFilter,
} from "../../redux/features/room/room.slice";
import {fetchDisabledRooms} from "../../redux/features/room/thunk/fetch-disabled-rooms";
import {fetchDeletedRooms} from "../../redux/features/room/thunk/fetch-deleted-rooms";
import ItemNotFoundModal from "../not-found-modal.component";
import { FPT_ORANGE_COLOR, LIGHT_GRAY, WHITE } from "@app/constants";


interface TableHeaderProps {
  searchText: string;
  handleChangeSearchText(e: string): void;
  toggleAddModalShown(): void;
  toggleRestoreDisabledModalShown(): void;
  toggleRestoreDeletedModalShown(): void;
  toggleDownloadModalShown(): void;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {

  const {classes} = useStyles();

  const dispatch = useAppDispatch();

  const itemsPerPage = useAppSelector((state) => state.room.size);
  const direction = useAppSelector((state) => state.room.direction);
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);
  const deletedRooms = useAppSelector((state) => state.room.deletedRooms);
  const [isFilterMenuShown, setFilterMenuShown] = useState<boolean>(false);
  const [isNotFoundModalShown, setNotFoundModalShown] = useState<boolean>(false);

  useEffect(() => {

  }, [disabledRooms]);

  useEffect(() => {

  }, [deletedRooms]);

  const handleViewDisabledRooms = async () => {
    await dispatch(fetchDisabledRooms());
    if (disabledRooms.length < 1) {
      setNotFoundModalShown(!isNotFoundModalShown);
    }  else {
      props.toggleRestoreDisabledModalShown();
    }
  }

  const handleViewDeletedRooms = async () =>  {
    await dispatch(fetchDeletedRooms());
    if (deletedRooms.length < 1) {
      setNotFoundModalShown(!isNotFoundModalShown);
    } else {
      props.toggleRestoreDeletedModalShown();
    }
  }

  const FilterMenu: React.FC = () => {
    return (
      <div style={{
        width: 300,
        height: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button>ass</Button>
      </div>
    );
  }

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
          <Button variant="outline" color="violet" onClick={() => props.toggleDownloadModalShown()}>
            <Download/>
          </Button>
        </div>

      </div>
      <div className={classes.rightContainer}>

          <Button onClick={() => setFilterMenuShown(!isFilterMenuShown)} style={{
            backgroundColor: FPT_ORANGE_COLOR,
            color: WHITE,
          }}>
            <Filter/>
            <Drawer opened={isFilterMenuShown}
            position="right"
             onClose={() => setFilterMenuShown(false)}
             closeOnClickOutside={true}
             closeOnEscape={true}
            overlayColor="#f2f2f2"
              overlayOpacity={0.55}
              overlayBlur={3}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        height: '92%'
      }}>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Button variant="outline" color="red" leftIcon={<X/>}>
            Cancel
            </Button>
            <Button leftIcon={<Filter/>} style={{
              backgroundColor: FPT_ORANGE_COLOR,
              color: WHITE
            }}>
              Apply Filter
            </Button>
        </div>
      </div>
    </Drawer>
          </Button>

          <Button variant="outline" color="green"
                  onClick={() => props.toggleAddModalShown()}>
            <Plus/>
          </Button>

          <Button variant="outline" color="green"
                  onClick={() => handleViewDisabledRooms()}>
            <Archive/>
          </Button>

        <Button variant="outline" color="red"
                onClick={() => handleViewDeletedRooms()}>
          <Trash/>
        </Button>
      </div>
      {isNotFoundModalShown
        ? <ItemNotFoundModal isShown={isNotFoundModalShown}
        toggleShown={() => setNotFoundModalShown(!isNotFoundModalShown)}/>
        : null}
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
