import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {Button, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {wrapper} from "../redux/store";
import Spinner from "../components/spinner";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dead</title>
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
        </MantineProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
