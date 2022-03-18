import React, {useContext} from "react";
import styles from '../styles/Search.module.scss'
import {LanguageContext} from '../context/languageContext'

function Search({search}) {
    const {language} = useContext(LanguageContext)
    return (
        <div className={styles.search}>
            <img className={styles.image} src="./search.png" alt="search" />
            <input type='text' onKeyDown={search} placeholder={language == 'en' ? 'Search' : 'Buscar'}/>
            
        </div>
    )
}

export default Search