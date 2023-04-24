import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import Description from "./description";
const ReadMore = () => {
  const { houseDescription } = UseInformation();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem", 
        paddingBottom: "8rem",
      }}
    >
      {houseDescription.text ? (
        <div
       
        >
          <h1
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            Information
          </h1>

          <div
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="00"
            data-aos-duration="2000"
          >
            <Description desc={houseDescription.text} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReadMore;
