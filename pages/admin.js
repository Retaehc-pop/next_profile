
import firebase from 'firebase/compat/app'
import 'firebase/firestore';
import { useState, useRef } from 'react';
import { useUser } from '../firebase/useUser'
import Link from "next/link";
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.css';

const WriteToCloud = () => {
    const sendData = (project,info) => {
        try{
            firebase.firestore()
            .collection('projects')
            .doc().set(
                info
                ).then(alert('saving project',project))
        }catch(error){
            console.log(error)
            alert(error)
        }
    }
}

// function UploadData (){
//     const [val,setVal] = useState(0)
//     const inputEl = useRef(null)
//     function uploadFile() {
//         var file = inputEl.current.files[0]
//         var storageRef = firebase.storage().ref('projects')
//         var task = storageRef.put(file)
//         task.on('state_change',
//         function progress(snapshot){
//             setVal((snapshot.bytesTransferred/snapshot.totalBytes)*100)
//         },
//         function error(err){
//             alert(error)
//         },
//         function complete(){
//             alert('upload complete')
//         })
//     }
//     return (
//         <div>
//             <progress value={val} max="100"></progress>
//             <input type="text"></input>
//             <input></input>
//             <input></input>
//             <input></input>
//             <input></input>
//             <input></input>
//             <input type='file' ref={inputEl}/>
//             <button onClick={uploadFile}>Upload Data</button>
//         </div>
//     )
// }
export default function Admin() {
    
    const { user, logout } = useUser()
    
    //file
    const [val,setVal] = useState(0)
    const inputEl = useRef(null)

    const sendData = (project,info) => {
        try{
            firebase.firestore()
            .collection('projects')
            .doc().set(
                info
                ).then(alert('saving project',project))
        }catch(error){
            console.log(error)
            alert(error)
        }
    }

    function uploadFile() {
        var file = inputEl.current.files[0]
        var storageRef = firebase.storage().ref('projects')
        var task = storageRef.put(file)
        task.on('state_change',
        function progress(snapshot){
            setVal((snapshot.bytesTransferred/snapshot.totalBytes)*100)
        },
        function error(err){
            alert(error)
        },
        function complete(){
            alert('upload complete')
        })
    }
    function testest (profile,data,qwe) {
        console.log(profile)
        console.log(data)
        console.log(qwe)
    }
    
    if (user) {
        return (
            <Layout>
                <main className={styles.main}>
                    <section>
                        <h1>Admin</h1>
                        <input type='file' ref={inputEl}/>
                        <progress value={val} max="100"></progress>
                        <button onClick={uploadFile}>Upload Data</button>
                        <button onClick={testest('qwe',2,3)}>test</button>
                    </section>
                </main>
            </Layout>
        )
    }
    else {
        return (
        <Layout>
            <main className={styles.main}>
                <section>
                    <h1> You don't have access to this directory</h1>
                    <h1><Link href='/login'> Login </Link></h1>
                </section>
            </main>
        </Layout>
        );
    }
    
}
