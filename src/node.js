const toggleButton = document.getElementById('button-menu');
const navWrapper = document.getElementById('nav');
const iconBack = document.querySelector('.iconBack');

const playingMoreBtn = document.querySelector('.playing .more-btn');
const popularMoreBtn = document.querySelector('.popular .more-btn');
const trendingMoreBtn = document.querySelector('.trending .more-btn');
const upcomingMoreBtn = document.querySelector('.upcoming .more-btn');
const topRatedMoreBtn = document.querySelector('.topRated .more-btn');
const favoriteMoreBtn = document.querySelector('.favorites .more-btn');

const searchSection = document.querySelector('#search');
const searchFormContainer = document.querySelector('.search #searchForm');
const searchFormMnuContainer = document.querySelector('#searchFormMnu');
const searchFormMnu = document.querySelector('#searchFormMnu input');

const searchHeader = document.querySelector('.menu .containerMnu');

const menuCategorias = document.querySelector('.nav-links .mnuCategories');

const playingMoviesPreviewList = document.querySelector('.playing .preview-movieList');
const popularMoviesPreviewList = document.querySelector('.popular .preview-movieList');
const trendingMoviesPreviewList = document.querySelector('.trending .preview-movieList');
const upcomingMoviesPreviewList = document.querySelector('.upcoming .preview-movieList');
const topRatedMoviesPreviewList = document.querySelector('.topRated .preview-movieList');
const favoritesMoviesPreviewList = document.querySelector('.favorites .preview-movieList');
const genericMoviesPreviewList = document.querySelector('.generic .preview-movieList');
// const categoriesMoviesPreviewList = document.querySelector('.categoriesPreview-movieList');

const moviesSection = document.querySelector('.movies');
const playingSection = document.querySelector('.movies .playing');
const popularSection = document.querySelector('.movies .popular');
const trendingSection = document.querySelector('.movies .trending');
const upcomingSection = document.querySelector('.movies .upcoming');
const topRatedSection = document.querySelector('.movies .topRated');
const favoritesSection = document.querySelector('.movies .favorites');
const categoriesSection = document.querySelector('#categories');
const genericSection = document.querySelector('.movies .generic');
const sectionTitle = document.querySelector('.generic .sectionTitle')

const categoryHeaderTitle = document.querySelector('.categories-title');

const movieDetailsSection = document.querySelector('#movieDetails');
const DetailsImage = document.querySelector('.movieDetails .movieDetails-image');

const DetailsDescription = document.querySelector('.movieDetails-description');
const DetailsCollection = document.querySelector('.movieDetails-collections');
const DetailsCharacteristics = document.querySelector('.movieDetails-characteristics');
const DetailsGenres = document.querySelector('.movieDetails-genres');
const DetailsDuration = document.querySelector('.movieDetails-duration');
const DetailsTrailersTrailer = document.querySelector('.movieDetails-trailers-trailer');
const DetailsCreditsPersons = document.querySelector('.movieDetails-credits-persons');
const relatedMoviesPreviewList = document.querySelector('.relatedPreview-movieList');

const personDetailsSection = document.querySelector('#personDetails');
const personDetails = document.querySelector('.personDetails_Details');
const personMoviesPreviewList = document.querySelector('.personRelated-movieList');

const collectionDetailsSection = document.querySelector('#collectionDetails');
const collectionDetails = document.querySelector('.collectionDetails_Details');
const collectionMoviesPreviewList = document.querySelector('.collectionRelated-movieList');
// const seriesSection = document.querySelector('#series');
// const serieDetailsSection = document.querySelector('#serieDetails');
// const footerSection = document.querySelector('#aboutMe');


// const menu = document.querySelector('.menu');
// const searchForm = document.querySelector('#searchForm input');

// const favoritesPreviewList = document.querySelector('.favorites .favorites-list');
// const favoritesPreviewMovieList = document.querySelector('.favorites .favoritesPreview-movieList');
// const favoritesList = document.querySelector('.favorites-list');
// const favoritesHeaderTitle = document.querySelector('.favorites-title');

// const categoriesPreviewList = document.querySelector('.categories .categories-list');
// const categoriesPreviewMovieList = document.querySelector('.categories .categoriesPreview-movieList');
// const categoriesList = document.querySelector('.categories-list');
// const searchPreviewMovieList = document.querySelector('.search .searchPreview-movieList');
// const playingPreviewMovieList = document.querySelector('.playing .playingPreview-movieList');
// const populargPreviewMovieList = document.querySelector('.popular .popularPreview-movieList');
// const trendinggPreviewMovieList = document.querySelector('.trending .trendingPreview-movieList');
// const upcomingPreviewMovieList = document.querySelector('.upcoming .upcomingPreview-movieList');
// const topRatedPreviewMovieList = document.querySelector('.topRated .topRatedPreview-movieList');
// const favoriteMoviesPreviewList = document.querySelector('.favoritesPreview-movieList');
// const favoritePreviewMovieList = document.querySelector('.favorites .favoritesPreview-movieList');
// const genericPreviewMovieList = document.querySelector('.generic .genericPreview-movieList');
// const relatedPreviewMovieList = document.querySelector('.moviesRelated .moviesRelatedPreview-movieList');

// const personPreviewMovieList = document.querySelector('.personDetails .personRelated-movieList');
// const personDetails = document.querySelector('.personDetails_Details');
// const personMoreBtn = document.querySelector('.personMore-btn');

// const collectionPreviewMovieList = document.querySelector('.collectionDetails .collectionRelated-movieList');
// const collectionDetails = document.querySelector('.collectionDetails_Details');
// const collectionMoreBtn = document.querySelector('.collectionMore-btn');


// const peliculasEnPantalla2 = document.querySelectorAll('.playingPreview-movieList .movie-container');
// const peliculasPlaying = document.querySelectorAll('.playingPage-movieList .movie-container');

// const DetailsCredits = document.querySelector('.movieDetails-credits');
// const DetailsTrailers = document.querySelector('.movieDetails-trailers');
// const DetailsRelated = document.querySelector('.moviesRelated');
