import firebase from "firebase/app"
import "firebase/firestore"
import React, { useContext, useState, useEffect, createContext } from "react";
import initFirebase from "../../firebase/initFirebase";

initFirebase(); 

const useFrontPage = () => {
    const [frontPageImages, setFrontPageImages] = useState([]);
    async function fetchImages() {
        const images = await firebase.firestore().collection("frontPageImages").get();
        if (images) {
            try {
                const imageInformation = images.docs.map((image) => {
                    const data = image.data();
                    const id = image.id;
                    return { id, ...data };
                });
                    setFrontPageImages(imageInformation)

             
            } catch (err) {
                (err);
            }
        }
    }
    useEffect(() => {
        fetchImages(); 
    }, [])
    return {frontPageImages}
}

export {useFrontPage}


