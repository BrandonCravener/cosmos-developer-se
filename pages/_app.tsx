import '../styles/globals.css';
import '@fontsource/roboto';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from "../components/layout/layout";
import { Provider } from 'next-auth/client';
import React from 'react';
import purple from '@material-ui/core/colors/purple';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Layout>
  );
}

export default MyApp;
