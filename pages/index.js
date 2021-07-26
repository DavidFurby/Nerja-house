import pool from "../public/images/Pool.PNG"
import balcony from "../public/images/Altan.png"
import ceiling from "../public/images/tak.PNG"
import livingRoom from "../public/images/vardagsrum.PNG"
import HomeStyle from "../styles/Home.module.css"

export default function Home() {
  const cards = [{ title: "Pool", subText: "Lorem ipsum dolor sit amet", image: pool }, { title: "balcony", subText: "Lorem ipsum dolor sit amet", image: balcony }, { title: "Ceiling", subText: "Lorem ipsum dolor sit amet", image: ceiling }, { title: "Living Room", subText: "Lorem ipsum dolor sit amet", image: livingRoom }]
  return (
    <div className={HomeStyle.container} >

      {
        cards.map((card, index) => {
          return (
            <div className={HomeStyle.card} key={index} style={{ backgroundImage: "url(" + card.image.src + ")" }}>
              <div className={HomeStyle.cardContent}>
                <h2 className={HomeStyle.title}>{card.title}</h2>
                <p className={HomeStyle.subText}>{card.subText}</p>
              </div>
            </div>
          )

        })
      }
    </div>
  )

}
