import React from "react";
import {createStyles, Pagination} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeRoomsCurrentPage} from "../../redux/features/room/room.slice";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";

const TableFooter: React.FC = () => {

  const {classes} = useStyles();

  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.room.currentPage);
  const totalPage = useAppSelector((state) => state.room.totalPage);

  const handleChangePageIndex = (index: number) => {
    dispatch(changeRoomsCurrentPage(index));
  }

  return (
    <div className={classes.pagination}>
      <Pagination total={totalPage} page={activePage}
                  onChange={(e) => handleChangePageIndex(e)}
                  withEdges
                  color="orange"/>
    </div>
  );
};

const useStyles = createStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default TableFooter;
