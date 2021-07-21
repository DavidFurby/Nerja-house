import Image from "next/image"
import pool from "../public/images/Pool.PNG"
import balcony from "../public/images/Altan.png"
import ceiling from "../public/images/tak.png"
import livingRoom from "../public/images/vardagsrum.png"
import HomeStyle from "../styles/Home.module.css"

export default function Home() {
  let imageArr = [pool, balcony, ceiling, livingRoom]
  return (
    <div className={HomeStyle.container}>
      {imageArr.map((data, index) => {
        return (
          <div key={index}>
          <Image className={HomeStyle.item}  src={data} alt={index} />
          </div>
        )
      })}
    </div>
  )
}
