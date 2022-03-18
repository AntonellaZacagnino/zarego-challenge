import React, {useContext} from 'react';
import styles from '../styles/Header.module.scss'
import {LanguageContext} from "../context/languageContext";

function Header({sort, order}) {
    const {language, activeLanguage} = useContext(LanguageContext)
    const actualLang = language;
    return (
        <div className={styles.header}>
            <img className={styles.image} src='./Pokeball.png' alt="logo" />
            <h1>Pokédex</h1>
            <button className={styles.langBtn} onClick={() => activeLanguage(actualLang == 'en' ? 'es' : 'en')}>{actualLang == 'en' ? 'Spanish' : 'Inglés'} </button>
            <div className={styles.sort}>
                <span className={styles.tag}>#</span>
                <img id="arrow" onClick={() => sort(order)} className={styles.arrow} src='./arrow.svg' />
            </div>
        </div>
    )
}

export default Header