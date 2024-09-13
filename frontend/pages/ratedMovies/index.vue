<script lang="ts" setup>
import axios from "axios";
import { ref, computed } from "vue";

interface RatedMovie {
  id: number;
  movie_id: string;
  title: string;
  rating: number;
  poster_path: string;
}

const ratedMovies = ref<RatedMovie[]>([]);
const baseUrl = "https://movie-explorer-api-4ezv.onrender.com";

const fetchRatedMovies = async () => {
  const response = await axios.get(`${baseUrl}/rated-movies`, {
    withCredentials: true,
  });
  ratedMovies.value = response.data;
  console.log(ratedMovies.value);
};

const fetchPosters = async () => {
  for (const movie of ratedMovies.value) {
    const { data } = await useFetch(`/api/detail/${movie.movie_id}`);
    if (data.value && data.value.poster_path) {
      movie.poster_path = data.value.poster_path;
    }
  }
  console.log(ratedMovies.value);
};

const carouselRef = ref<HTMLElement | null>(null);
const currentIndex = ref(0);

const carouselStyle = computed(() => ({
  transform: `translateX(calc(50% - ${currentIndex.value * 200}px - 400px))`,
}));

const getItemStyle = (index: number) => {
  const distance = Math.abs(index - currentIndex.value);
  const scale = Math.max(0.8, 1 - distance * 0.1);
  const opacity = Math.max(0.5, 1 - distance * 0.2);
  const zIndex = 100 - distance;

  return {
    transform: `perspective(1000px) rotateY(${(index - currentIndex.value) * 5}deg) scale(${scale})`,
    opacity,
    zIndex,
  };
};

const scrollCarousel = (direction: number) => {
  const newIndex = currentIndex.value + direction;
  if (newIndex >= 0 && newIndex < ratedMovies.value.length) {
    currentIndex.value = newIndex;
  }
};

onMounted(async () => {
  await fetchRatedMovies();
  await fetchPosters();
});
</script>

<template>
  <div class="container">
    <h1>Rated Movies</h1>
    <div class="carousel-container">
      <button
        class="nav-button prev"
        @click="scrollCarousel(-1)"
        v-if="ratedMovies.length > 0"
      >
        &lt;
      </button>
      <div class="carousel-view" v-if="ratedMovies.length > 0">
        <div
          class="rated-movies-container"
          ref="carouselRef"
          :style="carouselStyle"
        >
          <div
            v-for="(ratedMovie, index) in ratedMovies"
            :key="ratedMovie.id"
            class="ratedMovie"
            :style="getItemStyle(index)"
          >
            <div v-if="ratedMovie.rating == 1">
              <p>⭐</p>
              <img
                :src="`https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`"
                alt="poster"
              />
              <h3>{{ ratedMovie.title }}</h3>
              <p>rating: {{ ratedMovie.rating }}</p>
            </div>

            <div v-else-if="ratedMovie.rating == 2">
              <p>⭐⭐</p>
              <img
                :src="`https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`"
                alt="poster"
              />
              <h3>{{ ratedMovie.title }}</h3>
              <p>rating: {{ ratedMovie.rating }}</p>
            </div>
            <div v-else-if="ratedMovie.rating == 3">
              <p>⭐⭐⭐</p>
              <img
                :src="`https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`"
                alt="poster"
              />
              <h3>{{ ratedMovie.title }}</h3>
              <p>rating: {{ ratedMovie.rating }}</p>
            </div>
            <div v-else-if="ratedMovie.rating == 4">
              <p>⭐⭐⭐⭐</p>
              <img
                :src="`https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`"
                alt="poster"
              />
              <h3>{{ ratedMovie.title }}</h3>
              <p>rating: {{ ratedMovie.rating }}</p>
            </div>
            <div v-else-if="ratedMovie.rating == 5">
              <p>⭐⭐⭐⭐⭐</p>
              <img
                :src="`https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`"
                alt="poster"
              />
              <h3>{{ ratedMovie.title }}</h3>
              <p>rating: {{ ratedMovie.rating }}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="nav-button next"
        @click="scrollCarousel(1)"
        v-if="ratedMovies.length > 0"
      >
        &gt;
      </button>
    </div>
    <div v-if="ratedMovies.length == 0">
      <p class="errorMessage">No rated movies yet</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

h1 {
  margin-left: 40px;
}

.carousel-container {
  margin: 0 auto;
  position: relative;
  width: 90%;
}

.carousel-view {
  overflow: hidden;
  margin: 0 -10px;
}

.rated-movies-container {
  display: flex;
  transition: transform 0.5s ease;
  padding: 40px 0;
}

.ratedMovie {
  flex: 0 0 200px;
  margin: 0 10px;
  transition: all 0.5s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

h3 {
  text-align: center;
  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: black;
  margin: 10px 5px;
  font-size: 18px;
}

p {
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: black;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(42, 42, 42, 0.7);
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
  border-radius: 50%;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.prev {
  left: -30px;
}

.next {
  right: -30px;
}

.errorMessage {
  margin-top: 150px;
  text-align: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

@media (max-width: 768px) {
  img {
    height: 240px;
  }

  h3 {
    font-size: 16px;
  }
}
</style>
