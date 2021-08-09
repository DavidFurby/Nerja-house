
import HomeStyle from "../styles/Home.module.css"
import { UseFrontPage } from "../utils/firebase/context/FrontPageContext"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const Home = () => {
  const { frontPageImages } = UseFrontPage();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {!loading ? <div className={HomeStyle.container} >
        <h1 data-aos="fade-in" data-aot-once="true" data-aos-delay="500" data-aos-duration="2000"
        >Stort hus i Nerja - nära Burriana
        </h1>
        {
          frontPageImages.map((card, index) => {
            return (
              <div data-aos="fade-up" className={HomeStyle.card} key={index} style={{ backgroundImage: "url(" + card.image + ")", alignSelf: index % 2 !== 0 ? "flex-end" : "flex-start" }}>
                <div className={HomeStyle.cardContent}>
                  <h2 className={HomeStyle.title}>{card.name}</h2>
                  <p className={HomeStyle.subText}>{card.subText}</p>
                </div>
              </div>
            )

          })
        }
      </div> : null}

    </>
  )

}
export default Home;