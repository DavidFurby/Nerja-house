import Image from "next/image"
import Pool from "../public/images/Pool.PNG"
import Altan from "../public/images/Altan.png"
import tak from "../public/images/tak.png"
import vardagsrum from "../public/images/vardagsrum.png"
import HomeStyle from "../styles/Home.module.css"

export default function Home() {
  let imageArr = [Pool, Altan, tak, vardagsrum]
  return (
    <div className={HomeStyle.container}>
      {imageArr.map((data, index) => {
        return (
          <div className={HomeStyle.item}>
          <Image  key={index} src={data} alt={index}  />
          </div>
        )
      })}
    </div>
  )
}
