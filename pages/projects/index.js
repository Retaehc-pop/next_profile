import { Layout } from "../../components/layout/layout";
import Link from "next/link";
import styles from "../../styles/Projects.module.scss"
import Head from "next/head";

import { useRouter } from 'next/router';
import { useState } from 'react'

import { db } from '../../firebase/initFirebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"

import AwsSliderStyle from "react-awesome-slider/dist/custom-animations/cube-animation.css"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-c137.css';

import useTranslation from "next-translate/useTranslation"
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
  let { t } = useTranslation();
  const AutoplaySlider = withAutoplay(AwesomeSlider)
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
					<section className={styles.start}>
						<section>
							<AutoplaySlider 
								play={true}
								animation="cubeAnimation"
								cssModule={AwsSliderStyle}
								interval={3000} 
								cancelOnInteraction={false}>
									{
										projects.map(project=>(
											<div key={project.title} data-src={project.cover}>
												<AwesomeButton size={"large"} type="primary" href={`/projects/${project.title}`} >{project.title}</AwesomeButton>
											</div>
											)
										)
									}
							</AutoplaySlider>
						</section>
					</section>
					<section className={styles.cards}>
						{
							projects.map(project=>(
								<Link  key={project.title} href={`/projects/${project.title}`}>
									<div >
										<img src={project.cover} placeholder='blur'/>
										<h1>{project.title}</h1>
									</div>
								</Link>
							))
						}
						</section>
				</main>
			</Layout>
		</div>
	)
}