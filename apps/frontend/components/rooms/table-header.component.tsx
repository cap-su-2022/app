import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Drawer,
  Menu,
  Modal,
  Select,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
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
  X,
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
import { FPT_ORANGE_COLOR, LIGHT_GRAY, WHITE } from '@app/constants';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const today = moment().format('YYYY-MM-DD');
  const itemsPerPage = useAppSelector((state) => state.room.size);
  const direction = useAppSelector((state) => state.room.direction);
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);
  const deletedRooms = useAppSelector((state) => state.room.deletedRooms);
  const [isFilterMenuShown, setFilterMenuShown] = useState<boolean>(false);
  const [isNotFoundModalShown, setNotFoundModalShown] =
    useState<boolean>(false);
  const [createFrom, setCreateFrom] = useState(null);
  const [createTo, setCreateTo] = useState(null);
  const [updateFrom, setUpdateFrom] = useState(null);
  const [updateTo, setUpdateTo] = useState(null);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [isShowDeleted, setIsShowDeleted] = useState(false);
  const [category, setCategory] = useState('libraryRoom');
  const [itemsInPage, setItemsInPage] = useState('5');

  useEffect(() => {}, [disabledRooms]);

  useEffect(() => {}, [deletedRooms]);

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
    setItemsInPage('5')
    setCreateFrom(null);
    setCreateTo(null);
    setUpdateFrom(null);
    setUpdateTo(null);
    setCategory('libraryRoom')
    setIsShowDeleted(false);
    setIsShowDisabled(false);
  }

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
          <Drawer
            opened={isFilterMenuShown}
            position="right"
            onClose={() => setFilterMenuShown(false)}
            // closeOnClickOutside={false}
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
              <div className={classes.itemsPerPage_div}>
                <label htmlFor="numInPage">Items per page</label>
                <select
                  name="numInPage"
                  className={classes.itemsPerPage_drop}
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
              <div className={classes.date_div}>
                <p className={classes.date_lable}>Create at</p>
                <div className={classes.customDatePickerWidth}>
                  <DatePicker
                    selected={createFrom}
                    onChange={(date) => setCreateFrom(date)}
                    maxDate={createTo ? new Date(createTo) : new Date()}
                    placeholderText="Select a date"
                    className={classes.date_input}
                  />
                </div>
                <div>
                  <DatePicker
                    selected={createTo}
                    onChange={(date) => setCreateTo(date)}
                    minDate={new Date(createFrom)}
                    maxDate={new Date()}
                    placeholderText="Select a date"
                    className={classes.date_input}
                  />
                </div>
              </div>
              <div className={classes.date_div}>
                <p className={classes.date_lable}>Update at</p>
                <div className={classes.customDatePickerWidth}>
                  <DatePicker
                    selected={updateFrom}
                    onChange={(date) => setUpdateFrom(date)}
                    maxDate={updateTo ? new Date(updateTo) : new Date()}
                    placeholderText="Select a date"
                    className={classes.date_input}
                  />
                </div>
                <div>
                  <DatePicker
                    selected={updateTo}
                    onChange={(date) => setUpdateTo(date)}
                    minDate={new Date(updateFrom)}
                    maxDate={new Date()}
                    placeholderText="Select a date"
                    className={classes.date_input}
                  />
                </div>
              </div>
              <div className={classes.category_div}>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className={classes.category_drop}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="seminarRoom">Seminar Room</option>
                  <option value="libraryRoom">Library Room</option>
                </select>
              </div>
              <div>
                <p>Status</p>
                <div className={classes.status_children_div}>
                  <input
                    type="checkbox"
                    id="isDisable"
                    name="isDisable"
                    value="true"
                    checked={isShowDisabled}
                    onChange={() => setIsShowDisabled(true)}
                    className={classes.status_checkbox}
                  />
                  <label htmlFor="isDisable">Show disabled rooms </label>
                </div>
                <div className={classes.status_children_div}>
                  <input
                    type="checkbox"
                    id="isDelete"
                    name="isDelete"
                    value="true"
                    checked={isShowDeleted}
                    onChange={() => setIsShowDeleted(true)}
                    className={classes.status_checkbox}
                  />
                  <label htmlFor="isDelete">Show deleted rooms</label>
                </div>
              </div>
              <div className={classes.reset_div}>
                <button className={classes.resetButton} onClick={() => resetFilter()}>Reset filter</button>
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
        </Button>

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

  itemsPerPage_div: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemsPerPage_drop: {
    border: '2px solid',
    width: 100,
    textAlign: 'center',
    padding: 2,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  date_div: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
  },
  date_lable: {
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
  date_input: {
    border: '1px solid',
    backgroundColor: '#fe6346',
    textAlign: 'center',
    margin: 2,
    borderRadius: 5,
    width: 115,
    height: 52,
    color: '#fff',
    // '&::-webkit-calendar-picker-indicator': {
    //   display: 'none',
    //   '-webkit-appearance': 'none'
    // }
  },
  category_div: {
    display: 'flex',
    flexDirection: 'column',
  },
  category_drop: {
    border: '1px solid',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  status_children_div: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
  },
  status_checkbox: {
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
  reset_div: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default TableHeader;
