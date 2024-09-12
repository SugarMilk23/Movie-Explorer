<script setup lang="ts">
import { useRoute, useFetch } from "nuxt/app";

const { id } = useRoute().params;

const { data: similarMovies } = await useFetch<any>(
  `/api/similar-movies/${id}`
);

console.log("similar movies : ", similarMovies);
</script>

<template>
  <div class="container">
    <h1>Similar Movies</h1>
    <div class="movies" v-if="similarMovies.results.length > 0">
      <div class="similar-movies" v-for="movie in similarMovies.results">
        <div class="movie">
          <NuxtLink :to="`/detail/${movie.id}`">
            <img
              v-if="movie.poster_path"
              class="movie_image"
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            />
            <img
              v-else
              class="movie_image"
              src="../public/unavailable.webp"
              alt="poster"
            />
            <p>{{ movie.title }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="error"><p>⚠️Similar movies not available⚠️</p></div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 150px;
  display: flex;
  overflow-x: auto;
}

h1 {
  margin: 20px auto;
  height: fit-content;
  width: max-content;
  justify-content: center;
  font-size: 26px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-style: italic;
  font-weight: 100;
}
.movies {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.movies::-webkit-scrollbar {
  height: 8px;
}

.movies::-webkit-scrollbar-track {
  background: black;
}

.movies::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, rgb(210, 210, 210), red);
  border-radius: 10px;
}

.movies::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
}

.movie {
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 5px;
  scroll-snap-align: start;
}

.movie:hover {
  opacity: 0.9;
  box-shadow: 5px 5px 20px 8px rgb(255, 255, 255);
}

img {
  width: 200px;
  height: 240px;
}

.movie p {
  text-align: center;
}

a {
  text-decoration: none;
  color: white;
}

.error {
  color: red;
  margin: 0 auto;
  text-align: center;
  display: block;
  width: 100%;
}

@media screen and (max-width: 900px) {
  img {
    max-width: 170px;
    max-height: 220px;
  }
}
@media screen and (max-width: 430px) {
  img {
    max-width: 130px;
    height: 200px;
  }

  h1 {
    font-size: 20px;
  }

  .movie p {
    font-size: 12px;
  }
}
</style>
