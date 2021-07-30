import pool from "../public/images/Pool.PNG"
import balcony from "../public/images/Altan.png"
import ceiling from "../public/images/tak.PNG"
import livingRoom from "../public/images/vardagsrum.PNG"
import HomeStyle from "../styles/Home.module.css"
import { useUser } from "../utils/firebase/useUser"
import { useFrontPage } from "../utils/firebase/context/FrontPageContext"

export default function Home() {

  const { user, logout } = useUser();
  const cards = [{ title: "Pool", subText: "Lorem ipsum dolor sit amet", image: pool }, { title: "balcony", subText: "Lorem ipsum dolor sit amet", image: balcony }, { title: "Ceiling", subText: "Lorem ipsum dolor sit amet", image: ceiling }, { title: "Living Room", subText: "Lorem ipsum dolor sit amet", image: livingRoom }]
 
  const {frontPageImages} = useFrontPage(); 
  return (
    <div className={HomeStyle.container} >
      {
        frontPageImages.map((card, index) => {
          return (
            <div className={HomeStyle.card} key={index} style={{ backgroundImage: "url(" + card.image + ")" }}>
              <div className={HomeStyle.cardContent}>
                <h2 className={HomeStyle.title}>{card.name}</h2>
                <p className={HomeStyle.subText}>{card.subText}</p>
              </div>
            </div>
          )

        })
      }
    </div>
  )

}
