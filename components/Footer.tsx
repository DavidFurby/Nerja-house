import Water from "./water";
import { UseInformation } from "../utils/firebase/context/InformationContext";

const Footer = () => {
  const { contactInformation } = UseInformation();
  return (
    <>
      {contactInformation.length > 0 ? (
        <footer>
          <p>
            Email: {contactInformation[0].email}
            <br /> Mobil: {contactInformation[0].phone}
            <br />
            {contactInformation[0].phoneSecondary}
          </p>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;
