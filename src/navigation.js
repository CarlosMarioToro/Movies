let page = 1;

const toggleButton = document.getElementById('button-menu')
const navWrapper = document.getElementById('nav')

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('close');
    navWrapper.classList.toggle('show');
})

navWrapper.addEventListener('click', e => {
    if (e.target.id === 'nav') {
        navWrapper.classList.remove('show')
        toggleButton.classList.remove('close')
    }
})

iconBack.addEventListener('click', () => {
    window.history.back();
});

searchForm.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        location.hash = '#query=' + searchForm.value;
    }
});

searchFormMnu.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        searchFormContainer.classList.add('inactive');
        location.hash = '#query=' + searchFormMnu.value;
    }
});

playingMoreBtn.addEventListener('click', () => {
    location.hash = '#playing';
});

popularMoreBtn.addEventListener('click', () => {
    location.hash = '#popular';
});

trendingMoreBtn.addEventListener('click', () => {
    location.hash = '#trending';
});

upcomingMoreBtn.addEventListener('click', () => {
    location.hash = '#upcoming';
});

topRatedMoreBtn.addEventListener('click', () => {
    location.hash = '#toprated';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
resizeHandler();

function navigator() {
    if (location.hash.startsWith('#favorites')) {
        favoritesPage();
    } else if (location.hash.startsWith('#category=')) {
        page = 1;
        categoriesPage();
    } else if (location.hash.startsWith('#playing')) {
        page = 1;
        playingPage();
    } else if (location.hash.startsWith('#popular')) {
        page = 1;
        popularPage();
    } else if (location.hash.startsWith('#trending')) {
        page = 1;
        trendingPage();
    } else if (location.hash.startsWith('#upcoming')) {
        page = 1;
        upcomingPage();
    } else if (location.hash.startsWith('#toprated')) {
        page = 1;
        topRatedPage();
    } else if (location.hash.startsWith('#query=')) {
        page = 1;
        searchPage();
    } else if (location.hash.startsWith('#movies')) {
        moviesPage();
    } else if (location.hash.startsWith('#series')) {
        seriesPage();
    } else if (location.hash.startsWith('#movieDetails=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#serieDetails=')) {
        serieDetailsPage();
    } else if (location.hash.startsWith('#personDetails=')) {
        personDetailsPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    searchSection.classList.remove('inactive');
    favoritesSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    categoriesMoviesPreviewList.classList.add('inactive');
    moviesSection.classList.remove('inactive');
    movieDetailsSection.classList.add('inactive');
    seriesSection.classList.add('inactive');
    serieDetailsSection.classList.add('inactive');
    personDetailsSection.classList.add('inactive');
    searchPreviewMovieList.classList.add('inactive');

    iconBack.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');

    playingMoviesPreviewList.classList.remove('playingPage-movieList');
    playingMoviesPreviewList.classList.add('playingPreview-movieList');
    playingMoviesPreviewList.classList.remove('inactive');
    popularSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');
    topRatedSection.classList.remove('inactive');
    playingMoreBtn.classList.remove('inactive');

    popularMoviesPreviewList.classList.remove('popularPage-movieList');
    popularMoviesPreviewList.classList.add('popularPreview-movieList');
    popularMoviesPreviewList.classList.remove('inactive');
    popularMoreBtn.classList.remove('inactive');
    playingSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');
    topRatedSection.classList.remove('inactive');

    trendingMoviesPreviewList.classList.remove('trendingPage-movieList');
    trendingMoviesPreviewList.classList.add('trendingPreview-movieList');
    trendingMoviesPreviewList.classList.remove('inactive');
    trendingMoreBtn.classList.remove('inactive');
    playingSection.classList.remove('inactive');
    popularSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');
    topRatedSection.classList.remove('inactive');

    upcomingMoviesPreviewList.classList.remove('upcomingPage-movieList');
    upcomingMoviesPreviewList.classList.add('upcomingPreview-movieList');
    upcomingMoviesPreviewList.classList.remove('inactive');
    upcomingMoreBtn.classList.remove('inactive');
    playingSection.classList.remove('inactive');
    popularSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    topRatedSection.classList.remove('inactive');

    topRatedMoviesPreviewList.classList.remove('topRatedPage-movieList');
    topRatedMoviesPreviewList.classList.add('topRatedPreview-movieList');
    topRatedMoviesPreviewList.classList.remove('inactive');
    topRatedMoreBtn.classList.remove('inactive');
    playingSection.classList.remove('inactive');
    popularSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');

    genericSection.classList.add('inactive');
}

function favoritesPage() {

}

function categoriesPage() {
    const [_, id] = location.hash.split('=');

    // getCategoriesMoviesPreview(id);
    toggleButton.classList.remove('close');
    navWrapper.classList.remove('show');
    categoriesSection.classList.remove('inactive');
    iconBack.classList.remove('inactive');
    categoriesPreviewMovieList.classList.add('inactive');
    moviesSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive'); 
    moviesSection.classList.remove('inactive');
    genericSection.classList.remove('inactive'); 
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');

    genericMoviesPreviewList.innerHTML = '';
    getCategoriesMoviesPreview(id);
}

function searchPage() {
    const [_, query] = location.hash.split('=');

    // getMoviesBySearch(query);
    iconBack.classList.remove('inactive');
    moviesSection.classList.remove('inactive');
    movieDetailsSection.classList.add('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    playingMoreBtn.classList.add('inactive');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive');
    genericSection.classList.remove('inactive');  

    genericMoviesPreviewList.innerHTML = '';
    getMoviesBySearchPage(query);

}

function moviesPage() {

}

function playingPage() {
    console.log('Playing Page');
    iconBack.classList.remove('inactive');
    moviesSection.classList.remove('inactive');
    movieDetailsSection.classList.add('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    playingMoreBtn.classList.add('inactive');
    playingMoviesPreviewList.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive');
    genericSection.classList.remove('inactive');    

    genericMoviesPreviewList.innerHTML = '';
    getPlayingMoviesPage();
}

function popularPage() {
    console.log('playing page');
    iconBack.classList.remove('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    popularMoreBtn.classList.add('inactive');
    playingSection.classList.add('inactive');
    popularMoviesPreviewList.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); 

    genericMoviesPreviewList.innerHTML = '';
    getPopularMoviesPage();
}

function trendingPage() {
    console.log('playing page');
    iconBack.classList.remove('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    trendingMoreBtn.classList.add('inactive');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingMoviesPreviewList.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); 

    genericMoviesPreviewList.innerHTML = '';
    getTrendingMoviesPage();
}

function upcomingPage() {
    console.log('playing page');
    iconBack.classList.remove('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    upcomingMoreBtn.classList.add('inactive');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingMoviesPreviewList.classList.add('inactive');
    topRatedSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); 

    genericMoviesPreviewList.innerHTML = '';
    getUpcomingMoviesPage();
}

function topRatedPage() {
    iconBack.classList.remove('inactive');
    genericMoviesPreviewList.classList.add('genericPage-movieList');
    genericMoviesPreviewList.classList.remove('genericPreview-movieList');
    topRatedMoreBtn.classList.add('inactive');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedMoviesPreviewList.classList.add('inactive');
    genericSection.classList.remove('inactive'); 

    genericMoviesPreviewList.innerHTML = '';
    getTopRatedMoviesPage();
}

function seriesPage() {

}

function movieDetailsPage() {
    iconBack.classList.remove('inactive');
    categoriesSection.classList.add('inactive');
    moviesSection.classList.add('inactive');
    movieDetailsSection.classList.remove('inactive');
    DetailsCollection.classList.remove('inactive');
    searchPreviewMovieList.classList.add('inactive');
    categoriesMoviesPreviewList.classList.add('inactive');
}

function serieDetailsPage() {

}

function personDetailsPage() {

}