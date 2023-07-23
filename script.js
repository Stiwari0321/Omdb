const apiBaseUrl = "https://www.omdbapi.com";
const apiKey = "692e9d93";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/?s=now_playing&apikey=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = await Promise.all(
        jsonResponse.Search.map(async (result) => ({
            id: result.imdbID,
            title: result.Title,
            poster_path: result.Poster,
            vote_average: "",
        }))
    );
    displayMovies(movies);
}

async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}/?s=${query}&apikey=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = await Promise.all(
        jsonResponse.Search.map(async (result) => ({
            id: result.imdbID,
            title: result.Title,
            poster_path: result.Poster,
            vote_average: "",
        }))
    );
    displayMovies(movies);
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies
        .map(
            (movie) =>
                `<div class="movie-card">
                    <a href="https://www.imdb.com/title/${movie.id}/">
                        <img src="${movie.poster_path}" />
                        <h1>${movie.title}</h1>
                    </a>
                 </div>`
        )
        .join("");
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    categoryTitle.innerHTML = "Search Results";
    const searchQuery = searchInput.value;
    searchMovies(searchQuery);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();
