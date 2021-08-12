import Navbar from "./NavigationBar";
import Head from "next/head";
import Footer from "./Footer";
const Layout = ({ children }) => {
  
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="nerja" />
      </Head>
      <Navbar />
      <backgroundShapes />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
