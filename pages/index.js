import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import FrontPageCards from "../components/FrontPageCards";
import { UseInformation } from "../utils/firebase/context/InformationContext";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages } = UseInformation();
  let [isMobile, setIsMobile] = useState();

  const getMobileState = () => {
    let mobileTemp = window.matchMedia("(max-width: 600px)");
    if (mobileTemp) {
      setIsMobile(mobileTemp.matches);
    }
  };


  const person = {
    firstName: 'test',
    actor: true,
    age: 54
  }
  const {firstName: name, age} = person;

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
          <FrontPageCards images={frontPageImages} isMobile={isMobile}/>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Home;
