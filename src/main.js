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

function likedMovieList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    const likedMovies = likedMovieList();
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

let observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            page++;
            if (caller === 'playing') {
                getPlayingMoviesPage();                
            } else if (caller === 'popular') {
                getPopularMoviesPage()
            } else if (caller === 'trending') {
                getTrendingMoviesPage();
            } else if (caller === 'upcoming') {
                getUpcomingMoviesPage();
            } else if (caller === 'toprated') {
                getTopRatedMoviesPage();
            } else if (caller === 'search') {
                getMoviesBySearchPage(queries);
            } else if (caller === 'category') {
                getCategoriesMoviesPreview(catId);
            }
        }
    })
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});

let imageSize = 'w342';
let ultimaPelicula;
let caller;
let queries;
let maxPage;
let catId;

function resizeHandler() {
    // get window width
    if (window.matchMedia("(max-width: 375px)").matches) {        
        searchFormContainer.classList.remove('inactive');
        searchFormMnuContainer.classList.add('inactive');
        searchSection.classList.remove('inactive');
        imageSize = 'w342';
    } else if (window.matchMedia("(min-width: 376px) and (max-width: 992px)").matches) {       
        searchFormContainer.classList.remove('inactive');
        searchFormMnuContainer.classList.add('inactive');
        searchSection.classList.remove('inactive');
        imageSize = 'w500';     
    } else if (window.matchMedia("(min-width: 993px)").matches) {
        searchFormContainer.classList.add('inactive');
        searchFormMnuContainer.classList.remove('inactive');
        searchSection.classList.add('inactive');
        imageSize = 'original';   
    }
    getCategoriesMenu();
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

function observer(clean, qSelector) {
    if (page < maxPage) {
        if (!clean) {
            const peliculasPlaying = document.querySelectorAll(qSelector);
    
            if (ultimaPelicula) {
                observador.unobserve(ultimaPelicula);
            }
    
            ultimaPelicula = peliculasPlaying[peliculasPlaying.length - 1];
            observador.observe(ultimaPelicula); 
        }        
    }
}

function createVerticalMovies(movies, container, clean = true) {
    if (clean) {
        container.innerHTML = '';        
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        movieImg.setAttribute('loading', 'lazy');
        movieImg.setAttribute('src', IMAGE_URL + imageSize + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', '../assets/error.png');
        });

        const movieDetailContainer = document.createElement('div');
        movieDetailContainer.classList.add('characteristics')

        const movieImg_title = document.createElement('h4');
        const movieImg_titleText = document.createTextNode(movie.title);
        movieImg_title.appendChild(movieImg_titleText);

        const movieImg_date = document.createElement('span');
        const movieImg_dateText = document.createTextNode(movie.release_date);
        movieImg_date.appendChild(movieImg_dateText);

        const detailsScore = document.createElement('span');
        detailsScore.classList.add('personMovieDetails-score');
        const average = movie.vote_average;
        const detailsScoreText = document.createTextNode(Number(average.toFixed(2)));
        detailsScore.appendChild(detailsScoreText);

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie)
        });

        movieImg.addEventListener('click', () => {
            location.hash = `#movieDetails=${movie.id}-${movie.original_title}`;
            getMovieDetails(movie.id);
            getLikedMoviesPreview();
        });

        movieContainer.appendChild(movieImg);
        movieDetailContainer.appendChild(movieImg_title);        
        movieDetailContainer.appendChild(movieImg_date);        
        movieContainer.appendChild(movieDetailContainer);
        movieContainer.appendChild(detailsScore);
        movieContainer.appendChild(movieBtn);
        container.appendChild(movieContainer); 

    });
    observer(clean, '.genericPage-movieList .movie-container');
}

function createMovies(movies, container, clean = true) {
    if (clean) {
        container.innerHTML = '';        
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        movieImg.setAttribute('loading', 'lazy');
        movieImg.setAttribute('src', IMAGE_URL + imageSize + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', '../assets/error.png');
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie)
        });

        movieImg.addEventListener('click', () => {
            location.hash = `#movieDetails=${movie.id}-${movie.original_title}`;
            getMovieDetails(movie.id);
            getLikedMoviesPreview();
        });

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        container.appendChild(movieContainer); 

    });
    observer(clean, '.genericPage-movieList .movie-container');
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

            personImg.addEventListener('click', () => {
                location.hash = `#person=${person.id}-${person.name}`;
                getPersonDetails(person.id);
            });
            
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

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

async function getPersonFilmography(id) {
    const { data } = await api(`/person/${id}/movie_credits`);

    let oJSON = sortJSON(data.cast, 'vote_average', 'desc');

    createVerticalMovies(data.cast, personMoviesPreviewList);
}

async function getCollectionMovies(id) {
    const { data } = await api(`/collection/${id}`);

    let oJSON = sortJSON(data.parts, 'vote_average', 'desc');

    createVerticalMovies(data.parts, collectionMoviesPreviewList);
}

async function getPlayingMoviesPreview() {
    const { data } = await api('/movie/now_playing');

    const movies = data.results;
    createMovies(movies, playingMoviesPreviewList);
}

async function getPlayingMoviesPage() {
        const { data } = await api('/movie/now_playing?page=' + page);
        
        const movies = data.results;
        caller = 'playing';
        maxPage = data.total_pages;
        createMovies(movies, genericMoviesPreviewList, false);
}

async function getPopularMoviesPreview() {
    const { data } = await api('/movie/popular');

    const movies = data.results;
    createMovies(movies, popularMoviesPreviewList);
}

async function getPopularMoviesPage() {
    const { data } = await api('/movie/popular?page=' + page);

    const movies = data.results;
    caller = 'popular';
    maxPage = data.total_pages;
    createMovies(movies, genericMoviesPreviewList, false);
}

async function getTrendingMoviesPreview() {
    const { data } = await api('/trending/movie/day');

    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingMoviesPage() {
    const { data } = await api('/trending/movie/day?page=' + page);

    const movies = data.results;
    caller = 'trending';
    maxPage = data.total_pages;
    createMovies(movies, genericMoviesPreviewList, false);
}

async function getUpcomingMoviesPreview() {
    const { data } = await api('/movie/upcoming');

    const movies = data.results;
    createMovies(movies, upcomingMoviesPreviewList);
}

async function getUpcomingMoviesPage() {
    const { data } = await api('/movie/upcoming?page=' + page);

    const movies = data.results;
    caller = 'upcoming';
    maxPage = data.total_pages;
    createMovies(movies, genericMoviesPreviewList, false);
}

async function getTopRatedMoviesPreview() {
    const { data } = await api('/movie/top_rated');

    const movies = data.results;
    createMovies(movies, topRatedMoviesPreviewList);
}

async function getTopRatedMoviesPage() {
    const { data } = await api('/movie/top_rated?page=' + page);

    const movies = data.results;
    caller = 'toprated';
    maxPage = data.total_pages;
    createMovies(movies, genericMoviesPreviewList, false);
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
        detailDescriptionCollection_button.addEventListener('click', () => {
            location.hash = `#collection=${data.belongs_to_collection.id}`;
            getCollectionDetails(data.belongs_to_collection.id);
        });

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
        DetailsImage.addEventListener('error', () => {
            DetailsImage.setAttribute('src', '../assets/error.png');
        });        
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
    createVerticalMovies(movies, relatedMoviesPreviewList);
}

async function getMoviesBySearchPage(query) {
    const { data } = await api('/search/movie', {
        params: {
            query,
            page,
        },
    });

    const movies = data.results;
    caller = 'search';
    queries = query;
    maxPage = data.total_pages;
    createMovies(movies, genericMoviesPreviewList, false);
}

async function getCategorieName(idGenre) {
    const { data } = await api('/genre/movie/list');

    const genres = data.genres;
    genres.forEach(genre => {
        if (genre.id == idGenre) {
            if (categoryHeaderTitle.hasChildNodes()) {
                categoryHeaderTitle.removeChild(categoryHeaderTitle.lastChild);
            }
            categoryHeaderTitle.appendChild(document.createTextNode('Categorias' + ' - ' + genre.name));
        }
    })
}

async function getCategoriesMoviesPreview(id) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres : id,
            page,
        },
    });

    const movies = data.results;
    caller = 'category';
    catId = id;
    maxPage = data.total_pages;
    getCategorieName(id);
    createMovies(movies, genericMoviesPreviewList, false);
}

async function getCategoriesMenu() {
    const { data } = await api('/genre/movie/list');
    
    const categories = data.genres;
    const categoryContainer = document.createElement('ul');
    categories.forEach(category => {
        const categorylist = document.createElement('li');
        const categoryElement = document.createElement('a');
        categoryElement.href = '#category=' + category.id;
        categoryElement.innerText = category.name;
        categorylist.appendChild(categoryElement);
        categoryContainer.appendChild(categorylist);
    });
    menuCategorias.appendChild(categoryContainer);
}

function getLikedMoviesPreview() {
    const likedMovie = likedMovieList();
    const moviesArray = Object.values(likedMovie);

    createMovies(moviesArray, favoritesMoviesPreviewList);
}

function getLikedMoviesPage() {
    const likedMovie = likedMovieList();
    const moviesArray = Object.values(likedMovie);

    createMovies(moviesArray, genericMoviesPreviewList);
}

async function getPersonDetails(id) {
    const { data } = await api('/person/' + id);

    personDetails.innerHTML = '';

    const detailPerson_image = document.createElement('img');
    const detailsName = document.createElement('h2');
    const detailsPerson = document.createElement('article');
    detailsPerson.classList.add('personDetails-description');
    const detailsPerson_Title = document.createElement('h3');
    const detailsPerson_PersonalInfo = document.createElement('div');
    detailsPerson_PersonalInfo.classList.add('PersonalInfo');
    const detailsPerson_Knowndiv = document.createElement('div');
    const detailsPerson_Known = document.createElement('h4');
    const detailsPerson_Known_Department = document.createElement('span');
    detailsPerson_Known_Department.classList.add('personDepartment');
    const detailsPerson_Genderdiv = document.createElement('div');
    const detailsPerson_Gender = document.createElement('h4');
    const detailsPerson_Gender_Name = document.createElement('span');
    detailsPerson_Gender_Name.classList.add('personGender');
    const detailsPerson_Birthdaydiv = document.createElement('div');
    const detailsPerson_Birthday = document.createElement('h4');
    const detailsPerson_Birthday_Date = document.createElement('span');
    detailsPerson_Birthday_Date.classList.add('personBirthday');
    const detailsPerson_Placediv = document.createElement('div');
    const detailsPerson_Place = document.createElement('h4');
    const detailsPerson_Place_City = document.createElement('span');
    detailsPerson_Place_City.classList.add('personCity');
    const detailsPerson_Biographydiv = document.createElement('div');
    const detailsPerson_Biography = document.createElement('h4');
    const detailsPerson_Biography_Bio = document.createElement('span');
    detailsPerson_Biography_Bio.classList.add('personBio');
    const detailsPerson_ReadBtn = document.createElement('button');
    detailsPerson_ReadBtn.classList.add('readMore_btn');
    detailsPerson_ReadBtn.innerText = 'Leer Más';

    detailsPerson_ReadBtn.addEventListener('click', () => {
        detailsPerson_Biography_Bio.classList.toggle('show');
        if (detailsPerson_Biography_Bio.classList.contains('show')) {
            detailsPerson_ReadBtn.innerText = 'Leer Menos';
        } else {
            detailsPerson_ReadBtn.innerText = 'Leer Más';
        }
    });
    
    detailPerson_image.classList.add('personDetail-img');
    detailPerson_image.setAttribute('alt', data.name);
    detailPerson_image.setAttribute('src', IMAGE_URL + imageSize + data.profile_path);    
    detailsName.classList.add('personDetail-name');
    
    const detailsNameText = document.createTextNode(data.name);
    detailsName.appendChild(detailsNameText);
    const detailsTitleText = document.createTextNode('Informacion personal');
    detailsPerson_Title.appendChild(detailsTitleText);
    const detailsKnownText = document.createTextNode('Conocido como:');
    detailsPerson_Known.appendChild(detailsKnownText);
    detailsPerson_Known_Department.innerText = data.known_for_department;
    const detailsGenderText = document.createTextNode('Genero:');
    detailsPerson_Gender.appendChild(detailsGenderText);
    let genderId;
    if (data.gender === 0) {
        genderId = 'No Especificado';
    } else if (data.gender === 1) {
        genderId = 'Mujer';
    } else if (data.gender === 2) {
        genderId = 'Hombre';
    } else if (data.gender === 3) {
        genderId = 'No Binario';
    }
    detailsPerson_Gender_Name.innerText = genderId;
    const detailsBirthdayText = document.createTextNode('Nacimiento:');
    detailsPerson_Birthday.appendChild(detailsBirthdayText);
    detailsPerson_Birthday_Date.innerText = data.birthday;
    const detailsPlaceText = document.createTextNode('Lugar de nacimiento:');
    detailsPerson_Place.appendChild(detailsPlaceText);
    detailsPerson_Place_City.innerText = data.place_of_birth;
    const detailsBiographyText = document.createTextNode('Biografia:');
    detailsPerson_Biography.appendChild(detailsBiographyText);
    detailsPerson_Biography_Bio.innerText = data.biography;
    
    detailsPerson.appendChild(detailsPerson_Title);
    detailsPerson_Knowndiv.appendChild(detailsPerson_Known);
    detailsPerson_Knowndiv.appendChild(detailsPerson_Known_Department);
    detailsPerson_PersonalInfo.appendChild(detailsPerson_Knowndiv);
    detailsPerson_Genderdiv.appendChild(detailsPerson_Gender);
    detailsPerson_Genderdiv.appendChild(detailsPerson_Gender_Name);
    detailsPerson_PersonalInfo.appendChild(detailsPerson_Genderdiv);
    detailsPerson_Birthdaydiv.appendChild(detailsPerson_Birthday);
    detailsPerson_Birthdaydiv.appendChild(detailsPerson_Birthday_Date);
    detailsPerson_PersonalInfo.appendChild(detailsPerson_Birthdaydiv);
    detailsPerson_Placediv.appendChild(detailsPerson_Place);
    detailsPerson_Placediv.appendChild(detailsPerson_Place_City);
    detailsPerson_PersonalInfo.appendChild(detailsPerson_Placediv);
    detailsPerson_Biographydiv.appendChild(detailsPerson_Biography);
    detailsPerson_Biographydiv.appendChild(detailsPerson_Biography_Bio);
    detailsPerson_Biographydiv.appendChild(detailsPerson_ReadBtn);
    detailsPerson_PersonalInfo.appendChild(detailsPerson_Biographydiv);
    detailsPerson.appendChild(detailsPerson_PersonalInfo);

    personDetails.appendChild(detailPerson_image);
    personDetails.appendChild(detailsName);
    personDetails.appendChild(detailsPerson);

    getPersonFilmography(id);
}

async function getCollectionDetails(id) {
    const { data } = await api(`/collection/${id}`);

    collectionDetails.innerHTML = '';

    const detailCollection_image = document.createElement('img');
    const detailsCollection_Overview = document.createElement('h4');
    const detailsCollection_Overview_Text = document.createElement('span');
    detailsCollection_Overview_Text.classList.add('collectionOverview');

    detailCollection_image.classList.add('collectionDetail-img');
    detailCollection_image.setAttribute('alt', data.name);
    detailCollection_image.setAttribute('src', IMAGE_URL + imageSize + data.backdrop_path);
    const detailsCollectionText = document.createTextNode('Sinopsis');
    detailsCollection_Overview.appendChild(detailsCollectionText);
    detailsCollection_Overview_Text.innerText = data.overview;

    collectionDetails.appendChild(detailCollection_image);
    collectionDetails.appendChild(detailsCollection_Overview);
    collectionDetails.appendChild(detailsCollection_Overview_Text);

    getCollectionMovies(id);
}