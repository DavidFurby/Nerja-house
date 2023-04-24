import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import FrontPageCards from "../components/front_page_card";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import ScreenContext from "../utils/context/ScreenContext";
import Booking from "./booking";
import ReadMore from "./readMore";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages } = UseInformation();
  const isMobile = useContext(ScreenContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      AOS.init();
      AOS.refresh();
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);
  return (
    <>
      {!loading ? (
        <div className="content">
          <div id="cards">
            <FrontPageCards images={frontPageImages} isMobile={isMobile} />
          </div>
          <div id="booking">
            <Booking />
          </div>
          <div id="readMore">
            <ReadMore />¨
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Home;
