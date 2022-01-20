import { db } from '../../firebase/initFirebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"
import { Layout } from "../../components/layout/layout";
import Link from "next/link";
import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from "../../styles/Projects.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';

export const getStaticProps = async () => {
	const allProject = [];
	const q = query(collection(db,"projects"))
	const querySnapshot = await getDocs(q);
	console.log(querySnapshot);
	querySnapshot.forEach((doc)=>{
	allProject.push(doc.data());
	})
	return {
		props: {projects:allProject}
	}
}
export default function Projects({ projects }) {
	const [filter,setFilter] = useState("");
	const [sort,setSort] = useState("");
	return (
		<div>
			<Layout>
				<main className={styles.main}>
					<section>
						<h1> Projects </h1>
						<div>
							<formControl fullwidth>
								<InputLabel><h2><FontAwesomeIcon icon={faFilter}/></h2></InputLabel>
								<Select value={filter} onChange={setFilter()}>
									<MenuItem value={}>national</MenuItem>
									<MenuItem value={}></MenuItem>
									<MenuItem value={}></MenuItem>
									<MenuItem value={}></MenuItem>
								</Select>
							</formControl>

							{/* <button onClick={()=>{}} className="{drop}"><h2><FontAwesomeIcon icon={faFilter}/></h2></button>
							<div>
							</div>
							<button onClick={()=>{}} className="{drop}"><h2><FontAwesomeIcon icon={faSort}/></h2></button>
							<div> */}

							</div>
							<input onChange={()=>{}}/>
							<button onClick={()=>{}} className="{drop}"><h2><FontAwesomeIcon icon={faSearch}/></h2></button>
						</div>
						<div className={styles.cards}>
							{
								projects.map(project=>(
									<Link key={project.title} href="/projects/[name]" as={`/projects/${project.title}`}>
										<div>
											<h1>{project.title}</h1>
											<h3>tags: {project.tag}</h3>
										</div>
									</Link>
								))
							}
						</div>
					</section>
				</main>
			</Layout>

		</div>
	)
}