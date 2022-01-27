
import { useRouter } from 'next/router'
import styles from '../../styles/Layout.module.scss'
import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from 'react'
import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faAdjust, faEnvelope, faLanguage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithub, faStackOverflow,faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useUser } from '../../firebase/useUser';

function ActiveLink({ children, href}){
	const router = useRouter()

	const handleClick = (e) =>{
		e.preventDefault()
		router.push(href)
	}
	return (
		<a href={href} onClick={handleClick}> {children} </a>
	)
}

export const Layout = ({children}) =>{
	const { user, logout } = useUser()

	const date = new Date("December 20,2021");
	const fullYear = date.getFullYear();
	let router = useRouter()
	const [darkTheme, setDarkTheme] = useState(undefined);
	let { t } = useTranslation()
	const storeUserSetPreference = (pref) => {
		localStorage.setItem("theme",pref);
	}

	const getMediaQueryPreference = () =>{
		const mediaQuery = "(prefers-color-scheme: dark)";
		const mql = window.matchMedia(mediaQuery);
		const hasPreference = typeof mql.matches === 'boolean';

		if (hasPreference){
			return mql.matches ? "dark":"light";
		}
	};

	useEffect(() => {
		const root = document.documentElement;
		const initialColorValue = root.style.getPropertyValue("--initial-color-mode");
		setDarkTheme(initialColorValue === "dark");
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		if (darkTheme !== undefined) {
			if (darkTheme) {
				root.setAttribute("data-theme", "dark");
				storeUserSetPreference("dark");
			} 
			else {
				root.removeAttribute("data-theme");
				storeUserSetPreference("light");
			}
	}
	}, [darkTheme]);


	return (
	<div>
		<nav className={styles.nav}>
			<ActiveLink children="Home"  href="/">
				<img src="/favicon.ico" width={50} height={50}/>
			</ActiveLink>
			<p><Link href="/about">{t("about:title")}</Link></p>
			<p><Link href="/projects">{t("projects:title")}</Link></p>
			<p><ActiveLink children="contact"  href="/contact">{t("common:contact")}</ActiveLink></p>
			<p><Link href={router.asPath} locale={router.locales[(router.locales.indexOf(router.locale)+1)%router.locales.length]}><FontAwesomeIcon icon={faLanguage} size='2x'/></Link></p>
			<p className={styles.ico}><FontAwesomeIcon onClick={() => setDarkTheme(!darkTheme)} icon={faAdjust} size='2x'></FontAwesomeIcon></p>
		</nav>
		{children}
		<footer className={styles.footer}>
			<section>
				<p>Papop Lekhapanyaporn ; Pop ; Retaehc</p>
				<p>© {fullYear} Retaehc, All rights reserved</p>
			</section>
			<div>
				<h3  className={styles.ico}>
					<Link href="mailto:papop2003@gmail.com">
							<FontAwesomeIcon icon={faEnvelope} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://www.instagram.com/pop.pxp/" >
							<FontAwesomeIcon icon={faInstagram} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
				<h3  aria-hidden="true" className={styles.ico}>
					<Link href="https://github.com/Retaehc-pop">
						<FontAwesomeIcon icon={faGithub} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
				<h3 aria-hidden="true" className={styles.ico}>
					<Link href="tel:+66898118068">
						<FontAwesomeIcon icon={faPhone} size='2x' ></FontAwesomeIcon>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn">
							<FontAwesomeIcon icon={faStackOverflow} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
				<h3  className={styles.ico}>
					<Link href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/">
						<FontAwesomeIcon icon={faLinkedin} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://discordapp.com/users/267572826418970624">
						<FontAwesomeIcon icon={faDiscord} size='2x'></FontAwesomeIcon>
					</Link>
				</h3>
			</div>
		</footer>
	  </div>
	);
};
