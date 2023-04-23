import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import FrontPageCards from "../components/front_page_card";
import { UseInformation } from "../utils/firebase/context/InformationContext";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages } = UseInformation();
  let [isMobile, setIsMobile] = useState(undefined);

  const getMobileState = () => {
    let mobileTemp = window.matchMedia("(max-width: 800px)");
    if (mobileTemp) {
      setIsMobile(mobileTemp.matches);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", getMobileState);
  });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      AOS.init();
      AOS.refresh();
      getMobileState();
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
        <div>
          <FrontPageCards images={frontPageImages} isMobile={isMobile} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Home;
