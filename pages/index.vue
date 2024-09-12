<script lang="ts" setup>
import { useFetch } from 'nuxt/app';
import { ref, watch, onMounted } from 'vue';



const searchByTitle = inject('searchByTitle', ref<string>(""));

const searchResults = ref<any>([]);
const movies = ref<any>([]);

// For trending now
const currentPage = ref(1);
const totalPages = ref(500);

// For search results
const searchResultsTotalPages = ref(0);
const currentResultsPage = ref(1);

// To check if page value needs to be reset
const isResetPage = ref<boolean>(false);
const isMounted = ref<boolean>(false);


// Fetch trending movies
const fetchMovies = async () => {
  const { data } = await useFetch("/api/movies", { query: { page: currentPage.value } });
  movies.value = data.value.results;
};

await fetchMovies();

// Fetch search results
const fetchSearchResults = async () => {
  const { data } = await useFetch(`/api/search/${searchByTitle.value}`, {
    query: { title: searchByTitle.value, page: currentResultsPage.value },
  });
  searchResults.value = data.value.results;
  searchResultsTotalPages.value = data.value.total_pages;
  
  if (isResetPage.value) {
    currentResultsPage.value = 1;
    isResetPage.value = false;
  }
  
  currentPage.value = 1;
  sessionStorage.removeItem("currentPage");
};

// Watchers
watch([currentPage], async () => {
  await fetchMovies();
  sessionStorage.setItem('currentPage', JSON.stringify(currentPage.value));
});

watch([currentResultsPage], async () => {
    await fetchSearchResults();
    sessionStorage.setItem('currentResultsPage', JSON.stringify(currentResultsPage.value));
  
});

const watcherForSearchByTitle = async()=>{
 console.log("watcher is triggered")
  if (searchByTitle.value === "") {
    // Clear session storage when searchByTitle is empty
    sessionStorage.removeItem("searchByTitle");
    sessionStorage.removeItem("currentResultsPage");
  
    // Reset currentResultsPage to 1 if needed
    currentResultsPage.value = 1;

    // Clear the search results
    searchResults.value = [];
  } else {
    if (isMounted.value) {
      await fetchSearchResults();
      isMounted.value = false;
    } else {
      isResetPage.value = true;
      await fetchSearchResults();
    }
    
    // Update session storage
    sessionStorage.setItem("searchByTitle", searchByTitle.value);
    sessionStorage.setItem("currentResultsPage", JSON.stringify(currentResultsPage.value));
  }} 

watch(searchByTitle, async () => {
  watcherForSearchByTitle()


});


// Handle initialization on mount
onMounted(async() => {
  const savedPage = sessionStorage.getItem('currentPage');
  const savedResultsPage = sessionStorage.getItem('currentResultsPage');
  
  if (savedPage) {
    currentPage.value = JSON.parse(savedPage);
  }

  if (savedResultsPage) {
    isMounted.value = true;
    currentResultsPage.value = JSON.parse(savedResultsPage);
    // searchByTitle.value = ""; // Temporarily set to an empty string
    searchByTitle.value = sessionStorage.getItem('searchByTitle') || "";
    console.log(searchByTitle.value)
    watcherForSearchByTitle()
  }
});


// Page navigation
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToResultsPage = (page: number) => {
  if (page >= 1 && page <= searchResultsTotalPages.value) {
    currentResultsPage.value = page;
  }
};
</script>




<template>
   
<div class="search">
<input type="search" placeholder="Search" v-model="searchByTitle"><span class="material-icons">&nbsp;search</span></input>
</div>
<div class="trending" v-if="!searchByTitle">
<h1>Trending Now</h1>
<div class="movies">
<div class="movie"  v-for="movie in movies" :key="movie.id" > 
    <NuxtLink :to="`/detail/${movie.id}`">
    <img v-if="movie.poster_path" class="movie_image" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
    <img v-else class="movie_image" src="../public/unavailable.webp" alt="poster"/>
    <p class="title">{{ movie.title }}</p>

</NuxtLink>
</div>
</div>
<div class="pagination" v-if="totalPages > 1">
    <button class="paginate first" @click="goToPage(1)" :disabled="currentPage === 1">
        <span class="arrow">&#171;</span> <!-- Double left arrow -->
    </button>
    <button class="paginate prev" @click="goToPage(currentPage -1 )" :disabled="currentPage === 1">
        <span class="arrow">&#8249;</span> <!-- Single left arrow -->
    </button>
    <div class="counter">{{ currentPage }} / {{ totalPages }}</div>
    <button class="paginate next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        <span class="arrow">&#8250;</span> <!-- Single right arrow -->
    </button>
    <button class="paginate last" @click="goToPage(totalPages)" :disabled="currentPage === totalPages">
        <span class="arrow">&#187;</span> <!-- Double right arrow -->
    </button>
    <input type="number" v-model.number="currentPage" min="1" :max="totalPages" @change="goToPage(currentPage)" />
</div>






</div>



<div class="results" v-else>
<h1>Results</h1>
<div class="movies">
<div class="movie"  v-for="result in searchResults" :key="result.id" > 
    <NuxtLink :to="`/detail/${result.id}`">
    <img v-if="result.poster_path" class="movie_image" :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" />
    <img v-else class="movie_image" src="../public/unavailable.webp" alt="poster"/>
   
    <p class="title">{{ result.title }}</p>
</NuxtLink>
</div>



</div>
<div class="pagination" v-if="searchResults">
    <button class="paginate first" @click="goToResultsPage(1)" :disabled="currentResultsPage === 1">
        <span class="arrow">&#171;</span> <!-- Double left arrow -->
    </button>
    <button class="paginate prev" @click="goToResultsPage(currentResultsPage -1 )" :disabled="currentResultsPage === 1">
        <span class="arrow">&#8249;</span> <!-- Single left arrow -->
    </button>
    <div class="counter">{{ currentResultsPage }} / {{ searchResultsTotalPages }}</div>
    <button class="paginate next" @click="goToResultsPage(currentResultsPage + 1)" :disabled="currentResultsPage === searchResultsTotalPages">
        <span class="arrow">&#8250;</span> <!-- Single right arrow -->
    </button>
    <button class="paginate last" @click="goToResultsPage(searchResultsTotalPages)" :disabled="currentResultsPage === searchResultsTotalPages">
        <span class="arrow">&#187;</span> <!-- Double right arrow -->
    </button>
    <input type="number" v-model.number="currentResultsPage" min="1" :max="searchResultsTotalPages" @change="goToResultsPage(currentResultsPage)" />
</div>

</div>

  
</template>



<style scoped>

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;
  margin-top: 42px;
}

.search input {
  width: 230px;
  height: 35px;
}


h1{
    margin-left: 25px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-weight: 100;
    font-style: italic;
    font-size: 38px;

}

a{
  text-decoration: none;
  color: white
    }

.movies{
    display:grid;
    grid-template-columns: repeat(4,1fr);
    height:fit-content;
    min-height: 290px;
    

}
.movie{
    display:block;
    padding-top: 30px;
    padding-left: 30px;
    transition: transform 0.2s ease;
}

.movie:hover{
    transform: scale(1.2,1.2);
    cursor: pointer;
}

.movie_image{
    width: 250px;
    height: 380px;
}

.title{
    text-align: center;
    margin-right: 40px;
    max-width: 240px;
}
.pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto 0 auto;
   
   
}


.pagination button {
    color: green;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 10px 15px;
    margin: 0 5px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pagination button:disabled {
    color: #ccc;
}


.pagination button:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.1);
}

.pagination button:disabled:hover {
    cursor:default;
    background-color: transparent;
    transform: none;
    color:#ccc;
}


.pagination button:active {
    transform: scale(0.3) ;
}

.arrow {
    font-size: 28px;
}

.counter {
    font-size: 18px;
    margin: 0 16px;
    display: flex;
    font-weight: bold;
    width: max-content;
}

input[type="number"] {
    width: 60px;
    height: 23px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    margin: 0 10px;
    
}






@media screen and (max-width: 1024px) {
  .search {
    left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
  }

  .movies {
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    
  }
.movie{
    padding-left: 15px;
    
}
  .movie_image {
    min-width: 80px;
    height: 290px;
    width: 90%;
   
  }

  h1 {
    font-size: 32px;
  }

  .title {
    font-size: 14px;
  }

  .arrow {
    font-size: 20px;
}

.counter {
    font-size: 16px;
    margin: 0 9px;
}


}

@media screen and (max-width: 430px) {
  .search {
    left: 50%;
    transform: translateX(-50%);
  }

  .search input {
    margin-top: 5px;
    width: 190px;
    height: 30px;
  }

  h1{
    font-size: 18px;
    margin-top: 40px;
  }
  .movies {
    grid-template-columns: repeat(2, 1fr); 
    
  }

  .movie{
    justify-content: center;
    padding-left: 6px;
    
  }

  .movie_image {
    width: 100%;
    height: 190px;
    min-width: 70px;
   
  }

  h1 {
    font-size: 28px;
  }

  .title {
    font-size: 11px;
    margin: 0px auto;
  }


  .pagination button{
    padding: 3px 7px;
    margin: 0 2px;
  }

  .arrow {
    font-size: 20px;
}

.counter {
    font-size: 10px;
    margin: 0px 5px;
    

}


input[type="number"]{
    font-size: 12px;
    height: 16px;
    width: 40px;
}


}















</style>