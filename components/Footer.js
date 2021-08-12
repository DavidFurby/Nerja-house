import Water from "./Water";
import { UseFrontPage } from "../utils/firebase/context/FrontPageContext";

const Footer = () => {
  const { contactInformation } = UseFrontPage();
  return (
    <>
      {contactInformation.length > 0 ? (
        <div className="footerDiv">
          <footer>
            <p>
              Email: {contactInformation[0].email}
              <br />
              Mobil: {contactInformation[0].phone} {contactInformation[0].phoneSecondary}
            </p>
          </footer>
          <Water />
        </div>
      ) : null}
    </>
  );
};

export default Footer;
