iconBack.addEventListener('click', () => {
    window.history.back();
});

searchForm.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        location.hash = '#query=' + searchForm.value;
    }
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('resize', resizeHandler);
resizeHandler();

function navigator() {
    if (location.hash.startsWith('#favorites')) {
        favoritesPage();
    } else if (location.hash.startsWith('#categories=')) {
        categoriesPage();
    } else if (location.hash.startsWith('#query=')) {
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
    window.scrollTo(0, 0);
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
}

function favoritesPage() {
    
}

function categoriesPage() {
    const [_, id] = location.hash.split('=');

    getCategoriesMoviesPreview(id);
    toggleButton.classList.remove('close');
    navWrapper.classList.remove('show');
    console.log('Categorias');
    categoriesMoviesPreviewList.classList.remove('inactive');
    iconBack.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    moviesSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
}

function searchPage() {
    const [_, query] = location.hash.split('=');

    getMoviesBySearch(query);
    iconBack.classList.remove('inactive');
    favoritesSection.classList.add('inactive');
    moviesSection.classList.add('inactive');
    seriesSection.classList.add('inactive');
    movieDetailsSection.classList.add('inactive');
    serieDetailsSection.classList.add('inactive');
    personDetailsSection.classList.add('inactive');
    searchPreviewMovieList.classList.remove('inactive');

}

function moviesPage() {

}

function seriesPage() {

}

function movieDetailsPage() {
    iconBack.classList.remove('inactive');
    moviesSection.classList.add('inactive');
    movieDetailsSection.classList.remove('inactive');
    DetailsCollection.classList.remove('inactive');
    searchPreviewMovieList.classList.add('inactive');
    categoriesMoviesPreviewList.classList.add('inactive');

    // DetailsCharacteristics.classList.add('inactive');
    // DetailsDuration.classList.add('inactive');
    // DetailsGenres.classList.add('inactive');
    // DetailsDescription.classList.add('inactive');
    // DetailsCollection.classList.add('inactive');
    // DetailsCredits.classList.add('inactive');
    // DetailsTrailers.classList.add('inactive');
    // DetailsRelated.classList.add('inactive');
}

function serieDetailsPage() {

}

function personDetailsPage() {

}