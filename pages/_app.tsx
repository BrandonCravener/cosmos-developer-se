import '../styles/globals.css';
import '@fontsource/roboto';

import { amber, grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { Provider } from 'next-auth/client';
import React from 'react';

import Layout from '../components/layout/layout';

const MyApp = function ({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: amber[500],
      },
      secondary: {
        main: grey[700],
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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </Layout>
  );
};

export default MyApp;
