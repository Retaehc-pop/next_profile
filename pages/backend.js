import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { db } from '../firebase/initFirebase';
import { doc, setDoc,updateDoc, collection, query, where, getDoc, getDocs } from "firebase/firestore";

import Head from "next/head";
import { Layout } from "../components/layout/layout";
import { useRef,useState } from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../styles/Admin.module.scss';

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
export const getStaticProps = async () => {
	const allProject = [];
	const q = query(collection(db,"projects"))
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc)=>{
	allProject.push(doc.data());
	})
	return {
		props: {projects:allProject}
	}
}

function clean(obj){
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

export default function backend({ projects }){
  const Cover = useRef(null)
  const [imgFiles,setImgFiles] = useState([])
  const [datas,setDatas] = useState({
    title:"",
		source: "",
		subtitle: "",
		role:"",
		description: "",
		catagories:[],
		tools:[],
  })
	const [value, setValue] = useState(0);

  const datasChange = e => {
    const { name, value } = e.target;
    setDatas(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  

  function uploadData(){
    if (datas.title === ''){
			alert("please input title")
			return
		}
		var coverimg = Cover.current.files[0];
    const cov = uploadImageAsPromise("projects/" + datas.title + "/", coverimg)
    cov.then((fileURL) => {
      datas['cover'] = fileURL[0]
    })
    const promises = imgFiles.map(file => uploadImageAsPromise("projects/" +datas.title+ "/", file));
    Promise.all(promises).then(async (fileURLS) => {
      datas["imgs"] = fileURLS
      try {
        const userDoc = doc(db, "projects", datas.title);
        await setDoc(userDoc, datas);
        (alert('uploading project', datas.title));
      } 
      catch (error) {
        console.log(error)
      }
      })
  }
  
  async function updateData(){
    const data = clean(datas)
    try {
      const userDoc = doc(db, "projects", data.title);
      await updateDoc(userDoc, data);
      (alert('updating project', data.title));
    } 
    catch (error) {
      console.log(error)
    }
  }
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
            <h2>Other photos</h2><input type='file' id='photos' onChange={(e)=>{setImgFiles([...e.target.files])}} multiple/>
          </section>
          <section>
            <h1>
              <input value={datas.title} type='text' onChange={datasChange} name='title' placeholder='title'/> ||| 
              <input value={datas.source} type='text' onChange={datasChange} name='source' placeholder='source'/>
            </h1>
            <h2>
              <input value={datas.subtitle} type='text' onChange={datasChange} name='subtitle' placeholder='subtitle'/> || As : 
              <input value={datas.role} type='text' onChange={datasChange} name='role' placeholder='role'/></h2>
            <textarea value={datas.description} type='text' onChange={datasChange} name='description' placeholder='description' rows='10' col='30'/>
            <div>
              <input value={datas.catagories} type='text' onChange={datasChange} name='catagories' placeholder='catagories'/>
              <input value={datas.tools} type='text' onChange={datasChange} name='tools' placeholder='tools'/>
            </div>
            <button onClick={uploadData}>Upload Data</button>
          </section>
     			</TabPanel>
           <TabPanel value={value} index={1}>
           <section>
            <h2>Cover</h2><input type='file' ref={Cover} />
            <h2>Other photos</h2><input type='file' id='photos' onChange={(e)=>{setImgFiles([...e.target.files])}} multiple/>
            {/* <progress value={val} max="100"></progress> */}
          </section>
          <section>
            <h1>
            <Autocomplete disablePortal 
            options={projects.map(p=>p.title)} 
            renderInput={(params) => <TextField {...params} label="Projects"/>} 
            onChange={(e)=>{
              var a =  projects.find((item)=>item.title===e.target.textContent)
              setDatas(a)
              console.log(a)
              }}/> ||| 
              <input value={datas.source} type='text' onChange={datasChange} name='source' placeholder='source'/>
            </h1>
            <h2>
              <input value={datas.subtitle} type='text' onChange={datasChange} name='subtitle' placeholder='subtitle'/> || As : 
              <input value={datas.role} type='text' onChange={datasChange} name='role' placeholder='role'/></h2>
            <textarea value={datas.description} type='text' onChange={datasChange} name='description' placeholder='description' rows='10' col='30'/>
            <div>
              <input value={datas.catagories} type='text' onChange={datasChange} name='catagories' placeholder='catagories'/>
              <input value={datas.tools} type='text' onChange={datasChange} name='tools' placeholder='tools'/>
            </div>
            <button onClick={updateData}> Update Data</button>
          </section>
      		</TabPanel>
      </main>
      </Layout>
    </div>

  )
}