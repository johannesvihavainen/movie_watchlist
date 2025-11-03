const searchMovieInput = document.getElementById('search-movie-input')
const searchButton = document.getElementById('search-button')
const movies = document.getElementById('movies')

searchButton.addEventListener('click', getData)
async function getData() {
    if (searchMovieInput.value === '') return
    const url = `https://www.omdbapi.com/?t=${searchMovieInput.value}&apikey=8523921b`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        const result = await response.json()
        console.log(result)

        displayMovies()

        function displayMovies() {
            const movieContainer = document.createElement('div')
            movieContainer.classList.add('movie-container')
            const coverImage = document.createElement('img')
            coverImage.src = result.Poster
            coverImage.classList.add('cover-image')
            movieContainer.appendChild(coverImage)

            const contentWrapper = document.createElement('div')
            contentWrapper.classList.add('content-wrapper')

            const titleAndReviewsWrapper = document.createElement('div')
            titleAndReviewsWrapper.classList.add('title-and-reviews-wrapper')


            const title = document.createElement('p')
            title.textContent = result.Title
            title.classList.add('title')
            titleAndReviewsWrapper.appendChild(title)

            const ratings = document.createElement('p')
            ratings.textContent = `⭐ ${result.Ratings[0].Value.slice(0, 3)}`
            ratings.classList.add('ratings')
            titleAndReviewsWrapper.appendChild(ratings)

            contentWrapper.appendChild(titleAndReviewsWrapper)

            const lengthKindAndWatchlist = document.createElement('div')
            lengthKindAndWatchlist.classList.add('length-kind-and-watchlist')

            const length = document.createElement('p')
            length.textContent = `${result.Runtime}`
            length.classList.add('length')
            lengthKindAndWatchlist.appendChild(length)

            const genre = document.createElement('p')
            genre.textContent = `${result.Genre}`
            genre.classList.add('genre')
            lengthKindAndWatchlist.appendChild(genre)

            contentWrapper.appendChild(lengthKindAndWatchlist)

            const addToWatchlistWrapper = document.createElement('div')
            addToWatchlistWrapper.classList.add('add-to-watchlist-wrapper')

            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("xmlns", svgNS);
            svg.setAttribute("fill", "none");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("stroke-width", "1.5");
            svg.setAttribute("stroke", "currentColor");
            svg.classList.add("size-6");

            // Create path inside SVG
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            path.setAttribute("d", "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z");

            svg.appendChild(path);
            addToWatchlistWrapper.appendChild(svg)

            const addToWatchlistBtn = document.createElement('button')
            addToWatchlistBtn.textContent = `watchlist`
            addToWatchlistBtn.classList.add('genre')
            addToWatchlistWrapper.appendChild(addToWatchlistBtn)
            lengthKindAndWatchlist.appendChild(addToWatchlistWrapper)

            const description = document.createElement('p')
            description.classList.add('description')
            description.textContent = result.Plot

            contentWrapper.appendChild(description)

            movieContainer.appendChild(contentWrapper)



            movies.appendChild(movieContainer)
        }
    } catch (error) {
        console.error(error.message)
    }
}