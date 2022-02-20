import styles from "../styles/About.module.scss"
import Head from "next/head"
import hexstyles from "../styles/hexagonal.module.scss"
import { Layout } from "../components/layout/layout"
import useTranslation from "next-translate/useTranslation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faEnvelope, faGlobeAsia, faGraduationCap, faMapMarkedAlt, faPhone, faShapes, faSchool, faPlane, faUserGraduate, faInfinity,faDatabase, faTrophy, faHeart} from '@fortawesome/free-solid-svg-icons'
import { faCss3Alt, faCuttlefish, faEthereum, faGitAlt, faHtml5, faJs, faPython } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"


export default function About () {
	let {t} = useTranslation();
	return (
		<div>
		<Head>
        <title>Papop: About</title>
        <meta name="description" content="Papop Lekhapanyaporn's Website" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
		<Layout>
			<main className={styles.main}>
			<section className={styles.profile}>
				<img src="/img/Profile.png"/>
				<h1>{t("about:title")}</h1>
			</section>
			
			<section className={styles.overview}>
				<h1>{t("about:name")}</h1>
        <span><h2>Personal Info</h2></span>
				<section>
					<span>
						<p><FontAwesomeIcon icon={faBirthdayCake}/> {t("about:dateOfBirth")}</p>
						<h5>20 March 2003</h5>
					</span>
					<span>
						<p><FontAwesomeIcon icon={faGlobeAsia}/> {t("about:countryOfCitizen")}</p>
						<h5>{t("about:thailand")}</h5>
					</span>
					<span>
						<p><FontAwesomeIcon icon={faMapMarkedAlt}/> {t("about:address")}</p>
						<h5>{t("about:location")}</h5>
					</span>
					<span>
						<p><FontAwesomeIcon icon={faGraduationCap}/> {t("about:education")}</p>
						<h5>{t("about:school")}</h5>
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
						<p><FontAwesomeIcon icon={faTrophy}/> Goal</p>
						<h5>Software Engineer</h5>
					</span>
					<span>
						<p><FontAwesomeIcon icon={faHeart}/> Interest</p>
						<h5>Game Dev, AI, Web3</h5>
					</span>
				</section>
			</section>

			<section id="education">
				<h1>{t("about:education")}</h1>
				<div className={styles.schools}>
					<div>
						<section>
						<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2FACP.jpg?alt=media&token=18be4a67-4d6c-44cb-a60c-130d6ec05911"/>
							<h2><FontAwesomeIcon icon={faShapes}/></h2>
							<h2>Primary school</h2>
							<h3><Link href="https://www.acp.ac.th/">Assumption College Primary School, Bangkok</Link></h3>
						</section>
					</div>
					<div>
					<section>
						<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2FAssumption_College.jpg?alt=media&token=3357e434-b61b-42ff-8567-02f25b0f2151"/>
						<h2><FontAwesomeIcon icon={faSchool}/></h2>
						<h2>Secondary school</h2>
						<h3><Link href="https://www.assumption.ac.th/">Assumption College, Bangkok</Link></h3>
						</section>
					</div>
					<div>
					<section>
						<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2Fkatolische%20marienschule.jpg?alt=media&token=b779acfa-c7cc-4546-bcc1-02e39f109edd"/>
						<h2><FontAwesomeIcon icon={faPlane}/></h2>
						<h2>Exchange year</h2>
						<h3><Link href="https://marienschule-potsdam.de/">Katholishe Marienschule potsdam,Germany</Link></h3>
						</section>
					</div>
					<div>
					<section>
						<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2FAssumption_College.jpg?alt=media&token=3357e434-b61b-42ff-8567-02f25b0f2151"/>
						<h2><FontAwesomeIcon icon={faUserGraduate}/></h2>
						<h2>high school</h2>
						<h3><Link href="https://www.assumption.ac.th/">Assumption College, Bangkok</Link></h3>
						</section>
					</div>
				</div>
			</section>
				
				<section id="organisation">
					<h1>{t("about:organisation")}</h1>
					<div className={styles.organisation}>
						<div>
							<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2FSPACEAC.png?alt=media&token=ee9c1705-46f9-416e-8265-0080a2d5ac9e"/>
							<h2><Link href="https://spaceac.net/">SPACE AC</Link></h2>
							<h4>{t("about:spaceRole")}</h4>
						</div>
						<div>
							<img src="https://firebasestorage.googleapis.com/v0/b/profile-retaehc.appspot.com/o/IMG%20Files%2FInteract.png?alt=media&token=70ec1b63-374b-481d-a012-05a0236fb691"/>
							<h2><Link href="https://www.instagram.com/acinteractclub/">Interact</Link></h2>
							<h4>{t("about:interactRole")}</h4>
						</div>
					</div>
				</section>

				<section id="programming" className={styles.skills}>
				<h1>{t("about:programming")}</h1>
				<section>
					<ul className={hexstyles.hexGrid}>
						<li>
							<div>
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faJs}/></h1>
									<p>Javascript</p>
								</a>
							</div>
						</li>
						<li>
							<div>
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faCss3Alt}/></h1>
									<p>CSS</p>
								</a>
							</div>
						</li><li>
							<div>
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faGitAlt}/></h1>
									<p>Git/Github</p>
								</a>
							</div>
						</li><li>
							<div>
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faInfinity}/></h1>
									<p>Arduino</p>
								</a>
							</div>
						</li><li>
							<div >
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faCuttlefish}/></h1>
									<p>C/C++</p>
								</a>
							</div>
						</li>
						<li>
							<div>
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faHtml5}/></h1>
									<p>HTML</p>
								</a>
							</div>
						</li>
						<li >
							<div >
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faEthereum}/></h1>
									<p>Solidity</p>
								</a>
							</div>
						</li>
						<li >
							<div >
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faPython}/></h1>
									<p>Python</p>
								</a>
							</div>
						</li>
						<li >
							<div >
								<a href="#">
									<img src="/img/BG.JPG" alt=""/>
									<h1><FontAwesomeIcon icon={faDatabase}/></h1>
									<p>Database</p>
								</a>
							</div>
						</li>
					</ul>
					</section>
				</section>

				<section id="language">
					<h1>Language Proficiency</h1>
					<div className={styles.languages}>
						<table>
							<thead>
								<th>Languages</th>
								<th>Overall</th>
								<th>{t('about:speaking')}</th>
								<th>{t('about:listening')}</th>
								<th>{t('about:reading')}</th>
								<th>{t('about:writing')}</th>
							</thead>
							<tr>
								<th>Thai</th>
								<td>Native</td>
								<td>Native</td>
								<td>Native</td>
								<td>Native</td>
								<td>Native</td>
							</tr>
							<tr>
								<th>English</th>
								<td>7</td>
								<td>6.5</td>
								<td>8.5</td>
								<td>7.5</td>
								<td>5.5</td>
							</tr>
							<tr>
								<th>German</th>
								<td>B1</td>
								<td>B2</td>
								<td>B1</td>
								<td>B1</td>
								<td>B1</td>
							</tr>
						</table>
					</div>
				</section>
			</main>
		</Layout>
		</div>
	)
}