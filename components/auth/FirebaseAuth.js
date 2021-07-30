import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase/app"
import "firebase/auth"
import { setUserCookie } from "../../utils/firebase/userCookies"
import { mapUserData } from "../../utils/firebase/mapUserData"

import intiFirebase from "../../utils/firebase/initFirebase"

intiFirebase()

const FirebaseAuthConfig = {
    signInFlow: "popup",
    signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
    }],
    signInSuccessUrl: "/admin",
    credentialHelper: "none",
    callbacks: {
        signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
            const userData = mapUserData(user)
            setUserCookie(userData);

        }
    }
}
const FirebaseAuth = () => {
    const [renderAuth, setRenderAuth] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth uiConfig={FirebaseAuthConfig} firebaseAuth={firebase.auth()} />
            ) : null}
        </div>)
}
export default FirebaseAuth;