import styles from "../styles/About.module.scss"
import hexstyles from "../styles/hexagonal.module.scss"
import { Layout } from "../components/layout/layout"
import useTranslation from "next-translate/useTranslation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake,faCamera,faPlus, faCode,faCog, faEnvelope, faGlobeAsia, faGraduationCap, faLanguage, faMapMarkedAlt, faPhone, faUserAstronaut, faShapes, faSchool, faPlane, faUserGraduate, faGrinSquint, faDatabase, faInfinity} from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faCuttlefish, faEthereum, faGitAlt, faHtml5, faJs, faPython } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"


export default function About () {
	let {t} = useTranslation();
	return (
		<Layout>
			<main className={styles.main}>
			<section className={styles.profile}>
			</section>
			<h1>{t("about:title")}</h1>
			<section>
			<h1>{t("about:overview")}</h1>
				<div className={styles.overview}>
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
				</section >
				<section className={styles.education}>
					<h1>{t("about:education")}</h1>
					<div className={styles.schools}>
						<div className={styles.school}>
							<img src="/img/BG.JPG"/>
							<h2><FontAwesomeIcon icon={faShapes}/></h2>
							<h2>Primary school</h2>
							<Link href="https://www.acp.ac.th/"><h3>Assumption College Primary School, Bangkok</h3></Link>
						</div>
						<div className={styles.school}>
							<img src="/img/BG.JPG"/>
							<h2><FontAwesomeIcon icon={faSchool}/></h2>
							<h2>Secondary school</h2>
							<Link href="https://www.assumption.ac.th/"><h3>Assumption College, Bangkok</h3></Link>
						</div>
						<div className={styles.school}>
							<img src="/img/BG.JPG"/>
							<h2><FontAwesomeIcon icon={faPlane}/></h2>
							<h2>Exchange year</h2>
							<Link href="https://marienschule-potsdam.de/" ><h3>Katholishe Marienschule potsdam,Germany</h3></Link>
						</div>
						<div className={styles.school}>
							<img src="/img/BG.JPG"/>
							<h2><FontAwesomeIcon icon={faUserGraduate}/></h2>
							<h2>high school</h2>
							<Link href="https://www.assumption.ac.th/"><h3>Assumption College, Bangkok</h3></Link>
						</div>
					</div>
				</section>
				<section>
					<h1>{t("about:organisation")}</h1>
				</section>
				<section>
				<h1>{t("about:other")}</h1>
				<h1>{t("about:programming")}</h1>
					<ul className={hexstyles.hexGrid}>
						<li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faJs}/></h1>
									<p>Javascript</p>
								</a>
							</div>
						</li><li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faCss3Alt}/></h1>
									<p>CSS</p>
								</a>
							</div>
						</li><li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faGitAlt}/></h1>
									<p>Git/Github</p>
								</a>
							</div>
						</li><li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faInfinity}/></h1>
									<p>Arduino</p>
								</a>
							</div>
						</li><li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faCuttlefish}/></h1>
									<p>C/C++</p>
								</a>
							</div>
						</li>
						<li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faHtml5}/></h1>
									<p>HTML</p>
								</a>
							</div>
						</li>
						<li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faEthereum}/></h1>
									<p>Solidity</p>
								</a>
							</div>
						</li>
						<li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faPython}/></h1>
									<p>Python</p>
								</a>
							</div>
						</li>
						<li className={hexstyles.hex}>
							<div className={hexstyles.hexIn}>
								<a className={hexstyles.hexLink} href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faDatabase}/></h1>
									<p>Database</p>
								</a>
							</div>
						</li>
					</ul>
				</section>
				<section>
					<h1>Language Proficiency</h1>
					<div className={styles.languages}>
						<div className={styles.language}>
							<h1>Thai</h1>
							<p>Native</p>
							<p>{t('about:speaking')} : Native</p>
							<p>{t('about:listening')} : Native</p>
							<p>{t('about:reading')} : Native</p>
							<p>{t('about:writing')} : Native</p>
						</div>
						<div className={styles.language}>
							<h1>English</h1>
							<p>C2 : IELST overall 7</p>
							<p>{t('about:speaking')} : 6.5/9</p>
							<p>{t('about:listening')} : 8.5/9</p>
							<p>{t('about:reading')} : 7.5/9</p>
							<p>{t('about:writing')} : 5.5/9</p>
						</div>
						<div className={styles.language}>
							<h1>German</h1>
							<p>B1 : Geothe</p>
							<p>{t('about:speaking')} : B2</p>
							<p>{t('about:listening')} : B1</p>
							<p>{t('about:reading')} : B1</p>
							<p>{t('about:writing')} : B1</p>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	)
}