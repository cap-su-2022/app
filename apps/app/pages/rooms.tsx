import {AppProps} from "next/app";
import {GetServerSideProps} from "next";
import AdminLayout from "../components/AdminLayout";
import {
  Button,
  createStyles, Modal,
  Pagination,
  ScrollArea, Select, Skeleton,
  Table,
  TextInput,
} from "@mantine/core";
import {InfoCircle, Plus, Search, Wand} from "tabler-icons-react";
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useAppDispatch} from "../redux/hooks";
import {toggleSpinnerOff, toggleSpinnerOn} from "../redux/features/spinner";
import Th from "../components/table/th.table.component";
import {RowData} from "../models/table/row-data.model";
import {ItemsPerPageData} from "../models/table/items-per-page.model";
import {RoomsResponsePayload} from "../models/rooms-response-payload.model";
import AddRoomModal from "../components/rooms/add-room-modal.component";

interface RoomsRowData extends RowData {
  stt: number;
  id: string;
  name: string;
  isDisabled: boolean;
  updatedAt: string;
}

interface TableSortProps {
  currentPage: number;
  totalPage: number;
  size: number;
  data: RoomsRowData[];
}

const initialState  = {
  data: {
    totalPage: 0,
    data: [],
    currentPage: 0,
    size: 0,
  },
  search: '',
  page: 1,
  itemPerPage: 3,
  direction: 'ASC',
  isAddModalShown: false,
};

function RoomsManagement(props: any) {
  const {classes} = useStyles();

  const dispatch = useAppDispatch();

  const [data, setData] = useState<TableSortProps>(initialState.data);

  const [search, setSearch] = useState<string>(initialState.search);
  const [activePage, setPage] = useState<number>(initialState.page);
  const [itemPerPage, setItemPerPage] = useState<number>(initialState.itemPerPage);
  const [direction, setDirection] = useState<string>(initialState.direction);
  const [isAddModalShown, setAddModalShown] = useState<boolean>(initialState.isAddModalShown);


  const [sortBy, setSortBy] = useState<keyof RoomsRowData>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [searchData, setSearchData] = useState({
    search: search,
    page: activePage,
    size: itemPerPage,
    sort: direction
  });


  useEffect(() => {
    initData();
  }, []);

  const handleReFetchDataTable = (e) => {
    setPage(e);
    initData();
  }


  const initData = async () => {
    dispatch(toggleSpinnerOn());
    axios.post(`api/rooms`, searchData)
    .then((resp: AxiosResponse<RoomsResponsePayload>) => resp.data)
      .then((payload) => {
        return {
          ...payload,
          data: payload.data.map((room, index) => {
            return {
              stt: index + 1,
              ...room,
            }
          }),
        };
      })
    .then((data) => setData(data))
      .finally(() => {
      dispatch(toggleSpinnerOff());
    })

  }


  const setSorting = (field: keyof RoomsRowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);

  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setSearch(value);

  };
  const handleRenderRows = () => {
    console.log(data);
    return data.data?.map((row) => (
      <tr key={row.id}>
        <td>{row.stt}</td>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{new Date(row.updatedAt).toDateString()}</td>
        <td>
          {row.isDisabled
            ? <Button compact color="red"
              variant="light"
              radius="xl"
              size="md">Disabled</Button>
            : <Button color="green" variant="outline" compact>Active</Button>
          }
        </td>
        <td>
          <div style={{
            display: 'flex',
          }}>
            <Button style={{
              marginRight: 5
            }} leftIcon={<InfoCircle size={20}/>} variant="outline" color="orange" compact>
              Info
            </Button>
            <Button leftIcon={<Wand size={20}/>} variant="outline" color="blue" compact>
              Update
            </Button>
          </div>
        </td>
      </tr>
    ));
  }

  const handleItemPerPageChange = async (e ) => {
    const perPage = Number(e);
    setItemPerPage(perPage);
    await initData();
  }

  const TableHeader: React.FC = () => {
    return (<div className={classes.tableSearchHeader}>
      <TextInput
        style={{
          marginTop: 14,
          marginRight: 10,
        }}
        label="Search"
        placeholder="Search by any field"
        mb="md"
        icon={<Search size={14}/>}
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        style={{
          marginRight: 10,
        }}
        label="Items per page"
        placeholder="Pick one"
        value={String(itemPerPage)}
        onChange={(e) => handleItemPerPageChange(e)}
        data={ItemsPerPageData}
      />
      <Button style={{
        marginTop: 27,
        marginRight: 10,
      }} variant="outline" color="green" leftIcon={<Plus/>}
      onClick={() => setAddModalShown(true)}>Add New</Button>
    </div>);
  }

  return (
    <AdminLayout>

      {data ? <ScrollArea>
        <TableHeader/>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{tableLayout: 'fixed', minWidth: 1000}}
        >
          <thead>
          <tr>
            <Th
              sorted={sortBy === 'stt'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('stt')}
            >
              STT
            </Th>
            <Th
              sorted={sortBy === 'id'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('id')}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'updatedAt'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('updatedAt')}
            >
              Updated At
            </Th>
            <Th onSort={null}>
              Status
            </Th>
            <Th onSort={null}>
              Action
            </Th>
          </tr>
          </thead>
          <tbody>
          {handleRenderRows()}
          </tbody>
        </Table>
        <div className={classes.pagination}>
          <Pagination total={data.totalPage} page={activePage}
                      onChange={(e) => handleReFetchDataTable(e)}
                      withEdges
                      color="orange"/>
        </div>
      </ScrollArea> : <>
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />

      </>}
      <AddRoomModal isShown={isAddModalShown} handleShown={setAddModalShown}/>
    </AdminLayout>
  );


}

const useStyles = createStyles({
  tableSearchHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
})
/*
* <tr>
              <td>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
* */

export default RoomsManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      assa: null,
    }
  };
}
