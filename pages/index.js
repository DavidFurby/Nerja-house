
import HomeStyle from "../styles/Home.module.css"
import { useFrontPage } from "../utils/firebase/context/FrontPageContext"

export default function Home() {
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
