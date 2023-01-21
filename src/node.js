const searchSection = document.querySelector('#search');
const categoriesSection = document.querySelector('#categories');
const moviesSection = document.querySelector('#movies');
const movieDetailsSection = document.querySelector('#movieDetails');
const seriesSection = document.querySelector('#series');
const serieDetailsSection = document.querySelector('#serieDetails');
const personDetailsSection = document.querySelector('#personDetails');
const footerSection = document.querySelector('#aboutMe');

const toggleButton = document.getElementById('button-menu')
const navWrapper = document.getElementById('nav')

const menu = document.querySelector('.menu');
const menuCategorias = document.querySelector('.nav-links .mnuCategories');
const searchFormContainer = document.querySelector('#searchForm');
const searchFormMnuContainer = document.querySelector('#searchFormMnu');
const searchForm = document.querySelector('#searchForm input');
const searchFormMnu = document.querySelector('#searchFormMnu input');
const iconBack = document.querySelector('.iconBack');

const favoritesMoviesPreviewList = document.querySelector('.favoritesPreview-movieList');
const favoritesPreviewList = document.querySelector('.favorites .favorites-list');
const favoritesPreviewMovieList = document.querySelector('.favorites .favoritesPreview-movieList');
const favoritesList = document.querySelector('.favorites-list');
const favoritesHeaderTitle = document.querySelector('.favorites-title');

const categoriesMoviesPreviewList = document.querySelector('.categoriesPreview-movieList');
const categoriesPreviewList = document.querySelector('.categories .categories-list');
const categoriesPreviewMovieList = document.querySelector('.categories .categoriesPreview-movieList');
const categoriesList = document.querySelector('.categories-list');
const categoryHeaderTitle = document.querySelector('.categories-title');
const searchPreviewMovieList = document.querySelector('.search .searchPreview-movieList');
const playingMoviesPreviewList = document.querySelector('.playingPreview-movieList');
const playingPreviewMovieList = document.querySelector('.playing .playingPreview-movieList');
const playingMoreBtn = document.querySelector('.playingMore-btn');
const popularMoviesPreviewList = document.querySelector('.popularPreview-movieList');
const populargPreviewMovieList = document.querySelector('.popular .popularPreview-movieList');
const popularMoreBtn = document.querySelector('.popularMore-btn');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const trendinggPreviewMovieList = document.querySelector('.trending .trendingPreview-movieList');
const trendingMoreBtn = document.querySelector('.trendingMore-btn');
const upcomingMoviesPreviewList = document.querySelector('.upcomingPreview-movieList');
const upcomingPreviewMovieList = document.querySelector('.upcoming .upcomingPreview-movieList');
const upcomingMoreBtn = document.querySelector('.upcomingMore-btn');
const topRatedMoviesPreviewList = document.querySelector('.topRatedPreview-movieList');
const topRatedPreviewMovieList = document.querySelector('.topRated .topRatedPreview-movieList');
const topRatedMoreBtn = document.querySelector('.topRatedMore-btn');
const favoriteMoviesPreviewList = document.querySelector('.favoritesPreview-movieList');
const favoritePreviewMovieList = document.querySelector('.favorites .favoritesPreview-movieList');
const favoriteMoreBtn = document.querySelector('.favoritesMore-btn');
const genericMoviesPreviewList = document.querySelector('.genericPreview-movieList');
const genericPreviewMovieList = document.querySelector('.generic .genericPreview-movieList');
const relatedPreviewMovieList = document.querySelector('.moviesRelated .moviesRelatedPreview-movieList');
const relatedMoviesPreviewList = document.querySelector('.relatedPreview-movieList');

const personMoviesPreviewList = document.querySelector('.personRelated-movieList');
const personPreviewMovieList = document.querySelector('.personDetails .personRelated-movieList');
const personDetails = document.querySelector('.personDetails_Details');
const personMoreBtn = document.querySelector('.personMore-btn');

const playingSection = document.querySelector('.movies .playing');
const popularSection = document.querySelector('.movies .popular');
const trendingSection = document.querySelector('.movies .trending');
const upcomingSection = document.querySelector('.movies .upcoming');
const topRatedSection = document.querySelector('.movies .topRated');
const genericSection = document.querySelector('.movies .generic');
const favoritesSection = document.querySelector('.movies .favorites');

const peliculasEnPantalla2 = document.querySelectorAll('.playingPreview-movieList .movie-container');
const peliculasPlaying = document.querySelectorAll('.playingPage-movieList .movie-container');

const DetailsImage = document.querySelector('.movieDetails .movieDetails-image');
const DetailsCharacteristics = document.querySelector('.movieDetails-characteristics');
const DetailsDuration = document.querySelector('.movieDetails-duration');
const DetailsGenres = document.querySelector('.movieDetails-genres');
const DetailsDescription = document.querySelector('.movieDetails-description');
const DetailsCollection = document.querySelector('.movieDetails-collections');
const DetailsCredits = document.querySelector('.movieDetails-credits');
const DetailsCreditsPersons = document.querySelector('.movieDetails-credits-persons');
const DetailsTrailers = document.querySelector('.movieDetails-trailers');
const DetailsTrailersTrailer = document.querySelector('.movieDetails-trailers-trailer');
const DetailsRelated = document.querySelector('.moviesRelated');
