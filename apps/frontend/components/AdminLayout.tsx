import styles from './admin-layout.module.scss';
import {NavbarSimpleColored} from "./NavBar";
import {HeaderSearch} from "./Header";
import React from "react";

const AdminLayout: React.FC<React.ReactNode> = (props) => {
  return (
    <>
      <div className={styles.page}>
        <NavbarSimpleColored/>
        <div style={{
          width: '100%'
        }}>
          <HeaderSearch links={[{link: 'ass', label: 'Thư viện đại học FPT'}]}/>
          <div className="wrapper">

              {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
