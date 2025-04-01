const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'; // Basis-URL der API
const MAX_POKEMON = 151; // Maximale Anzahl Pokémon

// Holt Daten von der API mit Offset und Limit
async function getData(offset, limit) {
    const url = `${BASE_URL}?offset=${offset}&limit=${limit}`; // URL mit Parametern
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

// Holt die Details eines einzelnen Pokémon
async function getPokemonDetails(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function fetchAllPokemon() {
    const response = await fetch(`${BASE_URL}?limit=${MAX_POKEMON}`);
    const data = await response.json();
    allPokemon = data.results; // Speichere alle Pokémon-Daten global
}