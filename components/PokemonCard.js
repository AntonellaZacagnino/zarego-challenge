import React, {useState} from "react";
import styles from '../styles/PokemonCard.module.scss'
import PokemonDetail from "./PokemonDetail";


function PokemonCard({pokemon}) {
const [showModal, setShowModal] = useState(false);
    function formatCode (code){
        while(code.toString().length < 3) code = '0' + code
        return code;
    }
    const pokemonType = pokemon.types[0].type.name
    return(
      <div>
        <li onClick={() => setShowModal(true)} className={`${styles.card} ${styles[pokemonType]}`}> 
            <span className={`${styles.code} ${styles[pokemonType]}`}># {formatCode(pokemon.id)}</span>
            <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
            <span className={`${styles.name} ${styles[pokemonType]}`}>{pokemon.name} </span>
        </li>
            <PokemonDetail pokemon={pokemon} type={pokemonType} onClose={() => setShowModal(false)} code={formatCode(pokemon.id)} show={showModal} />
        </div>
    )
}

export default PokemonCard