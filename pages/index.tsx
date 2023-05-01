import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import FrontPageCards from "../components/front_page_cards";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import Booking from "../components/booking";
import ReadMore from "../components/read_more";
import Introduction from "../components/introduction";
import Contact from "../components/contact";

const Home = () => {
  let [loading, setLoading] = useState<boolean>(true);
  const { frontPageImages, introductionImage } = UseInformation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 200);

    return function cleanup() {};
  }, []);
  return (
    <>
      {!loading ? (
        <>
          <div id="introduction">
            <Introduction image={introductionImage} />
          </div>
          <div id="cards">
            <FrontPageCards images={frontPageImages} />
          </div>
          <div id="readMore">
            <ReadMore />
          </div>
          <div id="booking">
            <Booking />
          </div>

          <div id="contact">
            <Contact />
          </div>
        </>
      ) : null}
    </>
  );
};
export default Home;
