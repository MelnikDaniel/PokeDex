// Globale Konstanten und Variablen
const LIMIT = 20; // Anzahl Pokémon pro Ladevorgang
let currentOffset = 0; // Aktueller Offset
let allPokemon = []; // Speichert alle Pokémon-Daten

// -------------------- Initialisierung -------------------- //
async function onloadFunc() {
    try {
        // Lade alle Pokémon-Daten
        await fetchAllPokemon();

        // Zeige die ersten Pokémon
        await loadInitialPokemon();

        // Event-Listener einrichten
        setupSearchListener();
        setupLoadMoreButton();
    } catch (error) {
        console.error("Error initializing:", error);
    }
}

// -------------------- Datenbeschaffung -------------------- //

// Lade Pokémon basierend auf Offset und Limit
async function loadPokemon(offset, limit) {
    const actualLimit = Math.min(limit, MAX_POKEMON - offset);
    const data = await getData(offset, actualLimit);
    displayPokemonCards(data.results);
}

// -------------------- Rendering -------------------- //

// Zeigt die ersten Pokémon an
async function loadInitialPokemon() {
    currentOffset = 0; // Zurücksetzen
    const initialPokemon = allPokemon.slice(0, LIMIT); // Erste Pokémon
    await displayPokemonCards(initialPokemon);
}

// Zeigt eine Liste von Pokémon an
async function displayPokemonCards(pokemonList) {
    const container = document.getElementById('pokemon-container');
    // container.innerHTML = ''; // Container leeren

    for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.url); // Pokémon-Details holen
        const pokemonData = await response.json();
        const pokemonDiv = createPokemonDiv(pokemonData);
        container.appendChild(pokemonDiv);
    }
}

// -------------------- Suche -------------------- //

// Suche Pokémon basierend auf dem eingegebenen Text
async function searchPokemon(query) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Container leeren

    if (query.length < 3) {
        await loadInitialPokemon(); // Standardliste anzeigen
        return;
    }

    // Filtere Pokémon nach Namen
    const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredPokemon.length === 0) {
        container.innerHTML = '<p>No Pokémon found</p>';
        return;
    }

    await displayPokemonCards(filteredPokemon);
}

// -------------------- UI-Elemente -------------------- //

// Erstellt ein Div für ein Pokémon
function createPokemonDiv(pokemon) {
    const div = document.createElement('div');
    div.className = 'pokemon-card';

    // Sprite und Hintergrund setzen
    const sprite = getPokemonSprite(pokemon);
    const primaryType = pokemon.types[0].type.name;
    const backgroundPath = getPokemonBackground(primaryType);

    div.style.backgroundImage = `url('${backgroundPath}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';

    div.innerHTML = createPokemonCardTemplate(pokemon, sprite);
    div.addEventListener('click', () => showPokemonDetails(pokemon));
    return div;
}

// -------------------- Hilfsfunktionen -------------------- //

// Holt den Sprite eines Pokémon
function getPokemonSprite(pokemon) {
    return pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default;
}

// Holt den Hintergrund basierend auf dem Typ
function getPokemonBackground(type) {
    return `assets/pokemonTyps/GO_${type}-type_background.png`;
}

// -------------------- Event-Listener -------------------- //

// Konfiguriert den Such-Event-Listener
function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', (event) => {
        const query = event.target.value;
        searchPokemon(query);
    });
}

// Konfiguriert den Button für "Mehr laden"
function setupLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', async () => {
        if (currentOffset < MAX_POKEMON) {
            currentOffset += LIMIT;
            await loadPokemon(currentOffset, LIMIT);
        }
        if (currentOffset >= MAX_POKEMON - LIMIT) {
            disableLoadMoreButton(loadMoreButton);
        }
    });
}

// Deaktiviert den "Mehr laden"-Button
function disableLoadMoreButton(button) {
    button.disabled = true;
    button.textContent = "No more Pokémon to load";
}

// -------------------- Modals -------------------- //

// Zeigt Details eines Pokémon in einem Modal
function showPokemonDetails(pokemon) {
    const sprite = getPokemonSprite(pokemon);
    const overlay = createOverlay();
    const modal = createModal(pokemon, sprite);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// Erstellt ein Modal für ein Pokémon
function createModal(pokemon, sprite) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const primaryType = pokemon.types[0].type.name;
    const backgroundImage = getPokemonBackground(primaryType);

    modal.style.backgroundImage = `url(${backgroundImage})`;
    modal.style.backgroundSize = "cover";
    modal.style.backgroundPosition = "center";
    modal.innerHTML = createInfoContent(pokemon, sprite);

    addModalEventListeners(modal, pokemon, sprite);
    return modal;
}

// Erstellt ein Overlay
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlay(overlay);
        }
    });
    return overlay;
}

// Schließt das Overlay
function closeOverlay(overlay) {
    document.body.removeChild(overlay);
}

// -------------------- Event-Listener für Modals -------------------- //

function addModalEventListeners(modal, pokemon, sprite) {
    const addListeners = () => {
        modal.querySelector('.info-button').addEventListener('click', (event) => {
            event.stopPropagation();
            modal.innerHTML = createInfoContent(pokemon, sprite);
            addListeners();
        });
        modal.querySelector('.stats-button').addEventListener('click', (event) => {
            event.stopPropagation();
            modal.innerHTML = createStatsContent(pokemon, sprite);
            addListeners();
            renderHexagonStats(pokemon);
        });
    };
    addListeners();
}

// -------------------- Rendering Stats -------------------- //

function renderHexagonStats(pokemon) {
    const stats = pokemon.stats.map(stat => stat.base_stat);
    const labels = ["HP", "Attack", "Defense", "Sp-Attack", "Sp-Defense", "Speed"];

    const ctx = document.getElementById('pokemonStatsChart').getContext('2d');
    renderChart(ctx, stats, labels, pokemon.name);
}

function getPokemonTypesHTML(types) {
    return types
        .map(typeInfo => {
            const typeName = typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1); // Typ-Name mit großem Anfangsbuchstaben
            const typeImgURL = `assets/pokemonTyps/${typeName}IC.png`; // Pfad zu deinem lokalen Bild
            return `<img class="pokemon-type-icon" src="${typeImgURL}" alt="${typeName}" title="${typeName}">`;
        })
        .join('');
}