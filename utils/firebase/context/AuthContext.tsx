import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "../initFirebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

initFirebase();

const UseAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  async function logout() {
    try {
      firebase
        .auth()
        .signOut()
        .then((res) => {
          setCurrentUser(null);
        });
    } catch (error) {
      error.message;
    }
  }

  const login = async (email: string, password: string) => {
    if (email && password) {
      try {
        return await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((UserCredentials) => {
            setCurrentUser(UserCredentials.user);
            return currentUser;
          })
          .catch((error) => {
            return error.code + " " + error.message;
          });
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
