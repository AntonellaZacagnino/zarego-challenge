import React, {useContext} from "react";
import PokemonCard from "./PokemonCard";
import styles from '../styles/PokemonList.module.scss'
import ReactPaginate from 'react-paginate';
import {LanguageContext} from '../context/languageContext'

function PokemonList({list, currentPokemons, itemsPerPage, pageCount, setInitialItems}) {
  const {language} = useContext(LanguageContext)
  const handlePageClick = (event) => {
    const newItems = (event.selected * itemsPerPage) % list.length;
    setInitialItems(newItems);
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
          {currentPokemons.map((pokemon) => 
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          )}
        </ul>
      </div>
    )
}

export default PokemonList