
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
            <p>{t("about:title")}</p>
            <p>{t("projects:title")}</p>
            <p>{t("common:contact")}</p>
        </nav>
        {children}
        <footer className={styles.footer}>
            <div className="contact-copyright">
                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <p><Link href={router.asPath} locale={router.locales[(router.locales.indexOf(router.locale)+1)%router.locales.length]}>
                        <FontAwesomeIcon icon={faLanguage} size='2x'/>
                        </Link></p>
                    <p className={styles.ico}><FontAwesomeIcon onClick={() => setDarkTheme(!darkTheme)} icon={faAdjust} size='2x'></FontAwesomeIcon></p>
                </div>
                <p>Papop Lekhapanyaporn ; Pop ; Retaehc</p>
                <p>© 2021 Retaehc, All rights reserved</p>
                
            </div>
            <div className="contact-icon" style={{display: 'flex',flexDirection: 'row'}}>
                <a href="mailto:papop2003@gmail.com" className={styles.ico}>
                    <FontAwesomeIcon icon={faEnvelope} size='2x'></FontAwesomeIcon>
                </a>
                <a href="https://www.instagram.com/pop.pxp/" className={styles.ico}>
                    <FontAwesomeIcon icon={faInstagram} size='2x'></FontAwesomeIcon>
                </a>
                <a href="https://github.com/Retaehc-pop" aria-hidden="true" className={styles.ico}>
                    <FontAwesomeIcon icon={faGithub} size='2x'></FontAwesomeIcon>
                </a>
                <a href="tel:+66898118068" aria-hidden="true" className={styles.ico}>
                    <FontAwesomeIcon icon={faPhone} size='2x' ></FontAwesomeIcon>
                </a>
                <a href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn" className={styles.ico}>
                    <FontAwesomeIcon icon={faStackOverflow} size='2x'></FontAwesomeIcon>
                </a>
                <a href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/" className={styles.ico}>
                    <FontAwesomeIcon icon={faLinkedin} size='2x'></FontAwesomeIcon>
                </a>
                <a href="https://discordapp.com/users/267572826418970624" className={styles.ico}>
                    <FontAwesomeIcon icon={faDiscord} size='2x'></FontAwesomeIcon>
                </a>
            </div>
        </footer>
      </div>
    );
};
