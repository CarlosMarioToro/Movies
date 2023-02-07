let page = 1;

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('resize', resizeHandler);

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

searchFormMnu.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        console.log('hola');
        // searchFormContainer.classList.add('inactive');
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

favoriteMoreBtn.addEventListener('click', () => {
    location.hash = '#favorites';
});

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
    } else if (location.hash.startsWith('#person=')) {
        personDetailsPage();
    } else if (location.hash.startsWith('#collection=')) {
        collectionDetailsPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function Pages() {
    iconBack.classList.remove('inactive');
    moviesSection.classList.remove('inactive');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive');  
    favoritesSection.classList.add('inactive');  
    genericSection.classList.remove('inactive'); 
}

function homePage() {
    getCategoriesMenu();
    getPlayingMoviesPreview();
    getPopularMoviesPreview();
    getTrendingMoviesPreview();
    getUpcomingMoviesPreview();
    getTopRatedMoviesPreview();
    getLikedMoviesPreview();  
    moviesSection.classList.remove('inactive');
    playingSection.classList.remove('inactive');
    popularSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');
    upcomingSection.classList.remove('inactive');
    topRatedSection.classList.remove('inactive');  
    favoritesSection.classList.remove('inactive'); 
    genericSection.classList.add('inactive');    
    categoriesSection.classList.add('inactive');
    
    movieDetailsSection.classList.add('inactive');
    iconBack.classList.add('inactive');
}

function playingPage() {
    Pages();

    genericMoviesPreviewList.innerHTML = '';
    getPlayingMoviesPage();
}

function popularPage() {
    Pages(); 

    genericMoviesPreviewList.innerHTML = '';
    getPopularMoviesPage();
}

function trendingPage() {
    Pages();

    genericMoviesPreviewList.innerHTML = '';
    getTrendingMoviesPage();
}

function upcomingPage() {
    Pages(); 

    genericMoviesPreviewList.innerHTML = '';
    getUpcomingMoviesPage();
}

function topRatedPage() {
    Pages();

    genericMoviesPreviewList.innerHTML = '';
    getTopRatedMoviesPage();
}

function favoritesPage() { 
    Pages();

    genericMoviesPreviewList.innerHTML = '';
    getLikedMoviesPage();
}

function categoriesPage() {
    const [_, id] = location.hash.split('=');

    genericMoviesPreviewList.innerHTML = '';

    getCategoriesMoviesPreview(id);
    toggleButton.classList.remove('close');
    navWrapper.classList.remove('show');
    playingSection.classList.add('inactive');
    popularSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    upcomingSection.classList.add('inactive');
    topRatedSection.classList.add('inactive'); 
    favoritesSection.classList.add('inactive');  
    categoriesSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
}

function movieDetailsPage() {
    iconBack.classList.remove('inactive');
    categoriesSection.classList.add('inactive');
    moviesSection.classList.add('inactive');
    movieDetailsSection.classList.remove('inactive');
    DetailsCollection.classList.remove('inactive');
    collectionDetailsSection.classList.add('inactive');
    personDetailsSection.classList.add('inactive');
}

function searchPage() {
    const [_, query] = location.hash.split('=');

    Pages();

    genericMoviesPreviewList.innerHTML = '';
    getMoviesBySearchPage(query);

}

function personDetailsPage() {
    movieDetailsSection.classList.add('inactive');
    personDetailsSection.classList.remove('inactive');
}

function collectionDetailsPage() {
    collectionDetailsSection.classList.remove('inactive');
    movieDetailsSection.classList.add('inactive');
    personDetailsSection.classList.add('inactive');
}