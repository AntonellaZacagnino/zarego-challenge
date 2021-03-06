import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { getPokemonList, getPokemonData, getPokemonInfo } from "../data/api";
import Header from '../components/Header'
import Search from '../components/Search'
import PokemonList from '../components/PokemonList'
import { LanguageProvider } from '../context/languageContext'
import React, {useState, useEffect  } from 'react'

function Home({list}) {
  const [pageCount, setPageCount] = useState(0);
  const [initialItems, setInitialItems] = useState(0);
  const [sortOrder, setSortOrder] = useState('ASC')
  const itemsPerPage = 5
  const nextItems = initialItems + itemsPerPage;
  const [actualList, setActualList] = useState(list)
  const [currentPage,setCurrentPage] = useState(0)
  useEffect(() => {
    setPageCount(Math.ceil(actualList.length / itemsPerPage));
  }, [actualList]);

  function sort(pokemonList, order){
    if (pokemonList.length == 151){
      var newList = list;
    } else{
      var newList = pokemonList
    }
    const sorted = [...newList].sort((a,b) => {
      if (order == 'ASC' && a.id < b.id){
        setSortOrder('DESC')
        document.getElementById('arrow').setAttribute('style', 'transform: rotate(180deg);')
        return 1
      } else if (order == 'DESC' && a.id > b.id){
        setSortOrder('ASC')
        document.getElementById('arrow').setAttribute('style', 'transform: rotate(0deg);')
        return -1
      }
    });
    setActualList(sorted)
  }

  function makeSort(pokemonList){
    const sorted = [...pokemonList].sort((a,b) => {
      if (sortOrder == 'ASC' && a.id < b.id){
        return 1
      } else if (sortOrder == 'DESC' && a.id > b.id){
        return -1
      }
    });
    return sorted;
  }

  function search(event){
    let results = []
    if (event.key == 'Enter'){
      actualList.map(
        (pokemon) => { 
          if (pokemon.name.includes(event.target.value)) {
            results.push(pokemon)
          } 
        })
        setActualList(makeSort(results))
        setInitialItems(0)
      } else if (event.key == 'Backspace'){
        setInitialItems(currentPage)
        setActualList(makeSort(list))
      }
  }
  return (
    <LanguageProvider>
      <div className={styles.container}>
        <Head>
          <title>Welcome to Pok??dex!</title>
          <link rel="icon" href="/Pokeball.png" />
        <style>{`
          html {
            background-color: #f7f7f7;
          font-family: "PoppinsRegular";
          }
        `}
        </style>
        
        </Head>
        <Header list={actualList} order={sortOrder} sort={sort}/>
        <Search search={search} />
        <main className={styles.main}>
          <PokemonList itemsPerPage={itemsPerPage} list={actualList} currentPokemons={actualList.slice(initialItems, nextItems)} pageCount={pageCount} setInitialItems={setInitialItems} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </main>
        <footer className={styles.footer}>
          <p>Antonella Zacagnino - 2022 - <a href="https://github.com/AntonellaZacagnino" ><img src='./github.png' alt="github" /></a></p>
        </footer>
      </div>
    </LanguageProvider>
  )
}

export async function getStaticProps() {
  let list = [];
  try {
    let data = await getPokemonList();
    let pokemonList = data.pokemon_species
    for (const pokemon of pokemonList) {
      let pokemonData = await getPokemonData(pokemon.name);
      let pokemonInfo = await getPokemonInfo(pokemon.name)
      pokemonData['info'] = []
      for (const info of pokemonInfo.flavor_text_entries ) {
        if (pokemonData.id == pokemonInfo.id && info.language.name == 'en' || info.language.name == 'es'){
          if (info.version.name == 'lets-go-pikachu'){
            pokemonData['info'].push(info)
          }
        }
      }
      list.push(pokemonData)
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }

  if (!list) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
    },
  };
}

export default Home