import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "../initFirebase";
import { useState, useEffect } from "react";

initFirebase();

const UseAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  async function logout() {
    try {
      await firebase.auth().signOut();
      setCurrentUser({});
    } catch (error) {
     error.message;
    }
  }

  const login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        firebase.auth().currentUser.getIdToken(true);
        const userStatus = await firebase.auth().currentUser.getIdTokenResult();
        userStatus;
        if (response) {
          setCurrentUser({
            claims: { ...userStatus.claims },
          });
          return {
            success: true,
            response: response,
            userStatus: userStatus.claims,
          };
        }
      } catch (error) {
        error;
      }
    }
  };

  useEffect(() => {

      const unsubscribe = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const userStatus = await user.getIdTokenResult();
            userStatus.claims;
            setCurrentUser({
              email: userStatus.claims.email,
            });
          } else {
            logout();
          }
        });
      };
      unsubscribe();
  

    return () => unsubscribe();
  }, []);

  return { login, currentUser, logout };
};

export { UseAuth };
