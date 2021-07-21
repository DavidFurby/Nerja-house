import Footer from "./Footer";
import Navbar from "./NavigationBar";
import Head from "next/head"
const Layout = ({ children }) => {
    return (
        <div className="content">
            <Head><title>Nerja hus</title>    
                <meta  content="nerja" />
            </Head>
            <Navbar />
            {children}
            < Footer />
        </div>);
}

export default Layout;