

export async function getPokemonList() {
  let list;
  try {
    list = await fetch(
      `https://pokeapi.co/api/v2/generation/1/`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Oh no! The Team Rocket broke the request");
      }
      return response.json();
    });
  } catch (e) {
    console.log("Oh no! The Team Rocket broke the request");
    throw e;
  }
  return list;
}

export async function getPokemonData(pokemon){
    let data;
    try {
        data = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/').then((response) =>{
            if(!response.ok){
                throw new Error("Oh no! The Team Rocket broke the request");
            }
            return response.json();
        });
    } catch (e) {
        console.log("Oh no! The Team Rocket broke the request");
        throw e;
    }
    return data;
}

export async function getPokemonInfo(pokemon){
    let data;
    try {
        data = fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon ).then((response) =>{
            if(!response.ok){
                throw new Error("Oh no! The Team Rocket broke the request");
            }
            return response.json();
        });
    } catch (e) {
        console.log("Oh no! The Team Rocket broke the request");
        throw e;
    }
    return data;
}

