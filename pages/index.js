import { Container } from 'react-bootstrap'
import Image from "next/image"
import Pool from "../public/images/Pool.PNG"
import Altan from "../public/images/kök.png"
import tak from "../public/images/tak.png"
import vardagsrum from "../public/images/vardagsrum.png"
export default function Home() {
  return (
    <Container>
            <Image src={Pool} alt="Picture of the author" />
            <Image src={Altan} alt="Picture of the author" />

            <Image src={tak} alt="Picture of the author" />

            <Image src={vardagsrum} alt="Picture of the author" />

    </Container>
  )
}
