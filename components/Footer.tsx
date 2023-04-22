import Water from "./Water";
import { UseInformation } from "../utils/firebase/context/InformationContext";

const Footer = () => {
  const { contactInformation } = UseInformation();
  return (
    <>
      {contactInformation.length > 0 ? (
     
          <footer>
            <p>Email: {contactInformation[0].email}     
            <br/>  Mobil: {contactInformation[0].phone}
            <br/>
              {contactInformation[0].phoneSecondary}</p>
              <Water />

          </footer>
    
      ) : null}
    </>
  );
};

export default Footer;
