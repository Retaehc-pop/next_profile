import { Layout } from "../../components/layout/layout";
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase/initFirebase'
import { useRouter } from 'next/router'
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/project.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';



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
  const [images,setImages] = useState([])
  useEffect(() => {
    setImages(project.imgs)
    images.push(project.cover)
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
                  <div key={img} data-src={img}/>
                ))
              }
            </AutoplaySlider>
          </section>
          <section>
            <h1> {project.title} <a href={project.sourceCode}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a></h1>
            <h2> {project.subtitle} || As : {project.role}</h2>
            <p>{project.description}</p>
            <div>
              <h2>Tag :</h2>
              {
                project.organisation.map(organisation=>(
                  <h3 key={organisation}>{organisation}</h3>
                ))
              }
              {
                project.tag.map(tag=>(
                  <h3 key={tag}>{tag}</h3>
                ))
              }
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}