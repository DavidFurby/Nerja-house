import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Layout children={undefined}> 
    <Component {...pageProps} />
    </Layout>
}

export default MyApp
