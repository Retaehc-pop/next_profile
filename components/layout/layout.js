
import { useRouter } from 'next/router'
import styles from '../../styles/Layout.module.scss'
import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from 'react'
import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faAdjust, faBars, faEnvelope, faLanguage, faPhone} from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
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
	const [isOpen,setIsOpen] = useState(false)
	const [darkTheme, setDarkTheme] = useState(undefined);
	let router = useRouter()
	let { t } = useTranslation()
	const date = new Date("December 20,2021");
	const fullYear = date.getFullYear();
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
				<h2 onClick={()=>setIsOpen(!isOpen)} ><FontAwesomeIcon icon={isOpen ? faXmarkCircle:faBars} size='2x'/></h2>
				<div className={isOpen? "":styles.hidden}>
					<Link children="Home"  href="/" passHref>
						<img src="/favicon.ico" width={50} height={50}/>
					</Link>
					<Link href="/about" passHref><a>{t("about:title")}</a></Link>
					<Link href="/projects" passHref><a>{t("projects:title")}</a></Link>
					<Link children="contact"  href="/contact" passHref><a>{t("common:contact")}</a></Link>
					<Link href={router.asPath} locale={router.locales[(router.locales.indexOf(router.locale)+1)%router.locales.length]} passHref><a><FontAwesomeIcon icon={faLanguage} size='2x'/></a></Link>
					<h3 className={styles.ico}><FontAwesomeIcon onClick={() => setDarkTheme(!darkTheme)} icon={faAdjust} size='2x'/></h3>
				</div>
		</nav>
		{children}
		<footer className={styles.footer}>
			<section>
				<p>Papop Lekhapanyaporn ; Pop ; Retaehc</p>
				<p>© {fullYear} Retaehc, All rights reserved</p>
			</section>
			<div>
				<h3  className={styles.ico}>
					<Link href="mailto:papop2003@gmail.com" passHref>
						<a>
							<FontAwesomeIcon icon={faEnvelope} size='2x'/>
						</a>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://www.instagram.com/pop.pxp/" passHref>
						<a>
							<FontAwesomeIcon icon={faInstagram} size='2x'/>
							</a>
					</Link>
				</h3>
				<h3  aria-hidden="true" className={styles.ico}>
					<Link href="https://github.com/Retaehc-pop" passHref>
					<a>
						<FontAwesomeIcon icon={faGithub} size='2x'/>
						</a>
					</Link>
				</h3>
				<h3 aria-hidden="true" className={styles.ico}>
					<Link href="tel:+66898118068" passHref>
					<a>
						<FontAwesomeIcon icon={faPhone} size='2x'/>
						</a>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn" passHref>
						<a>
							<FontAwesomeIcon icon={faStackOverflow} size='2x'/>
							</a>
					</Link>
				</h3>
				<h3  className={styles.ico}>
					<Link href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/" passHref>
					<a>
						<FontAwesomeIcon icon={faLinkedin} size='2x'/>
						</a>
					</Link>
				</h3>
				<h3 className={styles.ico}>
					<Link href="https://discordapp.com/users/267572826418970624" passHref>
					<a>
						<FontAwesomeIcon icon={faDiscord} size='2x'/>
						</a>
					</Link>
				</h3>
			</div>
		</footer>
	  </div>
	);
};
