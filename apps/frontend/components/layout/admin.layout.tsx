import styles from '../admin-layout.module.scss';
import React, { ReactNode } from 'react';
import { createStyles } from '@mantine/core';
import { LayoutHeader } from './header.layout';
import LayoutSidebar from './sidebar.layout';
import LayoutFooter from './footer.layout';

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const { classes } = useStyles();
  return (
    <>
      <div className={styles.page}>
        <LayoutSidebar />

        <div className={classes.headerRight}>
          <LayoutHeader />
          <div className={classes.wrapper}>{props.children}</div>
        </div>
      </div>
      <LayoutFooter links={[]} />
    </>
  );
};

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      marginLeft: 20,
      marginRight: 20,
    },
    headerRight: {
      width: '100%',
    },
  };
});

export default AdminLayout;
