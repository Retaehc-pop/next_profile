import { Layout } from "../../components/layout/layout";
import Link from "next/link";
import styles from "../../styles/Projects.module.scss"
import Head from "next/head";

import { useRouter } from 'next/router';
import { useState } from 'react'

import { db } from '../../firebase/initFirebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
export default function Projects({ projects }) {
	const router = useRouter()
	const [filter,setFilter] = useState("");
	const [sort,setSort] = useState("");

	return (
		<div>
			 <Head>
        <title>Papop: projects</title>
        <meta name="description" content="Project pages" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<Layout>
				<main className={styles.main}>
					<section>
						<h1> Projects </h1>
						{/* <div>							
							<input onChange={()=>{}}/>
							<button onClick={()=>{}} className="{drop}"><h2><FontAwesomeIcon icon={faSearch}/></h2></button>
							</div> */}
							
					</section>
				</main>
				{/* <div className={styles.filter}>

				</div> */}
				<div className={styles.cards}>
					{
						projects.map(project=>(
							<Link  key={project.title} href={`/projects/${project.title}`}>
								<div >
									<img src={project.cover} placeholder='blur'/>
									<h1>{project.title}</h1>
									<h3>tags: {project.tag}</h3>
								</div>
							</Link>
						))
					}
					</div>
			</Layout>
		</div>
	)
}