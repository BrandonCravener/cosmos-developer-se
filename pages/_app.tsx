import '../styles/globals.css'
import '@fontsource/roboto'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AppProps } from 'next/dist/next-server/lib/router/router'
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from "../components/layout"
import { Provider } from 'next-auth/client'
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <Layout>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Layout>
  )
}

export default MyApp
