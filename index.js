const movieInputNode = document.querySelector('.js-movies__input');
const addMoviesBtnNode = document.querySelector('.js-movies__btn');
const moviesListNode = document.querySelector('.js-movies__list');

let movies = [];

function addMovie() {
    const movie = getMovieInput();
    if (!movie) {
        return;
    }

    movies.push({ name: movie, completed: false });
    renderMovies();
    clearInput(); 
}

function getMovieInput() {
    // метод trim позволяет удалить лишние пробелы, которые добавил пользователь 
    const movieName = movieInputNode.value.trim();
    if (!movieName) {
        alert('Введите название фильма');
        return null;
    }

    return movieName;
}

function clearInput() {
    movieInputNode.value = ''; 
}

function renderMovies() {
    let moviesListHTML = '';
    if (movies.length === 0) {
        moviesListHTML = '<p>Введите название фильма</p>';

    } else {
        movies.forEach((movie, index) => {
            moviesListHTML += createMovieHTML(movie, index);
        });
    }

    moviesListNode.innerHTML = moviesListHTML; 
}

renderMovies();


function createMovieHTML(movie, index) {
    return `
       <li class='radio' data-index='${index}'>
            <input
             id='checkbox_${index}' 
             type='checkbox' 
             data-type="toggle" 
             data-index="${index}" 
            class='radio__checkbox'
             ${movie.completed ? 'checked' : ''}>
             <label class='radio__label' for='checkbox_${index}'>${movie.name}</label>
            <button class='delete__radio-btn' data-type="remove" data-index="${index}">
                <img src="../recources/radio__close-btn.png" alt="Кнопка удаления">
            </button>
        </li>
    `;
}

// делегирование событий 

moviesListNode.addEventListener('click', function (event) {
const target = event.target.closest('button, input');

if (!target || !target.dataset.type) return; // Если не нашли элемент с data-type, выходим

    const index = parseInt(target.dataset.index);

    if (target.dataset.type === 'toggle') {
        movies[index].completed = !movies[index].completed;
    } else if (target.dataset.type === 'remove') {
        movies.splice(index, 1);
    }

    renderMovies();
});



addMoviesBtnNode.addEventListener('click', addMovie); 
