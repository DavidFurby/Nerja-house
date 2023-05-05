import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import ScreenContext from "../utils/context/ScreenContext";
function MyApp({ Component, pageProps }) {
  let [isMobile, setIsMobile] = useState<boolean>(null);
  const getMobileState = () => {
    let mobileTemp : MediaQueryList = window.matchMedia("(max-width: 800px)");
    if (mobileTemp) {
      setIsMobile(mobileTemp.matches);
    }
  };
  useEffect(() => {
    getMobileState();
    window.addEventListener("resize", getMobileState);
    
    return () => {
      window.removeEventListener("resize", getMobileState);
    };
  });
  return (
    <ScreenContext.Provider value={isMobile}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ScreenContext.Provider>
  );
}

export default MyApp;
