

// Const
const apiKey = "0d8756a59ec6bb7f0e8f6c3f9572a594";
const baseUrl = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original/"

// https://image.tmdb.org/t/p/original/6ybjw3pikDg68rVXsJEKF3ItpWH.jpg

const apiPaths ={
    fetchAllCategories:`${baseUrl}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesLists:(id)=> `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`
}

   


// Boots up the app
function init(){
    fetchAndBuildAllSection();
}

// fetching the data from api
const fetchAndBuildAllSection = ()=>{
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    // .then(res=>console.log(res.genres))
    // .then(res=>console.table(res.genres))

    .then(res=>{
        const categories = res.genres;
        // console.table(categories);
        // Check is array or not and length of data
        if(Array.isArray(categories) && categories.length > 0){
           categories.forEach(category=>{
            // Taking url for each categories 
            fetchAndBuildMoviesSection(apiPaths.fetchMoviesLists(category.id),category);
           })
        }
    })

    .catch(err=>console.error(err));
}

function fetchAndBuildMoviesSection(fetchUrl,category){
console.log(fetchUrl,category);

fetch(fetchUrl)
.then(res=>res.json())
.then(res=>{
    // console.table(res.results);

    const movies = res.results;
    if(Array.isArray(movies) && movies.length > 0){
        buildMoviesSection(movies,category.name)
    }

})
.catch(err=> console.log(err))
}

function buildMoviesSection(list,categoryName){
    console.log(list,categoryName);

    const moviesCont = document.getElementById("movies-cont");

    const moviesListHTML = list.map(item=>{
        return`
        <img class="movies-item" src="${imgPath}${item.backdrop_path}" alt="">
        `;

    }).join("");

    const moviesSectionHTML = `<h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
    ${moviesListHTML}
    </div>
    `;

    const div = document.createElement('div');

    div.className ="movies-section";
    div.innerHTML = moviesSectionHTML;

    // append html into container
    moviesCont.append(div)


    console.log(moviesSectionHTML);
 
}

window.addEventListener('load',function(){
    init();
})