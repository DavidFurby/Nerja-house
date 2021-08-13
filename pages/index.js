import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import FrontPageCards from "../components/FrontPageCards";
import {  UseInformation } from "../utils/firebase/context/InformationContext";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages, contactInformation } = UseInformation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [frontPageImages]);
  return (
    <>
      {!loading ? (
        <div style={{padding: "4rem"}}>
        
          <FrontPageCards images={frontPageImages} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Home;
