import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import FrontPageCards from "../components/FrontPageCards";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import ScreenContext from "../utils/context/ScreenContext";
import Booking from "../components/booking";
import ReadMore from "../components/read_more";
import Introduction from "../components/Introduction";
import Contact from "../components/Contact";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages, introductionImage } = UseInformation();
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
          <div id="introduction">
            <Introduction image={introductionImage} />
          </div>
          <div id="cards">
            <FrontPageCards images={frontPageImages} isMobile={isMobile} />
          </div>
          <div id="booking">
            <Booking />
          </div>
          <div id="readMore">
            <ReadMore />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Home;
