import { useState, useEffect, useRef } from 'react';
import { useUser } from '../firebase/useUser';
import { db } from '../firebase/initFirebase';
import { doc, setDoc,updateDoc , Timestamp, GeoPoint } from "firebase/firestore";
import Link from "next/link";
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.scss';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage();

let files = [];

export default function Admin() {

    const { user, logout } = useUser();
    const data = {};
    const [val, setVal] = useState(0);
    const inputEl = useRef(null);

    const uploadData = async (projectname, datas) => {
        try {
            const userDoc = doc(db, "projects", projectname);
            await updateDoc(userDoc, datas);
            (alert('saving project', projectname));
        } catch (error) {
            console.log(error);
            // alert(error);
        }
    };
    async function uploadImageAsPromise(path, imageFile) {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, path + imageFile.name);
            const task = uploadBytesResumable(storageRef, imageFile);
            task.on('state_change',
                function progress(snapshot) {
                    setVal((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                function error(err) {
                    reject(error);
                },
                async function complete() {
                    // The getDownloadURL returns a promise and it is resolved to get the image url.
                    // const imageURL = await task.snapshot.ref.getDownloadURL();
                    // resolve(imageURL);
                    // alert("complete")
                });
        });
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('photos').addEventListener('change', function (e) {
                // console.log(e.target.files);
                for (const file in e.target.files) {
                    files.push(e.target.files[file]);
                    console.log(e.target.files[file])
                }
            });
        }, 1000);
    }, []);

    function uploadFile() {
        var title = document.getElementById("title").value;
        var role = document.getElementById("role").value;
        var description = document.getElementById("description").value;
        var organisation = document.getElementById("organisation").value;
        var source = document.getElementById("source").value;
        var tags = document.getElementById("tags").value;
        if (title === ""){
            alert('Please input title')
            return 
        }

        if (title !== "")data["title"] = title
        if (role !== "")data["role"] = role
        if (description !== "")data["description"] = description
        if (organisation !== "")data["organisation"] = organisation.split(",")
        if (source !== "")data["sourceCode"] = source
        if (tags !== "")data["tag"] = tags.split(",")

        const promises = files.map(file => uploadImageAsPromise("projects/" + title + "/", file));
        Promise.all(promises).then((fileURLS) => {
            //Once all the promises are resolved, you will get the urls in a array.
            console.log(fileURLS);
        });

        uploadData(title, data);

        var file = inputEl.current.files[0];
        if (file) {
            const storageRef = ref(storage, "projects/" + title + "/" + file.name);
            const task = uploadBytesResumable(storageRef, file);
            task.on('state_change',
                function progress(snapshot) {
                    setVal((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                function error(err) {
                    alert(error);
                },
                function complete() {
                    alert('upload complete');
                });
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
                            <input type='text' id='title' />
                        </div>
                        <div className={styles.row}>
                            <h2>Role</h2>
                            <input type='text' id='role' />
                        </div>
                        <div className={styles.row}>
                            <h2>Organisation</h2>
                            <input type='text' id='organisation' />
                        </div>
                        <div className={styles.row}>
                            <h2>description</h2>
                            <input type='text' id='description' />
                        </div>
                        <div className={styles.row}>
                            <h2>sourceCode</h2>
                            <input type='text' id='source' />
                        </div>
                        <div className={styles.row}>
                            <h2>Tags</h2>
                            <input type='text' id='tags' />
                        </div>
                        <div className={styles.row}>
                            <h2>Cover</h2>
                            <input type='file' ref={inputEl} />
                        </div>
                        <div className={styles.row}>
                            <h2>Other photos</h2>
                            <input type='file' id='photos' multiple />
                        </div>
                        <div className={styles.row}>
                            <progress value={val} max="100"></progress>
                            <button onClick={uploadFile}>Upload Data</button>
                        </div>
                    </section>
                </main>
            </Layout>
        );
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