import firebase from "firebase/app";
import "firebase/firestore";
import React, { useState, useEffect } from "react";
import initFirebase from "../initFirebase";

initFirebase();

const UseInformation = () => {
  const [frontPageImages, setFrontPageImages] = useState([]);
  const [contactInformation, setContactInformation] = useState([]);
  const [houseDescription, setHouseDescription] = useState({});
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
        const fetchedInfo = tempInfo.docs.map((info) => {
          const data = info.data();
          const id = info.id;
          return { id, ...data };
        });
        setContactInformation(fetchedInfo);
      } catch (err) {
        err;
      }
    }
  }
  async function fetchDescription() {
    const tempDesc = await firebase
      .firestore()
      .collection("houseDescription")
      .get();
    if (tempDesc) {
      try {
        const fetchedDesc = tempDesc.docs.map((image) => {
          const data = image.data();
          const id = image.id;
          return { id, ...data };
        });
        setHouseDescription(fetchedDesc[0]);
      } catch (err) {
        err;
      }
    }
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      fetchImages();
      fetchContactInformation();
      fetchDescription();
    }
    return function cleanup() {
      mounted = false; 
    }
  }, []);
  
  return { frontPageImages, contactInformation, houseDescription };
};

export { UseInformation };
