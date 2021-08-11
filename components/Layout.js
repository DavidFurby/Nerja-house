import Navbar from "./NavigationBar";
import Head from "next/head";
import Water from "./Water";
import backgroundShapes from "./backgroundShapes"
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="nerja" />
      </Head>
      <Navbar />
      <backgroundShapes/>
      {children}
      <Water/>
    </div>
  );
};

export default Layout;
