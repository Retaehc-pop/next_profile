import { useState, useEffect, useRef } from 'react';
import { useUser } from '../firebase/useUser';
import { db } from '../firebase/initFirebase';
import { doc, setDoc,updateDoc , Timestamp, GeoPoint } from "firebase/firestore";
import Link from "next/link";
import Head from 'next/head';
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.scss';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,arrayUnion } from "firebase/storage";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const storage = getStorage();


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Admin() {
	// let files = [];
	
	const Cover = useRef(null);
	const [Files,setFiles] = useState([])
	// const [title,setTitle] = useState("")
	// const [sourceCode,setSourceCode] = useState("")
	// const [subtitle,setSubtitle] = useState("")
	const [datas,setDatas] = useState({
		title:"",
		sourceCode: "",
		subtitle: "",
		role:"",
		description: "",
		organisation:[],
		tag:[],

	})
	const { user, logout } = useUser();
	const [val, setVal] = useState(0);

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
	//todo clean this chunk and file
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
			var coverimg = Cover.current.files[0];
			const cov = uploadImageAsPromise("projects/" + data["title"] + "/", coverimg)
			cov.then((fileURL) => {
				data['cover'] = fileURL[0]
			})
			const promises = files.map(file => uploadImageAsPromise("projects/" + data["title"]+ "/", file));
			Promise.all(promises).then((fileURLS) => {
				data["imgs"] = fileURLS
				// files = [];
				updateData(data["title"], data);
				})
		}
	}
	const [value, setValue] = useState(0);
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
					<Tabs value={value} onChange={(event, newValue) => {setValue(newValue)}}>
						<Tab label="Update project" {...a11yProps(0)} />
						<Tab label="New project" {...a11yProps(1)} />
						<Tab label="Delete project" {...a11yProps(2)} />
        	</Tabs>
					<TabPanel value={value} index={0}>
						<section>
								<h2>Cover</h2><input type='file' ref={Cover} />
								<h2>Other photos</h2><input type='file' id='photos' onChange={(e)=>{
									setFiles([...e.target.files])
									}} multiple/>
								<progress value={val} max="100"></progress>
							</section>
							<section>
								<h1><input type='text' id='title' placeholder='title'/> ||| <input type='text' id='sourceCode' placeholder='http"//www.github.com/example'/></h1>
								<h2> <input type='text' id='subtitle' placeholder='subtitle'/> || As : <input type='text' id='role' placeholder='role'/></h2>
								<textarea type='text' id='description' placeholder='description' rows='10' col='30'/>
								<div>
									<input type='text' id='organisation' placeholder='Organisation'/>
									<input type='text' id='tags' placeholder='Tags'/>
								</div>
								<button onClick={uploadFirestore}>Upload Data</button>
							</section>
     			</TabPanel>
					<TabPanel value={value} index={1}>
						
      		</TabPanel><TabPanel value={value} index={2}>
        		Item One
      		</TabPanel>
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