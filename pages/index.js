import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import FrontPageCards from "../components/FrontPageCards";
import { UseFrontPage } from "../utils/firebase/context/FrontPageContext";

const Home = () => {
  let [loading, setLoading] = useState(true);
  let [images, setImages] = useState();
  const { frontPageImages } = UseFrontPage();
  const getImages = async () => {
    let tempImages = await frontPageImages;
    if (tempImages) {
      setImages(tempImages);
    }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    getImages();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [frontPageImages]);
  return (
    <>
      {!loading && images ? (
        <div style={{padding: "4rem"}}>
          <h1
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            Stort hus i Nerja - nära Burriana
          </h1>
          <FrontPageCards images={images} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Home;
