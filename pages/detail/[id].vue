<script setup lang="ts">
import { useRoute } from "vue-router";

const { id } = useRoute().params;

//fetch movie detail
const { data: detail, error } = await useFetch<any>(`/api/detail/${id}`);
//fetch trailer
</script>

<template>
  <div v-if="detail" class="container">
    <div
      class="background_image"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500${detail.backdrop_path}')`,
      }"
    >
      <img
        v-if="detail.poster_path"
        class="poster"
        :src="'https://image.tmdb.org/t/p/w500' + detail.poster_path"
        alt="poster"
      />
      <img
        v-else
        class="poster"
        src="../../public/unavailable.webp"
        alt="poster"
      />
      <div class="content">
        <div class="title_and_genres">
          <h1 class="title">{{ detail.title }}</h1>
          <div class="genres">
            <ul v-if="detail.genres.length > 0">
              <li v-for="i in detail.genres" :key="i.id">🏷️{{ i.name }}</li>
            </ul>
            <ul v-else class="error">
              ⚠️No genres available⚠️
            </ul>
          </div>
        </div>
        <div class="descriptions">
          <div class="description_item">
            <h3>Release Date:&nbsp;</h3>
            <p>{{ detail.release_date }}</p>
          </div>
          <div class="description_item">
            <h3>Language:&nbsp;</h3>
            <p>{{ detail.spoken_languages[0]?.name }}</p>
          </div>
          <div class="description_item">
            <h3>Origin Country:&nbsp;</h3>
            <p>{{ detail.origin_country[0] }}</p>
          </div>
          <div class="description_item">
            <h3>Popularity:&nbsp;</h3>
            <p>{{ detail.popularity }}</p>
          </div>
          <h3>Overview</h3>
          <p>{{ detail.overview }}</p>
        </div>
      </div>
    </div>
    <trailers />

    <div class="production_companies">
      <p>Production Companies</p>
    </div>
    <div class="companies">
      <div
        class="company"
        v-for="company in detail.production_companies"
        v-if="detail.production_companies.logo_path"
        v-show="company.logo_path"
        :key="company.id"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + company.logo_path"
          alt="logo"
        />
        <p>{{ company?.name }}</p>
      </div>
      <div v-else class="error">
        <p>⚠️Production companies not available⚠️</p>
      </div>
    </div>
    <SimilarMovies />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.background_image {
  position: relative;
  display: flex;
  width: 100%;
  height: 695px; /* Adjust height as needed */
  background-size: cover;
}

.background_image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.74); /* Dark overlay to dim the background */
  z-index: 1; /* Make sure the overlay is on top of the background image */
}

.background_image img {
  position: relative;
  z-index: 2; /* Ensure the image is above the overlay */
}

.poster {
  display: flex;
  width: 23%;
  height: 525px;
  border-radius: 10px;
  top: 10%;
  margin-left: 20px;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 15px;
  position: relative; /* Ensure content is above the overlay */
  z-index: 2; /* Make sure content is above the overlay */
  height: 900px;
  width: 100%;
}

.title {
  display: flex;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 100;
  font-style: italic;
  margin: 20px 0px 20px 20px;
  font-size: 38px;
  width: 100%;
}

.title_and_genres {
  display: flex;
  height: fit-content;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
}

.genres {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.genres ul {
  display: flex;
  width: 100%;
}

.genres ul li {
  display: flex;
  justify-content: flex-end;
  margin: 15px 5px 15px 10px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;

  width: max-content;
}

.descriptions {
  display: block;
  height: fit-content;
  width: 90%;
  margin: 13px 30px 30px 25px;
  padding: 10px;
  font-size: 19px;
  box-shadow: 5px 5px 20px 5px rgba(231, 231, 231, 0.838);
}
.description_item {
  display: flex;
  align-items: center;
  height: 55px;
}

.descriptions p {
  height: fit-content;
  margin-top: 24px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: rgb(210, 210, 210);
  font-size: 20px;
}

h3 {
  font-size: 23px;
  font-family: cursive;
  font-weight: 200;
}

.production_companies {
  margin: 120px auto 0px auto;
  display: flex;
  width: fit-content;
  height: fit-content;
}

.production_companies p {
  display: flex;
  width: fit-content;
  text-align: center;
  font-size: 24px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-style: italic;
}

.companies {
  display: flex;
  width: 100%;
  overflow-x: auto;
}

.company {
  display: inline-block;
  height: fit-content;
  margin: 30px auto 0px auto;
  padding-left: 2px;
  padding-right: 5px;
  flex-direction: column;
}

.company img {
  display: flex;
  width: 140px;
  background-color: white;
  opacity: 0.9;
  margin: 10px auto 10px auto;
  height: 70px;
}

.company p {
  text-align: center;
  width: 195px;
}

.error {
  margin: 0 auto;
  color: red;
  text-align: center;
  padding-top: 5px;
}

@media screen and (max-width: 1024px) {
  .background_image {
    height: 500px; /* Adjust the height for tablets */
  }

  .poster {
    width: 30%;
    height: 400px;
  }

  .title {
    font-size: 28px;
    width: auto;
  }

  .title_and_genres {
    flex-direction: column;
    align-items: flex-start;
  }

  .genres {
    width: 100%;
    justify-content: flex-start;
  }

  .genres ul {
    width: 100%;
    margin: 0px auto;
  }
  .genres ul li {
    font-size: 11px;
    width: max-content;
    margin: 0px auto;
  }

  .descriptions {
    font-size: 14px;
    margin: 5px 15px 15px 10px;
    padding: 5px;
  }
  .description_item {
    height: 36px;
  }
  .descriptions p {
    margin-top: 16px;
    font-size: 14px;
  }

  h3 {
    font-size: 17px;
  }

  .company img {
    width: 100px;
    height: 50px;
  }
}

/* Mobile Styles (767px and below) */
@media screen and (max-width: 430px) {
  .background_image {
    height: auto;
    flex-direction: column;
    padding: 10px;
  }

  .poster {
    width: 100%;
    height: 380px;
    top: 0%;
    margin-left: 0px;
  }

  .content {
    margin-left: 0;
    width: 100%;
  }

  .title {
    font-size: 22px;
    text-align: center;
    width: 100%;
  }

  .title_and_genres {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .genres {
    width: 100%;
    justify-content: center;
  }
  .genres ul {
    width: 100%;
    margin: 0px auto;
    padding-left: 0px;
  }
  .genres ul li {
    font-size: 8px;
    width: max-content;
    margin: 0px auto;
  }

  .descriptions {
    margin: 10px auto;
    width: 95%;
    font-size: 14px;
    padding: 5px;
  }

  h3 {
    font-size: 18px;
  }

  .production_companies {
    margin-top: 50px;
  }

  .company img {
    width: 80px;
    height: 40px;
  }

  .company p {
    width: 100%;
    font-size: 14px;
  }
}
</style>
