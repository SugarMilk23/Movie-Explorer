<script setup lang="ts">
const { id } = useRoute().params;

let videoKeys: string[] = [];

// onMounted(async () => {
// const { data: trailer, error } = await useFetch<any>(`/api/trailer/${id}`);
// console.log("trailer : ", trailer);
// if (error.value) {
// console.error("Error fetching trailer:", error.value);
// }
//
// if (trailer.value && trailer.value.results) {
// for (let result of trailer.value.results) {
// if (result.key) {
// videoKeys.push(result.key);
// }
// }
// }
// });

// Computed property to limit the number of trailers to 10 for better performance
const limitedVideoKeys = computed(() => {
  const { data: trailer, error } = useFetch<any>(`/api/trailer/${id}`);
  if (error.value) {
    console.error("Error fetching trailer:", error.value);
  }
  if (trailer.value && trailer.value.results) {
    for (let result of trailer.value.results) {
      if (result.key) {
        videoKeys.push(result.key);
      }
    }
  }
  return videoKeys.slice(0, 10);
});

const iframeStyles = computed(() => ({
  width: "370px",
  height: "320px",
  marginLeft: "15px",
  "@media screen and (max-width: 430px)": {
    width: "27px",
    height: "190px",
  },
}));
</script>

<template>
  <div class="container">
    <div class="trailer-p">
      <p>Trailers</p>
    </div>
    <div class="trailers_container" v-if="limitedVideoKeys.length > 0">
      <div
        class="trailers"
        v-for="videoKey in limitedVideoKeys"
        :key="videoKey"
      >
        <iframe
          :src="`https://www.youtube.com/embed/${videoKey}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          :style="iframeStyles"
        ></iframe>
      </div>
    </div>
    <div v-else class="error">
      <p>⚠️Trailers not available⚠️</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.trailer-p {
  display: flex;
  margin: 0px auto;
  height: fit-content;
  justify-content: center;
}
.trailer-p p {
  display: flex;
  height: fit-content;
  font-size: 33px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-style: italic;
}

.trailers_container {
  display: flex;
  width: 95%;
  overflow-x: auto;
  padding-bottom: 20px;
  margin: 10px auto 10px auto;
  scroll-snap-type: x mandatory;
}

.trailers_container::-webkit-scrollbar {
  height: 8px;
}

.trailers_container::-webkit-scrollbar-track {
  background: black;
}

.trailers_container::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, rgb(210, 210, 210), red);
  border-radius: 10px;
}

.trailers_container::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
}

.trailers {
  display: flex;
  margin: 0px auto;
  padding-left: 10px;
  width: 300px;
  scroll-snap-align: start;
}

.error {
  margin: 0 auto;
  color: red;
  text-align: center;
}

@media screen and (max-width: 430px) {
}
</style>
