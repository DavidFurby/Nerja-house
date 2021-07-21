import Footer from "./Footer";
import Navbar from "./NavigationBar";
import Head from "next/head"
const Layout = ({ children }) => {
    return (
        <div className="content">
            <Head><title>Portfolio</title>    
                <meta name="keywords" content="portfolio" />
            </Head>
            <Navbar />
            {children}
            < Footer />
        </div>);
}

export default Layout;