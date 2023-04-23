import readMoreStyle from "../styles/readMore.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import Spinner from "../components/spinner";
import Description from "../components/Description";
const ReadMore = () => {
  const { houseDescription } = UseInformation();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      {houseDescription.text ? (
        <div className={readMoreStyle.container}>
          <h1 
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            {houseDescription.title}
          </h1>
          <h4   data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="600"
            data-aos-duration="2000">{houseDescription.subTitle}</h4>
          <Description  desc={houseDescription.text}/>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ReadMore;
