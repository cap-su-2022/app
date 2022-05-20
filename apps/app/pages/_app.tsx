import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {Button, ColorSchemeProvider, MantineProvider, Modal} from '@mantine/core';
import {wrapper} from "../redux/store";
import Spinner from "../components/spinner";
import {useEffect, useState} from "react";
import axios from "axios";
import SystemErrorModal from "../components/system-error.modal";
import {useAppDispatch} from "../redux/hooks";
import {setSystemErrorMessage} from "../redux/features/system/system.slice";
import {useRouter} from "next/router";

function CustomApp({ Component, pageProps }: AppProps) {

  const [isSystemErrorModalShown, setSystemErrorModalShown] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();


  useEffect(() => {
    const interval = setInterval(() => {
      if (router.route === '/asslogin') {
        axios.get('/api/health/auth').catch(({response}) => {
          if (response.status === 500) {
            dispatch(setSystemErrorMessage("Internal Server Error"));
            setSystemErrorModalShown(true);
          }
          if (response.status === 401 || response.status === 403) {
            dispatch(setSystemErrorMessage("Your session has expired! Please login again."));
            setSystemErrorModalShown(true);
          }
        });
      }
    }, 15000);
    return () => {
      clearInterval(interval);
    }
  })

  return (
    <>
      <Head>
        <title>
          FPTU Library Room Booking
        </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <main className="app">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >

              <Spinner/>
              <Component {...pageProps} />
          <SystemErrorModal
            opened={isSystemErrorModalShown}
            handleClose={async () => {
              setSystemErrorModalShown(!isSystemErrorModalShown);
              await router.replace('/');
            }}/>
        </MantineProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
