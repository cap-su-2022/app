import styles from './admin-layout.module.scss';
import { NavbarSimpleColored } from './NavBar';
import { HeaderSearch } from './Header';
import React, { ReactNode } from 'react';
import { createStyles } from '@mantine/core';

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const { classes } = useStyles();
  return (
    <>
      <div className={styles.page}>
        <NavbarSimpleColored />
        <div
          style={{
            width: '100%',
          }}
        >
          <HeaderSearch
            links={[{ link: 'ass', label: 'Thư viện đại học FPT' }]}
          />
          <div className={classes.wrapper}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      marginLeft: 20,
      marginRight: 20,
    },
  };
});

export default AdminLayout;
