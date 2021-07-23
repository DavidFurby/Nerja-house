import Footer from "./Footer";
import Navbar from "./NavigationBar";
import Head from "next/head"
import BackgroundShapes from "./backgroundShapes";
const Layout = ({ children }) => {
    return (
        <div className="content">
            <Head><title>Nerja hus</title>
                <meta content="nerja" />
            </Head>
            <Navbar />
            <BackgroundShapes />
            {children}
            < Footer />
        </div>);
}

export default Layout;