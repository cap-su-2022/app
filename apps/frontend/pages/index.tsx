import styles from "./index.module.scss";
import { WebNextRequest } from "next/dist/server/base-http/web";
import axios from "axios";

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
  const request = context.req as WebNextRequest;
  const accessToken = request.cookies["accessToken"];
  const refreshToken = request.cookies["refreshToken"];

  try {
    axios.get(`http://localhost:5000/api/v1/health/auth`, {
      headers: {
        "Authorization": accessToken
      }
    });
    return {
      redirect: {
        destination: `/`,
        permanent: true
      }
    };
  } catch (e) {
    try {
      axios.post(`http://localhost:5000/api/v1/health/auth`, {
        refreshToken: refreshToken
      });
    } catch (e) {

    }
  }
  return {
    redirect: {
      destination: `login`,
      permanent: true
    }
  };

};

export default Index;
