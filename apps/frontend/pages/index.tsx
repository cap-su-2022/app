import styles from './index.module.scss';
import {NavbarSimpleColored} from '../components/NavBar';
import {HeaderSearch} from '../components/Header';
import {GetServerSideProps} from 'next';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      <div className={styles.page}></div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  return {
    redirect: {
      basePath: `${context.req.url}/login`,
      permanent: true,
    },
  };
};

export default Index;
