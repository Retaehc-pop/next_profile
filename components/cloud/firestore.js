import firebase from "firebase/compat/app";
import "firebase/firestore"

function WriteFirebase() {
    const sendData = () => {
        try{
            firebase.firestore()
            .collection('webInfo')
            .doc('stats')
            .set({
                visited:0
            })
        }
        catch(error){
            console.log(error)
            alert(error)
        }
    }
     return (<button onClick={sendData()}>click test</button>);
}
function ReadFirebase() {
    const readData = () => {
        firebase.firestore()
        .collection()
        .doc()
        .onSnapshot(function (doc) {
            console.log(doc.data())
        })
    }
    return <button onClick={readData}>click to recieve</button>
}
 export default WriteFirebase;
//  export default read;