import firebase from "firebase/app";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import initFirebase from "../../firebase/initFirebase";

initFirebase();

const UseFrontPage = () => {
  const [frontPageImages, setFrontPageImages] = useState([]);
  const [contactInformation, setContactInformation] = useState([]);
  async function fetchImages() {
    const images = await firebase
      .firestore()
      .collection("frontPageImages")
      .get();
    if (images) {
      try {
        const imageInformation = images.docs.map((image) => {
          const data = image.data();
          const id = image.id;
          return { id, ...data };
        });
        setFrontPageImages(imageInformation);
      } catch (err) {
        err;
      }
    }
  }
  async function fetchContactInformation() {
    const tempInfo = await firebase
      .firestore()
      .collection("contactInformation")
      .get();
    if (tempInfo) {
      try {
        const fetchedInfo = tempInfo.docs.map((image) => {
          const data = image.data();
          const id = image.id;
          return { id, ...data };
        });
        setContactInformation(fetchedInfo);
      } catch (err) {
        err;
      }
    }
  }
  useEffect(() => {
    fetchImages();
    fetchContactInformation();
  }, []);
  return { frontPageImages, contactInformation };
};

export { UseFrontPage };
