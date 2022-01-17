import { useEffect, useState } from "react";
import  StyledFirebaseAuth  from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import 'firebase/auth'
import { setUserCookie } from "../../firebase/userCookies"
import { mapUserData } from "../../firebase/mapuserData"
import initFirebase from "../../firebase/initFirebase";
initFirebase()

const AuthenticationConfig = {
    signInFlow:"pop-up",
    signInOption:[
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl:"/",
    credentailHelper:"None",
    callbacks:{
        signInSuccessWithAuthResult: async ({user},redirectUrl) => {
            const userData = mapUserData(user)
            setUserCookie(userData)
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