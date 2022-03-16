import { Layout } from "../../components/layout/layout";
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase/initFirebase'
import { useRouter } from 'next/router'
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/project.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3Alt, faCuttlefish, faGitAlt, faGithub, faHtml5, faJs, faNodeJs, faNpm, faPython, faRaspberryPi, faReact, faSass } from "@fortawesome/free-brands-svg-icons";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { faFireAlt, faInfinity } from "@fortawesome/free-solid-svg-icons";



export const getStaticPaths = async () => {
  const allProject = [];
  const q = query(collection(db, "projects"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => { allProject.push(doc.data()); })
  const paths = allProject.map(project => {
    return {
      params: { name: project.title }
    }
  })
  return {
    paths: paths,
    fallback: false
  }
};

export const getStaticProps = async (context) => {
  const name = context.params.name;
  try {
    const docRef = doc(db, 'projects', name)
    const res = await getDoc(docRef)
    const data = res.data()
    data.imgs.push(data.cover)
    data.imgs.reverse()
    return {
      props: { project: data }
    }
  } catch (error) {
    console.log(error)
    router.push('/404')
  }
}

export default function Project({ project }) {
  const AutoplaySlider = withAutoplay(AwesomeSlider)
  let images = project.imgs

  function getTools(){
    let collection = [];
    project.tools.forEach((tool)=>{
      switch(tool){
        case "python":
          collection.push(faPython)
          break;
        case "js":
          collection.push(faJs)
          break;
        case "css":
          collection.push(faCss3Alt)
          break;
        case "html":
          collection.push(faHtml5)
          break;
        case "node.js":
          collection.push(faNodeJs)
          break;
        case "github":
          collection.push(faGitAlt)
          break;
        case "rpi":
          collection.push(faRaspberryPi)
          break;
        case "arduino":
          collection.push(faInfinity)
          break;
        case "c":
          collection.push(faCuttlefish)
          break;
        case "react":
          collection.push(faReact)
          break;
        case "sass":
          collection.push(faSass)
          break;
        case "npm":
          collection.push(faNpm)
          break;
        case "database":
          collection.push(faFireAlt)
          break;
    }
    })
    console.log(collection)
    return collection;
  }
  useEffect(() => {
    images.unshift(project.cover)
    console.log("project")
    
	}, []);
  return (
    <div>
			<Head>
        <title>Papop: { project.title }</title>
        <meta name="description" content="Project pages" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <section>
            <AutoplaySlider play={true} interval={2000} bullets={false} cancelOnInteraction={false}>
              {
                images.map(img=>(
                  <div className={styles.img} key={img} data-src={img}/>
                ))
              }
            </AutoplaySlider>
          </section>
          <section className={styles.info}>
            <main>
              <h1>{project.title}</h1>
              <h4>({project.role})</h4>
            </main>
            <div>
              <h3><a href={project.source}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a></h3>
            {
                getTools().map((icon)=>(
                  <h3 key={icon}><FontAwesomeIcon icon={icon}/></h3>))
            }
            </div>
            <h2> {project.subtitle}</h2>
            <p>{project.description}</p>
            <div>
              {
                project.categories.map(category=>(
                  <span key={category}>{category}</span>
                ))
              }
              
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}