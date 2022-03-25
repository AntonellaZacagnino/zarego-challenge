import React, {useContext, useEffect} from "react";
import PokemonCard from "./PokemonCard";
import styles from '../styles/PokemonList.module.scss'
import ReactPaginate from 'react-paginate';
import {LanguageContext} from '../context/languageContext'
import Error from '../public/error.png'
import Image from 'next/image'

function PokemonList({list, currentPokemons, itemsPerPage, pageCount, setInitialItems, currentPage, setCurrentPage}) {
  const {language} = useContext(LanguageContext)
 
  const handlePageClick = (event) => {
    const newItems = (event.selected * itemsPerPage) % list.length;
    setInitialItems(newItems);
    setCurrentPage(event.selected)
  };
    return (
      <div>
        <ReactPaginate
           breakLabel="..."
           nextLabel={language == 'en' ? 'Next >' : 'Siguiente >'}
           onPageChange={handlePageClick}
           pageRangeDisplayed= {2}
           marginPagesDisplayed={2}
           pageCount={pageCount}
           previousLabel={language == 'en' ? '< Previous' : '< Anterior'}
           renderOnZeroPageCount={null}
           containerClassName={styles.paginator}
           activeLinkClassName={styles.active}
           nextLinkClassName={styles.next}
           previousLinkClassName={styles.prev}
           disabledLinkClassName={styles.disabled}
           pageLinkClassName={styles.page}
           breakLinkClassName={styles.break}
        />
        <ul className={styles.list}>
          {currentPokemons.length == 0 ? 
            <div className={styles.error}>
            <Image width={200} height={250} src={Error} alt='error' />
            {language == 'en' ? 
              <h1>Sorry, there are not results for your search</h1>
              :
              <h1>Lo siento, no hay resultados para tu búsqueda</h1>
            }
            </div>
            :
          currentPokemons.map((pokemon) => 
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          )}
        </ul>
      </div>
    )
}

export default PokemonList