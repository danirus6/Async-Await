const APIKEY = "901bfb16eb6fff9b02c8350a83eb30aa";
const TOKENAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDFiZmIxNmViNmZmZjliMDJjODM1MGE4M2ViMzBhYSIsInN1YiI6IjY1NDYxNGUzNmJlYWVhMDEwYjMyZmY0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FLh42MoSqya8Feg12SRGNKoFy8yCtE-94fQxtnOO-JI";
const url = "https://api.themoviedb.org/3/search/movie";

const moviesContainer = document.querySelector("#movies");
const formSearch = document.getElementById('form');
const searchInput = document.getElementById('searchId');


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmFhN2E5MDBkM2Y2YjA4ZTg0MmY2ZTRhNjQxMjk0OSIsInN1YiI6IjY1NDYxNGUzNmJlYWVhMDEwYjMyZmY0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MlFipgwXq2B2-suY_9IfNeYwj0a3sR_qbFCLBQD8To0'
    }
};

const showMovies = (movies) => {
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
        moviesContainer.innerHTML += `
    	<div class="card col-lg-3 col-xs-12 col-md-6 m-2">
				<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Card image">
				<div class="card-body">
						<h3 class="card-header">${movie.original_title}</h3>
						<h5 class="card-title">${movie.overview}</h5>
					</div>
     	</div>
		`
    })
}



const searchMovies = async (e) => {
    e.preventDefault()
    try {
        const search = searchInput.value
        const res = await axios.get(`${url}?query=${search}&include_adult=false&page=1&api_key=${APIKEY}`)
        console.log(res);
        const movies = res.data.results
        showMovies(movies)
    } catch (error) {
        console.error(error)
    }
}

formSearch.addEventListener('submit', searchMovies)



// const getData = async () => {
//     try {
//         const { data } = await axios.get(
//             'https://jsonplaceholder.typicode.com/posts'
//         )
//         data.forEach((post) => {
//             postsContainer.innerHTML += `
// 				<h2>${post.title}</h2>
// 				<p>${post.body}</p>
// 				<button onclick=editData(${post.id})>EDIT</button>
// 				<button onclick=deleteData(${post.id})>DELETE</button>
// 			`
//         })
//     } catch (error) {
//         console.error(err)
//     }
// }


// obtenerDatos(url)
//     .then(datos => {
//         console.log(datos);
//     })
//     .catch(error => {
//         console.error(error);
//     });