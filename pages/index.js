import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faCamera, faCode,faCog, faEnvelope, faGlobeAsia, faGraduationCap, faLanguage, faMapMarkedAlt, faPhone, faUserAstronaut, faCodeBranch, faKeyboard, faSatellite, faRocket, faMicrochip, faSatelliteDish, faAtom} from '@fortawesome/free-solid-svg-icons'

import AwsSliderStyle from "react-awesome-slider/dist/custom-animations/fall-animation.css"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import 'react-awesome-slider/dist/styles.css';
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

import 'react-awesome-button/dist/themes/theme-c137.css';

import { db } from '../firebase/initFirebase'
import { collection, query, where, doc, getDoc, getDocs, arrayRemove } from "firebase/firestore"

import useTranslation from "next-translate/useTranslation"
import { Layout } from '../components/layout/layout'
import { faGit, faGitAlt, faGithub, faJs, faPython } from '@fortawesome/free-brands-svg-icons'

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

export default function Home({ projects }) {
  let { t } = useTranslation();
  const AutoplaySlider = withAutoplay(AwesomeSlider)
  const router =  useRouter()
  const [images,setImages] = useState([])
  
  useEffect(() => {
    document.addEventListener("mousemove", parallax);
    function parallax(e){
      this.querySelectorAll(".layer").forEach(layer => {
        const speed = layer.getAttribute('data-speed')
        const x = (window.innerWidth  - e.pageX*speed)/100
        const y = (window.innerHeight - e.pageY*speed)/100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }
    projects.map((project)=>(
      images.push(project.cover)
    ))
	}, []);

  return (
    <div>
      <Head>
        <title>Papop</title>
        <meta name="description" content="Papop Lekhapanyaporn's Website" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <main className={styles.main}>
        <section className={styles.startup}>
          <img src="/img/BG.JPG" />
          {/* <img src="/img/anti.png" data-speed="3" className="layer" style={{height:"50vmin", zIndex:"10"}} /> */}
          <h1 data-speed="-1" className="layer" >Retaehc</h1>
          <p data-speed="2" className="layer" style={{display:"flex",top:"10%",left:"40%"}}><FontAwesomeIcon icon={faKeyboard}/></p>
          <p data-speed="1" className="layer" style={{display:"flex",top:"10%",left:"80%"}}><FontAwesomeIcon icon={faSatelliteDish}/></p>
          <p data-speed="1" className="layer" style={{display:"flex",top:"15%",left:"60%"}}><FontAwesomeIcon icon={faAtom}/></p>
          <p data-speed="2" className="layer" style={{display:"flex",top:"15%",left:"15%"}}><FontAwesomeIcon icon={faPython}/></p>
          <p data-speed="2" className="layer" style={{display:"flex",top:"45%",left:"80%"}}><FontAwesomeIcon icon={faRocket}/></p>
          <p data-speed="8" className="layer" style={{display:"flex",top:"50%",left:"20%"}}><FontAwesomeIcon icon={faGitAlt}/></p>
          <p data-speed="3" className="layer" style={{display:"flex",top:"60%",left:"40%"}}><FontAwesomeIcon icon={faCamera}/></p>
          <p data-speed="6" className="layer" style={{display:"flex",top:"75%",left:"90%"}}><FontAwesomeIcon icon={faCode}/></p>
          <p data-speed="7" className="layer" style={{display:"flex",top:"70%",left:"65%"}}><FontAwesomeIcon icon={faGithub}/></p>
          <p data-speed="2" className="layer" style={{display:"flex",top:"80%",left:"10%"}}><FontAwesomeIcon icon={faCodeBranch}/></p>
          <p data-speed="3" className="layer" style={{display:"flex",top:"80%",left:"50%"}}><FontAwesomeIcon icon={faJs}/></p>
          <p data-speed="4" className="layer" style={{display:"flex",top:"80%",left:"80%"}}><FontAwesomeIcon icon={faMicrochip}/></p>
          <p data-speed="2" className="layer" style={{display:"flex",top:"84%",left:"30%"}}><FontAwesomeIcon icon={faSatellite}/></p>
        </section>

        <section id="about" className={styles.about}>
          <h1>{t("about:title")}</h1>
          <div>
            <section>
              <h2><span>{t("about:name")}</span></h2>
              <span>
                <p><FontAwesomeIcon icon={faBirthdayCake}/> {t("about:dateOfBirth")}</p>
                <h5>20 March 2003</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faGlobeAsia}/> {t("about:countryOfCitizen")}</p>
                <h5>{t("about:thailand")}</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faEnvelope}/> {t("about:email")}</p>
                <h5>Papop2003@gmail.com</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faPhone}/> {t("about:phone")}</p>
                <h5>+66 89 811 8068</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faMapMarkedAlt}/> {t("about:address")}</p>
                <h5>{t("about:location")}</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faGraduationCap}/> {t("about:education")}</p>
                <h5>{t("about:school")}</h5>
              </span>
            </section>
            
            <section>
              <span><h2>{t("about:organisation")}</h2></span>
              <span>
                <p><FontAwesomeIcon icon={faUserAstronaut}/> SPACE AC</p>
                <h5>{t("about:spaceRole")}</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faCog}/> Interact</p>
                <h5>{t("about:interactRole")}</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faGraduationCap}/> GenSTEM</p>
                <h5>{t("about:genstemRole")}</h5>
              </span>
              <span><h2>{t("about:skill")}</h2></span>
              <span>
                <p><FontAwesomeIcon icon={faCode}/> {t("about:programming")}</p>
                <h5>Python, C, C++, Javascript, HTML, CSS</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faLanguage}/> {t("about:language")}</p>
                <h5>{t("about:spokenLanguage")}</h5>
              </span>
              <span>
                <p><FontAwesomeIcon icon={faCamera}/> {t("about:other")}</p>
                <h5>{t("about:otherSkill")}</h5>
              </span>
            </section>
          </div>
          <AwesomeButton className="Button" size="large" type="primary" onPress={() => router.push("/about")}><h3>More</h3></AwesomeButton>
        </section >
        <section className={styles.projects} id="projects">
          {/* <h1>{t("projects:title")}</h1> */}
          <section>
            <AutoplaySlider 
            play={true}
            animation="fallAnimation"
            cssModule={AwsSliderStyle}
            interval={3000} 
            cancelOnInteraction={false}>
                {
                  projects.map(project=>(
                    <div  key={project.title} data-src={project.cover}>
                        <AwesomeButton className="Button" size="large" type="primary" onPress={() => router.push("/projects")}>My {t("projects:title")}</AwesomeButton>
                    </div>
                  ))
                }
              </AutoplaySlider>
          </section>
        </section>
      </main>
      </Layout>
    </div>
  )
}
