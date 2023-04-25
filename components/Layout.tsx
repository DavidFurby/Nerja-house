import Navbar from "./navigation_bar";
import Head from "next/head";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="Nerja" />
      </Head>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
