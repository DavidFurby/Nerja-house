import Navbar from "./navigation_bar";
import Head from "next/head";
import BackgroundShapes from "./backgroundShapes";
const Layout = ({ children }) => {
  console.log("test");
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="Nerja" />
      </Head>
      <Navbar />
      {children}
      <BackgroundShapes />
    </div>
  );
};

export default Layout;
