import Navbar from "./NavigationBar";
import Head from "next/head";
import BackgroundShapes from "./background_shapes";
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
      <BackgroundShapes />
      <Footer/>
    </div>
  );
};

export default Layout;
