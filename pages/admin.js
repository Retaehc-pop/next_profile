
// import firebase from 'firebase/compat/app'
// import 'firebase/firestore';
import { useState, useRef } from 'react';
import { useUser } from '../firebase/useUser'
import { db } from '../firebase/initFirebase'
import { doc, setDoc, Timestamp, GeoPoint } from "firebase/firestore"
import Link from "next/link";
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.css';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage()



export default function Admin() {
    
    const { user, logout } = useUser()
    
    const [data, setData] = useState({
        title:'',
        role:'',
        organisation:[],
        description:'',
        sourceCode:'',
        tag:[]
    })
    const [val,setVal] = useState(0)
    const inputEl = useRef(null)

    const uploadData = async (projectname,datas) => {
        try{
            const userDoc = doc(db, "projects", projectname)
            await setDoc(userDoc,datas)
            (alert('saving project',projectname))
        }catch(error){
            console.log(error)
            alert(error)
        }
    }
    async function uploadImageAsPromise(imageFile,path){
        return new Promise(function (resolve,reject){
            const storageRef = ref(storage, path + imageFile.name)
            const task = uploadBytesResumable(storageRef, imageFile)
            task.on('state_change',
            function progress(snapshot){
                setVal((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            },
            function error(err){
                reject(error)
            },
            async function complete() {
                // The getDownloadURL returns a promise and it is resolved to get the image url.
                // const imageURL = await task.snapshot.ref.getDownloadURL();
                // resolve(imageURL);
                // alert("complete")
              })
        })
    }

    function uploadFile() {
        var title = document.getElementById("title").value
        var role = document.getElementById("role").value
        var description = document.getElementById("description").value
        var organisation = document.getElementById("organisation").value.split(",")
        var source = document.getElementById("source").value
        var tags =  document.getElementById("tags").value.split(",")
        document.getElementById('photos').addEventListener('change', function(e){
            const promises = [];
            for(const file of e.target.files){//Instead of e.target.files, you could also have your files variable
                promises.push(uploadImageAsPromise("projects/"+title,file))
            }
            Promise.all(promises).then((fileURLS)=>{
                //Once all the promises are resolved, you will get the urls in a array.
                console.log(fileURLS)
            })
        })

        setData({
            title:title,
            role:role,
            description:description,
            organisation:organisation,
            sourceCode:source,
            tag:tags,
        })
        console.log(title)
        console.log(data)

        uploadData(title,data)
        
        var file = inputEl.current.files[0]
        if (file){
            const storageRef = ref(storage, "projects/"+title+"/" + file.name)
            const task = uploadBytesResumable(storageRef, file)
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
    }
    
    if (user) {
        return (
            <Layout>
                <main className={styles.main}>
                    <section>
                        <h1>Admin</h1>
                        <h2>Upload projects</h2>
                        <div className={styles.row}>
                            <h2>Title</h2>
                            <input type='text' id='title'/>
                        </div>
                        <div className={styles.row}>
                            <h2>Role</h2>
                            <input type='text' id='role'/>
                        </div>
                        <div className={styles.row}>
                            <h2>Organisation</h2>
                            <input type='text' id='organisation'/>
                        </div>
                        <div className={styles.row}>
                            <h2>description</h2>
                            <input type='text' id='description'/>
                        </div>
                        <div className={styles.row}>
                            <h2>sourceCode</h2>
                            <input type='text' id='source'/>
                        </div>
                        <div className={styles.row}>
                            <h2>Tags</h2>
                            <input type='text' id='tags'/>
                        </div>
                        <div className={styles.row}>
                            <h2>Cover</h2>
                            <input type='file' ref={inputEl}/>
                        </div>
                        <div className={styles.row}>
                            <h2>Other photos</h2>
                            <input type='file' id='photos'multiple/>
                        </div>
                        <div className={styles.row}>
                            <progress value={val} max="100"></progress>
                            <button onClick={uploadFile}>Upload Data</button>
                        </div>
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
