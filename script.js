const apiKey = 'f9994295'; // Replace with your OMDb API key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');
const favoritesContainer = document.getElementById('favorites-container');
const homePage = document.getElementById('home-page');
const favoritesPage = document.getElementById('favorites-page');
const homePageBtn = document.getElementById('home-page-btn');
const favoritesPageBtn = document.getElementById('favorites-page-btn');
let currentPage = 1;
const resultsPerPage = 10;
const totalResultsToFetch = 50;

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        moviesContainer.innerHTML = `<p>Loading...</p>`;
        currentPage = 1;
        fetchMovies(query, currentPage);
    } else {
        moviesContainer.innerHTML = `<p>Please enter a movie name to search.</p>`;
    }
});

// Function to fetch movies from the API
function fetchMovies(query, page) {
    fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);

                const totalPages = Math.ceil(data.totalResults / resultsPerPage);
                if (currentPage < totalPages && resultsPerPage * currentPage < totalResultsToFetch) {
                    currentPage++;
                    fetchMovies(query, currentPage);
                }
            } else {
                moviesContainer.innerHTML = `<p>No results found for "${query}".</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            moviesContainer.innerHTML = `<p>Error loading movies. Please try again later.</p>`;
        });
}

// Function to display the movies
function displayMovies(movies) {
    if (currentPage === 1) moviesContainer.innerHTML = ''; // Clear previous results on first page
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = movie.Poster !== "N/A" ? movie.Poster : 'image.png'; // Fallback image
        movieCard.innerHTML = `
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="movie-link">
                <img src="${moviePoster}" alt="${movie.Title} Poster">
                <h2 class="movie-title">${movie.Title}</h2>
                <p class="movie-details">Released: ${movie.Year}</p>
            </a>
            <button class="heart-icon" data-id="${movie.imdbID}" data-title="${movie.Title}" data-poster="${moviePoster}" data-year="${movie.Year}">
                ❤️
            </button>
        `;
        moviesContainer.appendChild(movieCard);
    });

    // Add event listeners to heart icons (make sure this is inside displayMovies to avoid re-attaching listeners)
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(button => {
        // Remove existing event listeners before attaching new ones (prevents duplication)
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelector(`[data-id="${button.getAttribute('data-id')}"]`);
        
        newButton.addEventListener('click', () => {
            const movieData = {
                id: newButton.getAttribute('data-id'),
                title: newButton.getAttribute('data-title'),
                poster: newButton.getAttribute('data-poster'),
                year: newButton.getAttribute('data-year')
            };
            addToFavorites(movieData);
        });
    });
}

// Function to add a movie to favorites
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.title} added to favorites!`);
    } else {
        alert(`${movie.title} is already in your favorites.`);
    }
}

// Function to display favorites
function displayFavorites() {
    favoritesContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length > 0) {
        favorites.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <a href="https://www.imdb.com/title/${movie.id}" target="_blank">
                    <img src="${movie.poster}" alt="${movie.title} Poster">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="movie-details">Released: ${movie.year}</p>
                </a>
                <button class="remove-button" data-id="${movie.id}">Remove</button>
            `;
            favoritesContainer.appendChild(movieCard);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                removeFromFavorites(button.getAttribute('data-id'));
            });
        });
    } else {
        favoritesContainer.innerHTML = `<p>No favorites added yet.</p>`;
    }
}

// Function to remove a movie from favorites
function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Refresh favorites page
}

// Toggle between Home and Favorites pages
homePageBtn.addEventListener('click', () => {
    homePage.style.display = 'block';
    favoritesPage.style.display = 'none';
});

favoritesPageBtn.addEventListener('click', () => {
    homePage.style.display = 'none';
    favoritesPage.style.display = 'block';
    displayFavorites();
});

// Load trending movies on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultQuery = 'Avengers';
    fetchMovies(defaultQuery, currentPage);
});
