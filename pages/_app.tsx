import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/layout/layout';
import lightBlue from '@material-ui/core/colors/lightBlue';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import '@fontsource/roboto';


function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#FF6F00',
      },
      secondary: lightBlue,
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
