const dataPokemon = document.querySelector("#data-pokemon");
const namePokemonDetalle = document.querySelector("#name-pokemon-detalle");
const imagePokemonDetalle = document.querySelector("#image");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"), {});

const createCards = (pokemones = []) => {
    pokemones.forEach((pokemon, index) => {

        obtenerImagenPokemones(index).then((data) => {
            const card = `<div class='col-md-4 mb-2'>
                            <div class='card'>
                                <img src='${data}' class='card-img-top' alt='...' height='100px' width='100px'>
                                <div class='card-body'>
                                    <h5 class='card-title'>${pokemon.name}</h5>
                                    <button onclick='obtenerDetallePokemon(${index})' class="btn btn-danger btn-block">Detalle</button>
                                </div>
                            </div>
                        </div>`;
            dataPokemon.innerHTML += card;
        });
    });
}

const asignaDetallePokemon = (dato) => {
    namePokemonDetalle.innerHTML = "Detalle de pokemon " + dato.species.name.toUpperCase();
    image.src = dato.sprites.other.dream_world.front_default;
}

const obtenerDetallePokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    const data = await response.json();
    modal.show();
    asignaDetallePokemon(data);
}


const obtenerImagenPokemones = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    const data = await response.json();
    //console.log(data.sprites.other.dream_world.front_default);
    return data.sprites.other.dream_world.front_default;
}


const obtenerPokemones = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await response.json();
    //console.log(data.results)
    createCards(data.results);
}

obtenerPokemones();