import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { UseInformation } from "../utils/firebase/context/InformationContext";
import Description from "./Description";
const ReadMore = () => {
  const { houseDescription } = UseInformation();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div
      style={{
        padding: "4rem",
        paddingBottom: "8rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {houseDescription.text ? (
        <div>
          <h1
            style={{ textAlign: "center" }}
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            Information
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="800"
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
