import { useEffect, useState } from "react";
import  StyledFirebaseAuth  from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import {
    getAuth,GoogleAuthProvider,TwitterAuthProvider,GithubAuthProvider,EmailAuthProvider} from 'firebase/auth'
import { setUserCookie } from "../../firebase/userCookies"
import { userData } from "../../firebase/userData"
import initFirebase from "../../firebase/initFirebase";

initFirebase()
const auth = getAuth()

const AuthenticationConfig = {
    signInFlow:"pop-up",
    signInOptions:[
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl:"/",
    credentialHelper:"none",
    callbacks:{
        signInSuccessWithAuthResult: async ({user},redirectUrl) => {
            const userDatas = userData(user)
            setUserCookie(userDatas)
        }
    },
}

function Authentication () {
    const [renderAuth, setRenderAuth] = useState(false)

    useEffect(()=>{
        if (typeof window !== 'undefined'){
            setRenderAuth(true)
        }
    }, [])

    return (<div>
        {
            renderAuth ? (
                <StyledFirebaseAuth 
                uiConfig={AuthenticationConfig}
                firebaseAuth={firebase.auth()} />
            ) : null
        }
        </div>)

}
export default Authentication;