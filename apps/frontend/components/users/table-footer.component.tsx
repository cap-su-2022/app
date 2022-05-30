import React from "react";
import {createStyles, Pagination} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changePageIndex} from "../../redux/features/user/user.slice";

const TableFooter: React.FC = () => {
  const {classes} = useStyles();

  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.user.currentPage);
  const totalPage = useAppSelector((state) => state.user.totalPage);

  const handleChangePageIndex = (index: number) => {
    dispatch(changePageIndex(index));
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
