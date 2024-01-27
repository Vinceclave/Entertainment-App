export const fetchNavigation = () => {
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            placeholderState(data)
        })
        .catch(error => console.error('Error fetching navigation:', error));
}



const placeholderState = (data) => {
    const currentPage = window.location.pathname;
    const searchField = createSearchField(currentPage);

        console.log(currentPage)
          
        document.querySelector('.search-container').appendChild(searchField);
        document.getElementById('navigation').innerHTML = data;
}


const createSearchField = (currentPage) => {
    const searchField = document.createElement('input');
    searchField.type = 'text';
    searchField.name = 'search';
    searchField.id = 'search-field';
    searchField.placeholder = getSearchPlaceholder(currentPage);

    return searchField;
}


const getSearchPlaceholder = (currentPage) => {
    switch (currentPage) {
        case '/starter-code/index.html':
            return 'Search for movies or TV series';
        case '/starter-code/movies.html':
            return 'Search for movies';
        case '/starter-code/tv-series.html':
            return 'Search for TV series';
        case '/starter-code/bookmarked.html':
            return 'Search for bookmarked shows';
        default:
            return '';
    }
};