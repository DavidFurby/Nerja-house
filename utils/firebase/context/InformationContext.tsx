import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect, SetStateAction } from "react";
import initFirebase from "../initFirebase";

initFirebase();

const UseInformation = () => {
  const [introductionImage, setIntroductionImage] = useState({ image: "" });
  const [frontPageImages, setFrontPageImages] = useState([]);
  const [contactInformation, setContactInformation] = useState([]);
  const [houseDescription, setHouseDescription] = useState({
    id: "",
    title: "",
    text: [],
    subTitle: "",
  });

  const fetchData = async (
    collectionName: string,
    setState: {
      (value: SetStateAction<any[]>): void;
      (value: SetStateAction<any[]>): void;
      (data: any): void;
      (arg0: { id: string }[]): void;
    }
  ) => {
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
      setIntroductionImage({ image: data[0].image });
    }),
      fetchData("frontPageImages", setFrontPageImages),
      fetchData("contactInformation", setContactInformation),
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
