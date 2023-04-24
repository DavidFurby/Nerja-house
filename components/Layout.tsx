import Navbar from "./navigation_bar";
import Head from "next/head";
import BackgroundShapes from "./backgroundShapes";
import Footer from "./footer";
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="Nerja" />
      </Head>
      <Navbar />
      {children}
      <BackgroundShapes />
      <Footer/>
    </div>
  );
};

export default Layout;
