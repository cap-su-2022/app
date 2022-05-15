import styles from './admin-layout.module.scss';
import {NavbarSimpleColored} from "./NavBar";
import {HeaderSearch} from "./Header";
import React from "react";

const AdminLayout: React.FC<React.ReactNode> = (props) => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
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
