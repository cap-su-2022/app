import styles from './admin-layout.module.scss';
import {NavbarSimpleColored} from "./NavBar";
import {HeaderSearch} from "./Header";
import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
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
