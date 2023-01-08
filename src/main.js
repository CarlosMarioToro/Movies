const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'es-CO',
    },
});

const API_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/';

const screen = {
        small: null,
        medium: window.matchMedia('(min-width: 400px)'),
        large: window.matchMedia('(min-width: 800px)')
    };

let imageSize = 'w342';

function resizeHandler() {

    // get window width
    if (window.matchMedia("(max-width: 375px)").matches) {
        imageSize = 'w342';
    } else if (window.matchMedia("(min-width: 376px) and (max-width: 992px)").matches) {
        imageSize = 'w500';     
    } else if (window.matchMedia("(min-width: 993px)").matches) {
        imageSize = 'original';   
    }
    getPlayingMoviesPreview();
    getPopularMoviesPreview();
    getTrendingMoviesPreview();
    getUpcomingMoviesPreview();
    getTopRatedMoviesPreview();
    
}

function minutesToString(minutes) {
    var hour = Math.floor(minutes / 60);
    var minute = minutes % 60;
    return hour + 'h ' + minute + 'min';
}

const toggleButton = document.getElementById('button-menu')
const navWrapper = document.getElementById('nav')

toggleButton.addEventListener('click', () => {
    getCategoriesMenu();
    toggleButton.classList.toggle('close');
    navWrapper.classList.toggle('show');
})

navWrapper.addEventListener('click', e => {
    if (e.target.id === 'nav') {
        navWrapper.classList.remove('show')
        toggleButton.classList.remove('close')
    }
})

function createMovies(movies, container) {
    container.innerHTML = '';

    if (createMovies.caller.name === 'getTrendingMoviesPreview') {
        where = 'Trending';
    } else if (createMovies.caller.name === 'getRelatedMoviesPreview') {
        where = 'Related';
    } else if (createMovies.caller.name === 'getPopularMoviesPreview') {
        where = 'Popular';
    } else if (createMovies.caller.name === 'getUpcomingMoviesPreview') {
        where = 'Upcoming';
    } else {
        where = 'Category';
    }

    movies.forEach(movie => {
        if (movie.poster_path !== null) {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');
    
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute('title', movie.title);
            movieImg.setAttribute('src', IMAGE_URL + imageSize + movie.poster_path);
            movieImg.setAttribute('where', where);
    
            movieImg.addEventListener('click', () => {
                location.hash = `#movieDetails=${movie.id}-${movie.original_title}`;
                getMovieDetails(movie.id);
            });
    
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);            
        }
    });
}

async function getCredits(id) {
    const { data } = await api(`/movie/${id}/credits`);
    
    const persons = data.cast;

    DetailsCreditsPersons.innerHTML = '';

    persons.forEach(person => {
        if (person.profile_path !== null) {
            const personContainer = document.createElement('div');
            personContainer.classList.add('personImg-container');
        
            const personImg = document.createElement('img');
            const personName = document.createElement('h3');
            personImg.classList.add('person-img');
            personImg.setAttribute('alt', person.name);
            personImg.setAttribute('title', person.name);
            personImg.setAttribute('src', IMAGE_URL + imageSize + person.profile_path);
            
            personName.classList.add('personName');
            const personNameText = document.createTextNode(person.name);
            personName.appendChild(personNameText);
            
            personContainer.appendChild(personImg);
            personContainer.appendChild(personName)
            DetailsCreditsPersons.appendChild(personContainer);            
        }
    });

}

async function getTrailers(id) {
    const { data } = await api(`/movie/${id}/videos`);

    DetailsTrailersTrailer.innerHTML = '';
    
    const videos = data.results;
    videos.forEach(video => {
        if (video.site === 'YouTube') {
            const videoTrailerContainer = document.createElement('div');
            const videoTrailerImage = document.createElement('img');
            const videoTrailer = document.createElement('a');
            const videoTitle = document.createElement('h3');
            videoTrailer.href = 'https://www.youtube.com/watch?v=' + video.key;
            videoTrailer.target = '_blank';
            videoTrailerImage.src = 'https://i.ytimg.com/vi/' + video.key + '/hqdefault.jpg';
            videoTrailerImage.width = '175';
            videoTrailerImage.height = '117';
            videoTrailerImage.alt = video.name;

            videoTrailerContainer.classList.add('videoContainer')
            videoTrailer.classList.add(video.id);
            const videoTitleText = document.createTextNode(video.name);
            videoTitle.appendChild(videoTitleText);
            videoTitle.classList.add('videoTitle')
            
            videoTrailer.appendChild(videoTrailerImage);
            videoTrailerContainer.appendChild(videoTrailer);
            videoTrailerContainer.appendChild(videoTitle);
            DetailsTrailersTrailer.appendChild(videoTrailerContainer);
        }
    })
}

async function getPlayingMoviesPreview() {
    const { data } = await api('/movie/now_playing');

    const movies = data.results;
    createMovies(movies, playingMoviesPreviewList);
}

async function getPopularMoviesPreview() {
    const { data } = await api('/movie/popular');

    const movies = data.results;
    createMovies(movies, popularMoviesPreviewList);
}

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
}

async function getUpcomingMoviesPreview() {
    const { data } = await api('/movie/upcoming');

    const movies = data.results;
    createMovies(movies, upcomingMoviesPreviewList);
}

async function getTopRatedMoviesPreview() {
    const { data } = await api('/movie/top_rated');

    const movies = data.results;
    createMovies(movies, topRatedMoviesPreviewList);
}

async function getMovieDetails(id) {
    const { data } = await api('/movie/' + id);

    DetailsDescription.innerHTML = '';
    DetailsCharacteristics.innerHTML = '';
    DetailsGenres.innerHTML = '';
    DetailsDuration.innerHTML = '';
    DetailsCollection.innerHTML = '';

    const detailsTitle = document.createElement('h2');
    detailsTitle.classList.add('movieDetails-title');
    const detailsScore = document.createElement('span');
    detailsScore.classList.add('movieDetails-score');
    const detailsReleaseDateSpan = document.createElement('span');
    detailsReleaseDateSpan.classList.add('movieDetails-releaseSpan');
    const detailsDurationSpan = document.createElement('span');
    detailsDurationSpan.classList.add('movieDetails-durationSpan');
    const detailsStatusSpan = document.createElement('span');
    detailsStatusSpan.classList.add('movieDetails-statusSpan');
    const detailsSpanDescription = document.createElement('span');
    detailsSpanDescription.classList.add('movieDetails-descriptionSpan');

    if (data.belongs_to_collection !== null) {
        const detailDescriptionCollection_button = document.createElement('button');
        const detailDescriptionCollection_image = document.createElement('img');
        detailDescriptionCollection_button.innerText = 'VER LA COLECCION';
        detailDescriptionCollection_button.classList.add('movieDetails-collectionsBtn');
        detailDescriptionCollection_image.classList.add('movieCollection-img');
        detailDescriptionCollection_image.setAttribute('alt', data.title);
        detailDescriptionCollection_image.setAttribute('src', IMAGE_URL + imageSize + data.belongs_to_collection.backdrop_path);        
        DetailsCollection.appendChild(detailDescriptionCollection_button);
        DetailsCollection.appendChild(detailDescriptionCollection_image);
    } else {
        DetailsCollection.classList.add('inactive');
    }

    const detailsTitleText = document.createTextNode(data.title);
    const average = data.vote_average;
    const detailsScoreText = document.createTextNode(Number(average.toFixed(2)));
    detailsReleaseDateSpan.innerText = data.release_date
    detailsDurationSpan.innerText = minutesToString(data.runtime);
    detailsStatusSpan.innerText = data.status;
    detailsSpanDescription.innerText = data.overview;

    DetailsImage.classList.add('movieDetails-img');
    if (data.backdrop_path !== null) {
        DetailsImage.setAttribute('src', IMAGE_URL + imageSize + data.backdrop_path);        
    } else {
        DetailsImage.setAttribute('src', IMAGE_URL + imageSize + data.poster_path);        
    }
    detailsTitle.appendChild(detailsTitleText);
    detailsScore.appendChild(detailsScoreText);
    DetailsDuration.appendChild(detailsReleaseDateSpan)
    DetailsDuration.appendChild(detailsDurationSpan);
    DetailsDuration.appendChild(detailsStatusSpan);
    DetailsCharacteristics.appendChild(detailsTitle);
    DetailsCharacteristics.appendChild(detailsScore);
    data.genres.forEach(genre => {
        const genreSpanContainer = document.createElement('span');
        genreSpanContainer.innerText = genre.name;        
        genreSpanContainer.classList.add('genre');
        
        DetailsGenres.appendChild(genreSpanContainer);
    })
    DetailsDescription.appendChild(detailsSpanDescription);
    getCredits(id);
    getTrailers(id);
    getRelatedMoviesPreview(id);
}

async function getRelatedMoviesPreview(id) {
    const { data } = await api('/movie/' + id + '/similar');

    const movies = data.results;
    createMovies(movies, relatedMoviesPreviewList);
}

async function getMoviesBySearch(query) {
    const { data } = await api('/search/movie?query=' + query);
    // alert('Hagale');

    const movies = data.results;
    console.log(movies);
    console.log(query);
    createMovies(movies, searchPreviewMovieList);
}

async function getCategoriesMoviesPreview(id) {
    const { data } = await api('/discover/movie?with_genres=' + id);

    const movies = data.results;
    createMovies(movies, categoriesPreviewMovieList);
}

async function getCategoriesMenu() {
    const { data } = await api('/genre/movie/list');
    
    const categories = data.genres;
    categoriesPreviewList.innerHTML = "";
    const categoryContainer = document.createElement('ul');
    categories.forEach(category => {
        const categorylist = document.createElement('li');
        const categoryElement = document.createElement('a');
        categoryElement.href = '#categories=' + category.id;
        categoryElement.innerText = category.name;
        categorylist.appendChild(categoryElement);
        categoryContainer.appendChild(categorylist);
    });
    menuCategorias.appendChild(categoryContainer);
}