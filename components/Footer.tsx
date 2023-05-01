import { UseInformation } from "../utils/firebase/context/InformationContext";
const Footer = () => {
  const { contactInformation } = UseInformation();
  return (
    <>
      <footer>
        <p>
          Email: {contactInformation.email}
            <br /> Mobil: {contactInformation.phone}
          <br />
          {contactInformation.phoneSecondary}
        </p>
      </footer>
    </>
  );
};

export default Footer;
