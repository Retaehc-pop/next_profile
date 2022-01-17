
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from 'react'
import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faAdjust, faEnvelope, faLanguage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithub, faStackOverflow,faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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
            <Link href="#about"><p>{t("about:title")}</p></Link>
            <Link href="#projects"><p>{t("projects:title")}</p></Link>
            <Link href="/contact"><p>{t("common:contact")}</p></Link>
        </nav>
        {children}
        <footer className={styles.footer}>
            <div className="contact-copyright">
                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <Link href={router.asPath} locale={router.locales[(router.locales.indexOf(router.locale)+1)%router.locales.length]}>
                        <p>
                        <FontAwesomeIcon icon={faLanguage} size='2x'/>
                        </p>
                    </Link>
                    <p className={styles.ico}><FontAwesomeIcon onClick={() => setDarkTheme(!darkTheme)} icon={faAdjust} size='2x'></FontAwesomeIcon></p>
                </div>
                <p>Papop Lekhapanyaporn ; Pop ; Retaehc</p>
                <p>© {fullYear} Retaehc, All rights reserved</p>
                
            </div>
            <div className="contact-icon" style={{display: 'flex',flexDirection: 'row'}}>
                <Link href="mailto:papop2003@gmail.com">
                    <h3  className={styles.ico}>
                        <FontAwesomeIcon icon={faEnvelope} size='2x'></FontAwesomeIcon>
                    </h3>
                </Link>
                <Link href="https://www.instagram.com/pop.pxp/" >
                    <h3 className={styles.ico}>
                        <FontAwesomeIcon icon={faInstagram} size='2x'></FontAwesomeIcon>
                    </h3>
                </Link>
                <Link href="https://github.com/Retaehc-pop">
                <h3  aria-hidden="true" className={styles.ico}>
                    <FontAwesomeIcon icon={faGithub} size='2x'></FontAwesomeIcon>
                </h3>
                </Link>
                <Link href="tel:+66898118068">
                <h3 aria-hidden="true" className={styles.ico}>
                    <FontAwesomeIcon icon={faPhone} size='2x' ></FontAwesomeIcon>
                </h3>
                </Link>
                <Link href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn">
                    <h3 className={styles.ico}>
                        <FontAwesomeIcon icon={faStackOverflow} size='2x'></FontAwesomeIcon>
                    </h3>
                </Link>
                <Link href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/">
                <h3  className={styles.ico}>
                    <FontAwesomeIcon icon={faLinkedin} size='2x'></FontAwesomeIcon>
                </h3>
                </Link>
                <Link href="https://discordapp.com/users/267572826418970624">
                <h3 className={styles.ico}>
                    <FontAwesomeIcon icon={faDiscord} size='2x'></FontAwesomeIcon>
                </h3>
                </Link>
            </div>
        </footer>
      </div>
    );
};
