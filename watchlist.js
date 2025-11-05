const watchlistContainer = document.getElementById('watchlist')

function displayWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `
        <div class="empty-watchlist">
            <p>Your watchlist is empty.<p>
            <a href="index.html" class="go-back-link">Search for movies</a>
        </div>
        `
        return
    }

    watchlistContainer.innerHTML = ''

watchlist.forEach(movie => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')

    movieContainer.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}" class="cover-image">
    <div class="content-wrapper">
        <div class="title-and-reviews-wrapper">
            <p class="title">${movie.title}</p>
            <p class="ratings">⭐ ${movie.rating ? movie.rating.slice(0, 3) : "N/A"}</p>
        </div>
        <div class="length-kind-and-watchlist">
            <p class="length">${movie.runtime}</p>
            <p class="genre">${movie.genre}</p>
        </div>
        <p class="description">${movie.plot}</p>
        <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
    </div>
    `

    watchlistContainer.appendChild(movieContainer)
})

document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id')
        removeFromWatchlist(id)
    })
})

function removeFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    watchlist = watchlist.filter(movie => movie.imdbID !== id)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    displayWatchlist()
}
}



displayWatchlist()