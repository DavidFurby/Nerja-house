import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";
import initFirebase from "../initFirebase";

initFirebase();

interface HouseDescription {
  id: string;
  title: string;
  text: [];
  subTitle: "";
}
interface ContactInformation {
  email: string;
  phone: "";
  phoneSecondary: "";
}

const UseInformation = () => {
  const [introductionImage, setIntroductionImage] = useState<string>("");
  const [frontPageImages, setFrontPageImages] = useState<[]>([]);
  const [contactInformation, setContactInformation] = useState<
    ContactInformation
  >({ email: "", phone: "", phoneSecondary: "" });
  const [houseDescription, setHouseDescription] = useState<HouseDescription>({
    id: "",
    title: "",
    text: [],
    subTitle: "",
  });

  const fetchData = async (collectionName: string, setState) => {
    const data = await firebase
      .firestore()
      .collection(collectionName)
      .get();
    if (data) {
      try {
        let res = data.docs.map((doc) => {
          const docData = doc.data();
          const id = doc.id;
          return { id, ...docData };
        });
        setState(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData("introductionImages", (data) => {
      setIntroductionImage(data[0].image);
    }),
      fetchData("frontPageImages", setFrontPageImages),
      fetchData("contactInformation", (data) => {
        setContactInformation({
          email: data[0].email,
          phone: data[0].phone,
          phoneSecondary: data[0].phoneSecondary,
        });
      }),
      fetchData("houseDescription", (data) => {
        setHouseDescription({
          id: data[0].id,
          title: data[0].title,
          text: data[0].text,
          subTitle: data[0].subTitle,
        });
      });
  }, []);
  return {
    introductionImage,
    frontPageImages,
    contactInformation,
    houseDescription,
  };
};

export { UseInformation };
