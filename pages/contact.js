import { Layout } from "../components/layout/layout";
import Link from "next/link"
import Head from "next/head";
import styles from "../styles/Contact.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram,faGithub, faStackOverflow, faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
export default function Contact(){
	return (
		<div>
		<Head>
			<title>Papop: Contact </title>
			<meta name="description" content="Contact page" />
			<meta charSet="UTF-8"></meta>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Layout>
			<main className={styles.main}>
			<h1> Contact ME </h1>
				<section>
					<div>
						<h2><FontAwesomeIcon icon={faEnvelope} />  E-mail</h2>
						<h4><Link href="mailto:papop2003@gmail.com">Papop2003@gmail.com</Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faInstagram} />  Instagram</h2>
						<h4><Link href="https://www.instagram.com/pop.pxp/">@POP.PXP</Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faGithub} />  Github</h2>
						<h4><Link href="https://github.com/Retaehc-pop">@Retaehc_pop</Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faPhone} />  Phone</h2>
						<h4><Link href="tel:+66898118068">th: +66898118068 </Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faStackOverflow} />  Stackoverflow</h2>
						<h4><Link href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn">Papop Lekhapanyaporn</Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faLinkedin} />  Linkedin</h2>
						<h4><Link href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/">Papop Lekhapanyaporn</Link></h4>
					</div>
					<div>
						<h2><FontAwesomeIcon icon={faDiscord} />  Discord</h2>
						<h4><Link href="https://discordapp.com/users/267572826418970624">Papop Lekhapanyaporn</Link></h4>
					</div>
				</section>
			</main>
		</Layout>
		</div>
	)

}