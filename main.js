const APIKEY = "901bfb16eb6fff9b02c8350a83eb30aa";
const TOKENAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDFiZmIxNmViNmZmZjliMDJjODM1MGE4M2ViMzBhYSIsInN1YiI6IjY1NDYxNGUzNmJlYWVhMDEwYjMyZmY0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FLh42MoSqya8Feg12SRGNKoFy8yCtE-94fQxtnOO-JI";
const url = "https://api.themoviedb.org/3/search/movie";

const moviesContainer = document.querySelector("#movies");
const formSearch = document.getElementById('form');
const searchInput = document.getElementById('searchId');


const showMovies = async (movies) => {
    moviesContainer.innerHTML = '';
    for (const movie of movies) {
        const genres = await getGenres(movie.genre_ids);
        moviesContainer.innerHTML += `
            <div class="card col-lg-3 col-xs-12 col-md-6 m-2">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image">
                <div class="card-body">
                    <h3 class="card-header">${movie.original_title}</h3>
                    <h5 class="card-title">${movie.overview}</h5>
                    <h5 class="card-title">${genres}</h5>
                </div>
            </div>
        `;
    }
}

const getGenres = async (genreIds) => {
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${APIKEY}`);
        const genres = result.data.genres.filter(genre => genreIds.includes(genre.id));
        const genreNames = genres.map(genre => genre.name).join(', ');
        return genreNames;
    } catch (error) {
        console.log(error);
        return "Genre not found";
    }
}

const searchMovies = async (e) => {
    e.preventDefault()
    try {
        const search = searchInput.value;
        const res = await axios.get(`${url}?query=${search}&include_adult=false&page=1&api_key=${APIKEY}`);
        const movies = res.data.results;
        showMovies(movies);
    } catch (error) {
        console.error(error);
    }
}

formSearch.addEventListener('submit', searchMovies);
// const showMovies = (movies) => {
//     moviesContainer.innerHTML = '';
//     movies.forEach((movie) => {
//         moviesContainer.innerHTML += `
//     	<div class="card col-lg-3 col-xs-12 col-md-6 m-2">
// 				<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image">
// 				<div class="card-body">
// 						<h3 class="card-header">${movie.original_title}</h3>
// 						<h5 class="card-title">${movie.overview}</h5>
//                         <h5 class="card-title">${getGenres(movie.genre_ids)}</h5 >
// 					</div >
//      	</div >
//     `
//     })
// }

// const getGenres = async (a) => {
//     const result = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${APIKEY}`);
//     console.log(result);
//     const arrayGenresName = [];
//     let cadena;
//     console.log(a);
//     console.log(result.data.genres);
//     result.data.genres.forEach((genres => {
//         try {
//             if (a.includes(genres.id)) {
//                 arrayGenresName.push(genres.name);
//                 console.log("arrayGeneros: ",arrayGenresName);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }))
//     cadena = arrayGenresName.join(',')

// }


// const searchMovies = async (e) => {
//     e.preventDefault()
//     try {
//         const search = searchInput.value;
//         const res = await axios.get(`${url}?query=${search}&include_adult=false&page=1&api_key=${APIKEY}`);
//         console.log(res);
//         const movies = res.data.results;
//         movies.forEach((movie) => {
//              getGenres(movie.genre_ids)
//         });
       
//         showMovies(movies);
//     } catch (error) {
//         console.error(error);
//     }
// }