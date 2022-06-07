import React, { useState } from "react";
import { Button, createStyles, Drawer, Select, Text, TextInput } from "@mantine/core";
import {
  Archive,
  Download,
  Filter,
  Plus,
  RotateClockwise,
  Search,
  SortAscendingLetters,
  SortDescendingLetters,
  Trash,
  X
} from "tabler-icons-react";
import { ItemsPerPageData } from "../../models/table/items-per-page.model";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeRoomsSize, changeRoomsSortDirection, resetRoomFilter } from "../../redux/features/room/room.slice";
import { fetchDisabledRooms } from "../../redux/features/room/thunk/fetch-disabled-rooms";
import { fetchDeletedRooms } from "../../redux/features/room/thunk/fetch-deleted-rooms";
import ItemNotFoundModal from "../not-found-modal.component";
import { FPT_ORANGE_COLOR, WHITE } from "@app/constants";
import { DatePicker } from "@mantine/dates";

interface TableHeaderProps {
  searchText: string;

  handleChangeSearchText(e: string): void;

  toggleAddModalShown(): void;

  toggleRestoreDisabledModalShown(): void;

  toggleRestoreDeletedModalShown(): void;

  toggleDownloadModalShown(): void;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const itemsPerPage = useAppSelector((state) => state.room.size);
  const direction = useAppSelector((state) => state.room.direction);
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);
  const deletedRooms = useAppSelector((state) => state.room.deletedRooms);
  const [isFilterMenuShown, setFilterMenuShown] = useState<boolean>(false);
  const [isNotFoundModalShown, setNotFoundModalShown] =
    useState<boolean>(false);
  const [createFrom, setCreateFrom] = useState((new Date(2022, 0, 1)));
  const [createTo, setCreateTo] = useState(new Date());
  const [updateFrom, setUpdateFrom] = useState((new Date(2022, 0, 1)));
  const [updateTo, setUpdateTo] = useState(new Date());
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [isShowDeleted, setIsShowDeleted] = useState(false);
  const [category, setCategory] = useState('libraryRoom');
  const [itemsInPage, setItemsInPage] = useState('5');


  const handleViewDisabledRooms = async () => {
    await dispatch(fetchDisabledRooms());
    if (disabledRooms.length < 1) {
      setNotFoundModalShown(!isNotFoundModalShown);
    } else {
      props.toggleRestoreDisabledModalShown();
    }
  };

  const handleViewDeletedRooms = async () => {
    await dispatch(fetchDeletedRooms());
    if (deletedRooms.length < 1) {
      setNotFoundModalShown(!isNotFoundModalShown);
    } else {
      props.toggleRestoreDeletedModalShown();
    }
  };

  const resetFilter = () => {
    setItemsInPage('5');
    setCreateFrom((new Date(2022, 0, 1)));
    setCreateTo((new Date()));
    setUpdateFrom((new Date(2022, 0, 1)));
    setUpdateTo((new Date()));
    setCategory('libraryRoom');
    setIsShowDeleted(false);
    setIsShowDisabled(false);
  };

  const FilterMenu: React.FC = () => {
    return (
      <div
        style={{
          width: 300,
          height: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button>ass</Button>
      </div>
    );
  };

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
        <Select
          style={{
            width: 100,
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
          <Button
            variant="outline"
            onClick={() => dispatch(changeRoomsSortDirection())}
          >
            {direction === 'ASC' ? (
              <SortAscendingLetters />
            ) : (
              <SortDescendingLetters />
            )}
          </Button>
        </div>

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
            onClick={() => props.toggleDownloadModalShown()}
          >
            <Download />
          </Button>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <Button
          onClick={() => {
            setFilterMenuShown(true);
          }}
          className={classes.orangeButton}
        >
          <Filter />
        </Button>
        <Drawer
          opened={isFilterMenuShown}
          position="right"
          onClose={() => setFilterMenuShown(false)}
          closeOnClickOutside={true}
          closeOnEscape={true}
          overlayColor="#f2f2f2"
          overlayOpacity={0.55}
          overlayBlur={3}
          size={400}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '92%',
              margin: 10,
            }}
          >
            <h2 className={classes.titleFilter}>Filter menu</h2>
            <div className={classes.itemsPerPageDiv}>
              <label htmlFor="numInPage">Items per page</label>
              <select
                name="numInPage"
                className={classes.itemsPerPageDrop}
                value={itemsInPage}
                onChange={(e) => setItemsInPage(e.target.value)}
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <p>Select date:</p>
            <div className={classes.dateDiv}>
              <p className={classes.dateLable}>Create at</p>
              <div className={classes.customDatePickerWidth}>
                <DatePicker
                  value={createFrom}
                  onChange={(date) => setCreateFrom(date)}
                  maxDate={createTo ? new Date(createTo) : new Date()}
                  className={classes.dateInput}
                  inputFormat="DD/MM/YYYY"
                />
              </div>
              <div>
                <DatePicker
                  value={createTo}
                  onChange={(date) => setCreateTo(date)}
                  minDate={new Date(createFrom)}
                  maxDate={new Date()}
                  className={classes.dateInput}
                  inputFormat="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className={classes.dateDiv}>
              <p className={classes.dateLable}>Update at</p>
              <div className={classes.customDatePickerWidth}>
                <DatePicker
                  value={updateFrom}
                  onChange={(date) => setUpdateFrom(date)}
                  maxDate={updateTo ? new Date(updateTo) : new Date()}
                  className={classes.dateInput}
                  inputFormat="DD/MM/YYYY"
                />
              </div>
              <div>
                <DatePicker
                  value={updateTo}
                  onChange={(date) => setUpdateTo(date)}
                  minDate={new Date(updateFrom)}
                  maxDate={new Date()}
                  className={classes.dateInput}
                  inputFormat="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className={classes.categoryDiv}>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                className={classes.categoryDrop}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="seminarRoom">Seminar Room</option>
                <option value="libraryRoom">Library Room</option>
              </select>
            </div>
            <div>
              <p>Status</p>
              <div className={classes.statusChildrenDiv}>
                <input
                  type="checkbox"
                  id="isDisable"
                  name="isDisable"
                  value="true"
                  checked={isShowDisabled}
                  onChange={() => setIsShowDisabled(!isShowDisabled)}
                  className={classes.statusCheckbox}
                />
                <label htmlFor="isDisable">Show disabled rooms </label>
              </div>
              <div className={classes.statusChildrenDiv}>
                <input
                  type="checkbox"
                  id="isDelete"
                  name="isDelete"
                  value="true"
                  checked={isShowDeleted}
                  onChange={() => setIsShowDeleted(!isShowDeleted)}
                  className={classes.statusCheckbox}
                />
                <label htmlFor="isDelete">Show deleted rooms</label>
              </div>
            </div>
            <div className={classes.resetDiv}>
              <button
                className={classes.resetButton}
                onClick={() => resetFilter()}
              >
                Reset filter
              </button>
            </div>
            <div className={classes.buttonSpase}>
              <Button
                variant="outline"
                color="red"
                leftIcon={<X />}
                onClick={() => {
                  setFilterMenuShown(false);
                }}
              >
                Cancel
              </Button>
              <Button leftIcon={<Filter />} className={classes.orangeButton}>
                Apply Filter
              </Button>
            </div>
          </div>
        </Drawer>

        <Button
          variant="outline"
          color="green"
          onClick={() => props.toggleAddModalShown()}
        >
          <Plus />
        </Button>

        <Button
          variant="outline"
          color="green"
          onClick={() => handleViewDisabledRooms()}
        >
          <Archive />
        </Button>

        <Button
          variant="outline"
          color="red"
          onClick={() => handleViewDeletedRooms()}
        >
          <Trash />
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
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 0.15,
    margin: 10,
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 0.1,
    alignItems: 'center',
    marginRight: 10,
  },
  searchInput: {
    width: 300,
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
  orangeButton: {
    backgroundColor: FPT_ORANGE_COLOR,
    color: WHITE,
  },
  buttonSpase: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleFilter: {
    fontSize: 30,
    fontWeight: 600,
    textShadow: '1px 1px 2px #000000',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
  },

  itemsPerPageDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemsPerPageDrop: {
    border: '2px solid',
    width: 100,
    textAlign: 'center',
    padding: 2,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  dateDiv: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
  },
  dateLable: {
    border: '1px solid',
    padding: 10,
    height: 50,
    width: 100,
    margin: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  customDatePickerWidth: {
    'react-datepicker-wrapper': {
      width: '100%',
    },
  },
  dateInput: {
    border: '1px solid',
    backgroundColor: '#fe6346',
    textAlign: 'center',
    margin: 2,
    borderRadius: 5,
    width: 115,
    height: 50,
    color: '#fff',
    fontFamily: "sans-serif",
    fontSize: "14px",
    "& input": {
      padding: "0 10px",
      border: 'none',
      borderRadius: "4px",
      backgroundColor: '#fe6346',
      height: 50,
      color: '#fff',
    },
    "& button": {
      color: '#fff',
    }
  },
  categoryDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryDrop: {
    border: '1px solid',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  statusChildrenDiv: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
  },
  statusCheckbox: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  resetButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '1px solid #fa5252',
    color: '#fa5252',
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 20,
  },
  resetDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default TableHeader;
