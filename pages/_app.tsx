import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'next-auth/client'
import Layout from "../components/layout"
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css'
import '@fontsource/roboto'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider session={pageProps.session}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </Layout>
  )
}

export default MyApp
