import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import FrontPageCards from "../components/FrontPageCards";
import { UseInformation } from "../utils/firebase/context/InformationContext";

const Home = () => {
  let [loading, setLoading] = useState(true);
  const { frontPageImages } = UseInformation();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      AOS.init();
      AOS.refresh();

      setLoading(false);
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);
  return (
    <>
      {!loading ? (
        <div style={{ padding: "4rem" }}>
          <FrontPageCards images={frontPageImages} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Home;
