import styles from '../styles/Pokemon.module.scss'
import Image from 'next/image'
import ArrowLeft from '../public/arrow-left.svg'
import Height from '../public/Height.svg'
import Weight from '../public/Weight.svg'
import { useContext } from 'react'
import {LanguageContext} from "../context/languageContext";

function PokemonDetail({pokemon, type, code, show, onClose }){
  const {language} = useContext(LanguageContext)
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  
  function format(value){
    if(value.toString().length < 2) {
      value = '0,' + value
    } else {
      let str = value.toString().split("");
      let lastNumber = ',' + str.splice(-1);
      value = str.join("") + lastNumber
    }
    return value
  }

  function translateType(type){
    switch (type) {
      case 'rock':
        return 'roca';
      case 'ghost':
        return 'fantasma';
      case 'steel':
        return 'acero';
      case 'water':
        return 'agua';
      case 'grass':
        return 'planta';
      case 'psychic':
        return 'psíquico';
      case 'ice':
        return 'hielo';
      case 'dark':
        return 'siniestro';
      case 'fairy':
        return 'hada';
      case 'fighting':
        return 'lucha';
      case 'flying':
        return 'volador';
      case 'poison':
        return 'veneno';
      case 'ground':
        return 'tierra';
      case 'bug':
        return 'bicho';
      case 'fire':
        return 'fuego';
      case 'electric':
        return 'eléctrico';
      case 'normal':
        return 'normal';
      case 'dragon':
        return 'dragón';
      default:
        break;
    }
  }

  function formatStat(stat){
    switch (stat) {
      case 'hp':
        return 'HP'
      case 'attack':
        return 'ATK';
      case 'defense':
        return 'DEF';
      case 'special-attack':
        return 'SATK';
      case 'special-defense':
        return 'SDEF';
      case 'speed':
        return 'SPD';
      default:
        break;
    }
  }

  function formatStatNumber (stat){
        while(stat.toString().length < 3) stat = '0' + stat
        return stat;
    }

  function getPercentage(value){
    let percentage = Math.ceil(value * 100 / 250) ;
    return percentage + '%'
  }
  return (
    <div>
      {show ? (
        <div className={`${styles.overlay} ${styles[type]}`}>
          <div className={`${styles.modal} ${styles[type]}`}>
            <div className={styles.header}>
              <a href="#" onClick={handleCloseClick}>
                <Image width={40} className={styles.arrow} src={ArrowLeft} alt='Go back'/>
              </a>
              <span className={styles.name}>{pokemon.name}</span>
              <span className={styles.code}>#{code} </span>
            </div>
            <div className={styles.body}>
              <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
              <div className={styles.infoContainer}>
                <div className={styles.types}>
                  {pokemon.types.map((type) => <span key={type.type.name} className={`${styles.type} ${styles[type.type.name]}`}>{language == 'en' ? type.type.name : translateType(type.type.name) }</span>)}
                </div>
                <h2 className={`${styles.title} ${styles[type]}`}>{language == 'en' ? 'About' : 'Información'}</h2>
                <div className={styles.generalInfo}>
                  <div className={styles.weight}>
                    <div className={styles.displayFlex}>
                      <Image width={25} height={10} className={styles.image} src={Weight} alt='weight' />
                      <p>{format(pokemon.weight)} kg</p>
                    </div>
                    <span>{language == 'en' ? 'Weight' : 'Peso'}</span>
                  </div>
                  <div className={styles.height}>
                    <div className={styles.displayFlex}>
                    <Image width={12} height={10} className={styles.image} src={Height} alt='height' />
                    <p>{format(pokemon.height)} m</p>
                    </div>
                    <span>{language == 'en' ? 'Height' : 'Altura'}</span>
                  </div>
                  <div className={styles.moves}>
                    <p>{pokemon.moves[0].move.name}{pokemon.moves[1] != undefined ? ', ' + pokemon.moves[1].move.name : ''}</p>
                    <span>{language == 'en' ? 'Moves' : 'Movimientos'}</span>
                  </div>
                </div>
                <div className={styles.description}>
                  {pokemon.info.map
                    ((description) => <p key={description.language.name}>
                      {description.language.name == language ? description.flavor_text : ''}
                    </p>)
                  }
                </div>
                <h2 className={`${styles.title} ${styles[type]}`}>{language == 'en' ? 'Base Stats' : 'Stats Básicos'} </h2>
                <div className={styles.stats}>
                  <ul>
                    {pokemon.stats.map((stat) => 
                      <li key={stat.stat.name}>
                        <span className={`${styles.statName} ${styles[type]}`}> {formatStat(stat.stat.name)}</span>
                        <span>{formatStatNumber(stat.base_stat)}</span>
                        <div className={styles.percentage}> <div className={`${styles.colorBar} ${styles[type]}`} style={{width: getPercentage(stat.base_stat)}}></div></div>
                      </li>)}
                    <li>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};


export default PokemonDetail