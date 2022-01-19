import { db } from '../../firebase/initFirebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"
import { Layout } from "../../components/layout/layout";
import Link from "next/link";
import { useEffect } from 'react';
import styles from "../../styles/Projects.module.scss"

export const getStaticProps = async () => {
	const allProject = [];
	const q = query(collection(db,"projects"))
	const querySnapshot = await getDocs(q);
	console.log(querySnapshot);
	querySnapshot.forEach((doc)=>{
	allProject.push(doc.data());
	})
	// console.log(querySnapshot);
	return {
		props: {projects:allProject}
	}
}
export default function Projects({ projects }) {
	console.log(projects)
	return (
		<div>
			<Layout>
				<main className={styles.main}>
					<section>
						<h1> Projects </h1>
						<div>
							{
								projects.map(project=>(
									<h1 key={project.title}><Link href="/projects/[name]" as={`/projects/${project.title}`}>{project.title}</Link></h1>
								))
							}
						</div>
					</section>
				</main>
			</Layout>

		</div>
	)
}