import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import {Button, MantineProvider} from '@mantine/core';
import Link from 'next/link';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
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
          <Component {...pageProps} />
        </MantineProvider>
      </main>
    </>
  );
}

export default CustomApp;
