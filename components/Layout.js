import Navbar from "./NavigationBar";
import Head from "next/head";
import BackgroundShapes from "./backgroundShapes";
import Water from "./Water";
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>Nerja hus</title>
        <meta content="nerja" />
      </Head>
      <Navbar />
      <BackgroundShapes />
      {children}
      <Water />
    </div>
  );
};

export default Layout;
