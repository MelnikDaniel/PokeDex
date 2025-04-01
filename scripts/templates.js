function createPokemonCardTemplate(pokemon, sprite) {
    return `
        <div class="pokemon-card-name-and-id">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p><strong>ID:</strong> ${pokemon.id}</p>
        </div>
        <img src="${sprite}" alt="${pokemon.name}">
    `;
}

// Erstellt den Info-Inhalt für das Modal
function createInfoContent(pokemon, sprite) {
    return `
        <div class="pokemon-card-name-and-id">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p><strong>ID:</strong> ${pokemon.id}</p>
        </div>
        <img class="info-pokemon-sprite" src="${sprite}" alt="${pokemon.name}" style="max-width: 150px;">
        <div class="pokemon-types">
                ${getPokemonTypesHTML(pokemon.types)}
            </div>
        <div class="pokemon-card-infos">
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        </div>
        <div class="overlay-button">
            <button class="info-button">Info</button>
            <button class="stats-button">Stats</button>
        </div>
    `;
}


// Erstellt den Stats-Inhalt für das Modal
function createStatsContent(pokemon, sprite) {
    return `
        <div class="pokemon-card-stats">
            <canvas id="pokemonStatsChart"</canvas>
        </div>
        <div class="overlay-button">
            <button class="info-button">Info</button>
            <button class="stats-button">Stats</button>
        </div>
    `;
}

// Erstellt einen einzelnen Stat-Balken
function createStatBar(stat, label) {
    return `
        <div class="stat-item">
            <label>${label}:</label>
            <span>${stat.base_stat}</span>
            <div class="bar" style="width: ${stat.base_stat / 2}%"></div>
        </div>
    `;
}
