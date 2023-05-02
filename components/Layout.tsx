import Navbar from "./navigation_bar";
import Head from "next/head";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Head>
        <title>Casa Anna</title>
        <meta content="Nerja" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
