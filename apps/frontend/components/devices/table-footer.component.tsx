import React from 'react';
import { createStyles, Pagination } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const TableFooter: React.FC = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.device.currentPage);
  const totalPage = useAppSelector((state) => state.device.totalPage);

  const handleChangePageIndex = (index: number) => {
    return;
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        total={totalPage}
        page={activePage}
        onChange={(e) => handleChangePageIndex(e)}
        withEdges
        color="orange"
      />
    </div>
  );
};

const useStyles = createStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default TableFooter;
