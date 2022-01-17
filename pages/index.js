import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faSearch,faCamera, faCode,faCog, faEnvelope, faGlobeAsia, faGraduationCap, faLanguage, faMapMarkedAlt, faPhone, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'

import SearchForm from '../lib/SearchForm'
import ProjectForm from '../lib/ProjectForm'
import useTranslation from "next-translate/useTranslation"
import { Layout } from '../components/layout/layout'

// import firebase from "../firebase/initFirebase";
// firebase()

export default function Home() {
  // const {user, useUser} = useUser()
  let { t } = useTranslation();
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
        
        <section id="home" style={{height:"100vh"}}>
          <img src="/img/BG.JPG" className={styles.bg} />
          <img src="/img/anti.png" className={styles.anti} />
        </section>
        <section id="about">
          
          <h1>{t("about:title")}</h1>
          
          <div className={styles.aboutsection}>
            <div>
              <h2>{t("about:name")}</h2>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faBirthdayCake}/> {t("about:dateOfBirth")}</p>
                <h5>20 March 2003</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faGlobeAsia}/> {t("about:countryOfCitizen")}</p>
                <h5>{t("about:thailand")}</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faEnvelope}/> {t("about:email")}</p>
                <h5>Papop2003@gmail.com</h5>
              </div>
            </div>

            <div>
              <h2>‎</h2>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faPhone}/> {t("about:phone")}</p>
                <h5>+66 89 811 8068</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faMapMarkedAlt}/> {t("about:address")}</p>
                <h5>{t("about:location")}</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faGraduationCap}/> {t("about:education")}</p>
                <h5>{t("about:school")}</h5>
              </div>
            </div>

            <div>
              <h2>{t("about:organisation")}</h2>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faUserAstronaut}/> SPACE AC</p>
                <h5>{t("about:spaceRole")}</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faCog}/> Interact</p>
                <h5>{t("about:interactRole")}</h5>
              </div>
              <div className={styles.aboutcard}>
                <p><FontAwesomeIcon icon={faGraduationCap}/> GenSTEM</p>
                <h5>{t("about:genstemRole")}</h5>
              </div>
            </div>
              
            <div>
              <h2>{t("about:skill")}</h2>
              <div className={styles.aboutcard}>
                  <p><FontAwesomeIcon icon={faCode}/> {t("about:programming")}</p>
                  <h5>Python, C, C++, Javascript, HTML, CSS</h5>
                </div>
                <div className={styles.aboutcard}>
                  <p><FontAwesomeIcon icon={faLanguage}/> {t("about:language")}</p>
                  <h5>{t("about:spokenLanguage")}</h5>
                </div>
                <div className={styles.aboutcard}>
                  <p><FontAwesomeIcon icon={faCamera}/> {t("about:other")}</p>
                  <h5>{t("about:otherSkill")}</h5>
                </div>
            </div>
          </div>
          <Link href="/about" ><h3 className={styles.aboutbtn}>{t("common:more")}</h3></Link>
        </section >
        <section id="projects">
          <h1>{t("projects:title")}</h1>
          <div className={styles.projectsearch}>
            <FontAwesomeIcon icon={faSearch}/>
            <SearchForm></SearchForm>
            <h3 className={styles.aboutbtn}>{t("common:search")}</h3>
          </div>
        </section>
      </main>
      </Layout>
    </div>
  )
}
