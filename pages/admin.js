import { useState, useEffect, useRef } from 'react';
import { useUser } from '../firebase/useUser';
import { db } from '../firebase/initFirebase';
import { doc, setDoc,updateDoc , Timestamp, GeoPoint } from "firebase/firestore";
import Link from "next/link";
import Head from 'next/head';
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.scss';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,arrayUnion } from "firebase/storage";
import { FirebaseError } from 'firebase/app';

const storage = getStorage();

let files = [];

export default function Admin() {

	const { user, logout } = useUser();
	// const data = {};
	const [val, setVal] = useState(0);
	const inputEl = useRef(null);

	const updateData = async (projectname, datas) => {
		try {
			const userDoc = doc(db, "projects", projectname);
			await setDoc(userDoc, datas);
			(alert('updating project', projectname));
		} 
		catch (error) {
			console.log(error)
		}
	};

	const newData = async (projectname, datas) => {
		try {
			const userDoc = doc(db, "projects", projectname);
			await setDoc(userDoc, datas);
			(alert('updating project', projectname));
		} 
		catch (error) {
			console.log(error)
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
					getDownloadURL(ref(storage,path + imageFile.name)).then((url)=>{
						resolve(url)
					})
				});
		});
	}

	useEffect(() => {
		setTimeout(() => {
			document.getElementById('photos').addEventListener('change', function (e) {
				files = []
				for (const file in e.target.files) {
					files.push(e.target.files[file]);
				}
			});
		}, 1000);
	}, []);

	function uploadFirestore(){
		function clean(obj) {
			for (var propName in obj) {
				if (obj[propName] === null 
					|| obj[propName] === undefined 
					|| obj[propName] === [] 
					|| obj[propName] === {} 
					|| obj[propName] === "") {
					delete obj[propName];
				}
			}
			return obj
		}
		const datas = {
			title: document.getElementById("title").value,
			sourceCode: document.getElementById("sourceCode").value,
			subtitle: document.getElementById("subtitle").value,
			role:document.getElementById("role").value,
			description: document.getElementById("description").value,
			organisation:document.getElementById("organisation").value.split(","),
			tag:document.getElementById("tags").value.split(","),
		};
		if (datas.title === ''){
			alert("please input title")
			return
		}
		else{
			const data = clean(datas)
			var coverimg = inputEl.current.files[0];
			const cov = uploadImageAsPromise("projects/" + data["title"] + "/", coverimg)
			cov.then((fileURL) => {
				data['cover'] = fileURL
			})
			const promises = files.map(file => uploadImageAsPromise("projects/" + data["title"]+ "/", file));
			Promise.all(promises).then((fileURLS) => {
			data["imgs"] = fileURLS
			files = [];
			updateData(data["title"], data);
			location.reload();
			})
		}
	}

	if (user) {
		return (
			<div>
				<Head>
					<title>Papop: Admin </title>
					<meta name="description" content="Admin page" />
					<meta charSet="UTF-8"></meta>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Layout>
				<main className={styles.main}>
          <section>
						<h2>Cover</h2><input type='file' ref={inputEl} />
						<h2>Other photos</h2><input type='file' id='photos' multiple />
						<progress value={val} max="100"></progress>
          </section>
          <section>
            <h1> <input type='text' id='title' placeholder='title'/> ||| <input type='text' id='sourceCode' placeholder='http"//www.github.com/example'/></h1>
            <h2> <input type='text' id='subtitle' placeholder='subtitle'/> || As : <input type='text' id='role' placeholder='role'/></h2>
						<textarea type='text' id='description' placeholder='description' rows='10' col='30'/>
            <div>
              <input type='text' id='organisation' placeholder='Organisation'/>
              <input type='text' id='tags' placeholder='Tags'/>
            </div>
						<button onClick={uploadFirestore}>Upload Data</button>
          </section>
        </main>
			</Layout>
			</div>
		);
	}
	else {
		return (
			<></>
		);
	}

}