import { useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/loading-screen/loading-screen";
import Pokemon from "../../components/pokemon/pokemon";

const PokemonSearch = () => {

    // Initialisation des variables d'etats pour la requete
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pokemonData, setPokemonData] = useState(null);

    // Méthode qui lance la requete AJAX
    const handleSearchPokemon = () => {
        // Remise à zero du state
        setLoading(true);
        setErrorMessage('');
        setPokemonData(null);

        // Envoi de la requete AJAX
        axios.get('https://pokeapi.co/api/v2/pokemon-species/25')
            .then(response => {
                setPokemonData({
                    name: response.data.name,
                    legendary: response.data.is_legendary,
                    habitat: response.data.habitat?.name,
                    captureRate: response.data.capture_rate,
                    flavorText: 'TODO ;)'
                });
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <main>
            <h1>Demo Ajax - Recherche de pokemon</h1>
            <button onClick={handleSearchPokemon}>
                Rechercher un pokemon
            </button>
            {isLoading ? (
                <LoadingScreen />
            ) : errorMessage ? (
                <h2>{errorMessage}</h2>
            ) : pokemonData !== null && (
                <Pokemon {...pokemonData} />
            )}
        </main>
    )
};

export default PokemonSearch;