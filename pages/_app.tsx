import '../styles/globals.css';
import '@fontsource/roboto';

import { useMediaQuery } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';

import Layout from '../components/layout/layout';




declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}




declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        main: '#FF6F00',
      },
      secondary: {
        main: lightBlue[500]
      }
    },
  }));

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
}

export default MyApp;
