import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import FrontPageCards from "../components/FrontPageCards";

const Home = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return <>{!loading ? <FrontPageCards /> : <Spinner />}</>;
};
export default Home;
