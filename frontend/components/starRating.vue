<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";

class StarRating {
  private ratings: { id: number; name: string }[];
  private rating: { id: number; name: string } | null;
  private el: HTMLFormElement | null;

  constructor(qs: string) {
    this.ratings = [
      { id: 1, name: "Terrible" },
      { id: 2, name: "Bad" },
      { id: 3, name: "OK" },
      { id: 4, name: "Good" },
      { id: 5, name: "Excellent" },
    ];
    this.rating = null;
    this.el = document.querySelector(qs) as HTMLFormElement;

    this.init();
  }

  private init(): void {
    this.el?.addEventListener("change", this.updateRating.bind(this));

    // stop Firefox from preserving form data between refreshes
    try {
      this.el?.reset();
    } catch (err) {
      console.error("Element isn't a form.");
    }
  }

  private updateRating(e: Event): void {
    const target = e.target as HTMLInputElement;

    // clear animation delays
    Array.from(this.el?.querySelectorAll(`[for*="rating"]`) || []).forEach(
      (el) => {
        (el as HTMLElement).className = "rating__label";
      }
    );

    const ratingObject = this.ratings.find((r) => r.id === +target.value);
    const prevRatingID = this.rating?.id || 0;

    let delay = 0;
    this.rating = ratingObject || null;
    this.ratings.forEach((rating) => {
      const { id } = rating;

      // add the delays
      const ratingLabel = this.el?.querySelector(
        `[for="rating-${id}"]`
      ) as HTMLElement;

      if (id > prevRatingID + 1 && id <= (this.rating?.id || 0)) {
        ++delay;
        ratingLabel.classList.add(`rating__label--delay${delay}`);
      }

      // hide ratings to not read, show the one to read
      const ratingTextEl = this.el?.querySelector(
        `[data-rating="${id}"]`
      ) as HTMLElement;

      if (this.rating?.id !== id) {
        ratingTextEl.setAttribute("hidden", "true");
      } else {
        ratingTextEl.removeAttribute("hidden");
      }
    });
  }
}

// onMounted(() => {
// new StarRating("form.rating");
// getRating();
// });

const props = defineProps<{
  title: string;
  movieId: number;
}>();

const baseUrl = "https://movie-explorer-api-4ezv.onrender.com";

const rate = async (rating: number) => {
  try {
    const data = { title: props.title, rating: rating, movieId: props.movieId };
    const response = await axios.post(baseUrl + "/rate", data, {
      withCredentials: true,
    });
    if (response.data.status === 401) {
      window.alert("Please login first");
      new StarRating("form.rating");
    }
    console.log(data);
  } catch (e: any) {
    console.error(e);
    if (e.response.status === 401) {
      window.alert("Please login first");
      new StarRating("form.rating");
    }
  }
};

const currentRating = ref(0);

const getRating = async () => {
  try {
    const title = props.title;
    const response = await axios.get(`${baseUrl}/get-rating/${title}`, {
      withCredentials: true,
    });

    if (response.data) {
      console.log(response.data);
      currentRating.value = response.data.rating;
      updateStarDisplay(currentRating.value);
    }
  } catch (e) {
    console.error(e);
  }
};

const updateStarDisplay = (rating: number) => {
  const ratingInput = document.querySelector(
    `#rating-${rating}`
  ) as HTMLInputElement;
  if (ratingInput) {
    ratingInput.checked = true;
    const event = new Event("change");
    ratingInput.dispatchEvent(event);
  }
};

onMounted(() => {
  getRating();
});
</script>

<template>
  <form class="rating">
    <div class="rating__stars">
      <input
        id="rating-1"
        class="rating__input rating__input-1"
        type="radio"
        name="rating"
        value="1"
        @click="rate(1)"
      />
      <input
        id="rating-2"
        class="rating__input rating__input-2"
        type="radio"
        name="rating"
        value="2"
        @click="rate(2)"
      />
      <input
        id="rating-3"
        class="rating__input rating__input-3"
        type="radio"
        name="rating"
        value="3"
        @click="rate(3)"
      />
      <input
        id="rating-4"
        class="rating__input rating__input-4"
        type="radio"
        name="rating"
        value="4"
        @click="rate(4)"
      />
      <input
        id="rating-5"
        class="rating__input rating__input-5"
        type="radio"
        name="rating"
        value="5"
        @click="rate(5)"
      />
      <label class="rating__label" for="rating-1">
        <svg
          class="rating__star"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16,16)">
            <circle
              class="rating__star-ring"
              fill="none"
              stroke="#000"
              stroke-width="16"
              r="8"
              transform="scale(0)"
            />
          </g>
          <g
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(16,16) rotate(180)">
              <polygon
                class="rating__star-stroke"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="none"
              />
              <polygon
                class="rating__star-fill"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="#000"
              />
            </g>
            <g
              transform="translate(16,16)"
              stroke-dasharray="12 12"
              stroke-dashoffset="12"
            >
              <polyline
                class="rating__star-line"
                transform="rotate(0)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(72)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(144)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(216)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(288)"
                points="0 4,0 16"
              />
            </g>
          </g>
        </svg>
        <span class="rating__sr">1 star—Terrible</span>
      </label>
      <label class="rating__label" for="rating-2">
        <svg
          class="rating__star"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16,16)">
            <circle
              class="rating__star-ring"
              fill="none"
              stroke="#000"
              stroke-width="16"
              r="8"
              transform="scale(0)"
            />
          </g>
          <g
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(16,16) rotate(180)">
              <polygon
                class="rating__star-stroke"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="none"
              />
              <polygon
                class="rating__star-fill"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="#000"
              />
            </g>
            <g
              transform="translate(16,16)"
              stroke-dasharray="12 12"
              stroke-dashoffset="12"
            >
              <polyline
                class="rating__star-line"
                transform="rotate(0)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(72)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(144)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(216)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(288)"
                points="0 4,0 16"
              />
            </g>
          </g>
        </svg>
        <span class="rating__sr">2 stars—Bad</span>
      </label>
      <label class="rating__label" for="rating-3">
        <svg
          class="rating__star"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16,16)">
            <circle
              class="rating__star-ring"
              fill="none"
              stroke="#000"
              stroke-width="16"
              r="8"
              transform="scale(0)"
            />
          </g>
          <g
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(16,16) rotate(180)">
              <polygon
                class="rating__star-stroke"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="none"
              />
              <polygon
                class="rating__star-fill"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="#000"
              />
            </g>
            <g
              transform="translate(16,16)"
              stroke-dasharray="12 12"
              stroke-dashoffset="12"
            >
              <polyline
                class="rating__star-line"
                transform="rotate(0)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(72)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(144)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(216)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(288)"
                points="0 4,0 16"
              />
            </g>
          </g>
        </svg>
        <span class="rating__sr">3 stars—OK</span>
      </label>
      <label class="rating__label" for="rating-4">
        <svg
          class="rating__star"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16,16)">
            <circle
              class="rating__star-ring"
              fill="none"
              stroke="#000"
              stroke-width="16"
              r="8"
              transform="scale(0)"
            />
          </g>
          <g
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(16,16) rotate(180)">
              <polygon
                class="rating__star-stroke"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="none"
              />
              <polygon
                class="rating__star-fill"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="#000"
              />
            </g>
            <g
              transform="translate(16,16)"
              stroke-dasharray="12 12"
              stroke-dashoffset="12"
            >
              <polyline
                class="rating__star-line"
                transform="rotate(0)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(72)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(144)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(216)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(288)"
                points="0 4,0 16"
              />
            </g>
          </g>
        </svg>
        <span class="rating__sr">4 stars—Good</span>
      </label>
      <label class="rating__label" for="rating-5">
        <svg
          class="rating__star"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <g transform="translate(16,16)">
            <circle
              class="rating__star-ring"
              fill="none"
              stroke="#000"
              stroke-width="16"
              r="8"
              transform="scale(0)"
            />
          </g>
          <g
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g transform="translate(16,16) rotate(180)">
              <polygon
                class="rating__star-stroke"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="none"
              />
              <polygon
                class="rating__star-fill"
                points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                fill="#000"
              />
            </g>
            <g
              transform="translate(16,16)"
              stroke-dasharray="12 12"
              stroke-dashoffset="12"
            >
              <polyline
                class="rating__star-line"
                transform="rotate(0)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(72)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(144)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(216)"
                points="0 4,0 16"
              />
              <polyline
                class="rating__star-line"
                transform="rotate(288)"
                points="0 4,0 16"
              />
            </g>
          </g>
        </svg>
        <span class="rating__sr">5 stars—Excellent</span>
      </label>
      <p class="rating__display" data-rating="1" hidden>Terrible</p>
      <p class="rating__display" data-rating="2" hidden>Bad</p>
      <p class="rating__display" data-rating="3" hidden>OK</p>
      <p class="rating__display" data-rating="4" hidden>Good</p>
      <p class="rating__display" data-rating="5" hidden>Excellent</p>
    </div>
  </form>
</template>

<style scoped>
/* Add the CSS styles here */
.rating {
  display: flex;
  height: 30px;
}
.rating__display {
  font-size: 1em;
  font-weight: 500;
  height: 18px;
  margin-left: 10px;
  color: rgb(226, 226, 226);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-style: italic;
  text-align: center;
}
.rating__stars {
  display: flex;
  align-items: center;
}
.rating__star {
  display: block;
  overflow: visible;
  pointer-events: none;
  width: 2em;
  height: 1.8em;
}
.rating__star-ring,
.rating__star-fill,
.rating__star-line,
.rating__star-stroke {
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
.rating__star-ring,
.rating__star-fill,
.rating__star-line {
  stroke: rgb(219, 217, 217);
}
.rating__star-fill {
  fill: rgb(141, 194, 247);
  transform: scale(0);
  transition:
    fill var(--trans-dur) var(--bezier),
    transform var(--trans-dur) var(--bezier);
}
.rating__star-line {
  stroke-dasharray: 12 13;
  stroke-dashoffset: -13;
}
.rating__star-stroke {
  stroke: #c7cad1;
  transition: stroke var(--trans-dur);
}
.rating__label {
  cursor: pointer;
}
.rating__label--delay1 .rating__star-ring,
.rating__label--delay1 .rating__star-fill,
.rating__label--delay1 .rating__star-line,
.rating__label--delay1 .rating__star-stroke {
  animation-delay: 0.05s;
}
.rating__label--delay2 .rating__star-ring,
.rating__label--delay2 .rating__star-fill,
.rating__label--delay2 .rating__star-line,
.rating__label--delay2 .rating__star-stroke {
  animation-delay: 0.1s;
}
.rating__label--delay3 .rating__star-ring,
.rating__label--delay3 .rating__star-fill,
.rating__label--delay3 .rating__star-line,
.rating__label--delay3 .rating__star-stroke {
  animation-delay: 0.15s;
}
.rating__label--delay4 .rating__star-ring,
.rating__label--delay4 .rating__star-fill,
.rating__label--delay4 .rating__star-line,
.rating__label--delay4 .rating__star-stroke {
  animation-delay: 0.2s;
}
.rating__input {
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
}
.rating__input:hover ~ [data-rating]:not([hidden]) {
  display: none;
}
.rating__input-1:hover ~ [data-rating="1"][hidden],
.rating__input-2:hover ~ [data-rating="2"][hidden],
.rating__input-3:hover ~ [data-rating="3"][hidden],
.rating__input-4:hover ~ [data-rating="4"][hidden],
.rating__input-5:hover ~ [data-rating="5"][hidden],
.rating__input:checked:hover ~ [data-rating]:not([hidden]) {
  display: block;
}
.rating__input-1:hover ~ .rating__label:first-of-type .rating__star-stroke,
.rating__input-2:hover
  ~ .rating__label:nth-of-type(-n + 2)
  .rating__star-stroke,
.rating__input-3:hover
  ~ .rating__label:nth-of-type(-n + 3)
  .rating__star-stroke,
.rating__input-4:hover
  ~ .rating__label:nth-of-type(-n + 4)
  .rating__star-stroke,
.rating__input-5:hover
  ~ .rating__label:nth-of-type(-n + 5)
  .rating__star-stroke {
  stroke: rgb(142, 201, 241);
  transform: scale(1);
}
.rating__input-1:checked ~ .rating__label:first-of-type .rating__star-ring,
.rating__input-2:checked
  ~ .rating__label:nth-of-type(-n + 2)
  .rating__star-ring,
.rating__input-3:checked
  ~ .rating__label:nth-of-type(-n + 3)
  .rating__star-ring,
.rating__input-4:checked
  ~ .rating__label:nth-of-type(-n + 4)
  .rating__star-ring,
.rating__input-5:checked
  ~ .rating__label:nth-of-type(-n + 5)
  .rating__star-ring {
  animation-name: starRing;
}
.rating__input-1:checked ~ .rating__label:first-of-type .rating__star-stroke,
.rating__input-2:checked
  ~ .rating__label:nth-of-type(-n + 2)
  .rating__star-stroke,
.rating__input-3:checked
  ~ .rating__label:nth-of-type(-n + 3)
  .rating__star-stroke,
.rating__input-4:checked
  ~ .rating__label:nth-of-type(-n + 4)
  .rating__star-stroke,
.rating__input-5:checked
  ~ .rating__label:nth-of-type(-n + 5)
  .rating__star-stroke {
  animation-name: starStroke;
}
.rating__input-1:checked ~ .rating__label:first-of-type .rating__star-line,
.rating__input-2:checked
  ~ .rating__label:nth-of-type(-n + 2)
  .rating__star-line,
.rating__input-3:checked
  ~ .rating__label:nth-of-type(-n + 3)
  .rating__star-line,
.rating__input-4:checked
  ~ .rating__label:nth-of-type(-n + 4)
  .rating__star-line,
.rating__input-5:checked
  ~ .rating__label:nth-of-type(-n + 5)
  .rating__star-line {
  animation-name: starLine;
}
.rating__input-1:checked ~ .rating__label:first-of-type .rating__star-fill,
.rating__input-2:checked
  ~ .rating__label:nth-of-type(-n + 2)
  .rating__star-fill,
.rating__input-3:checked
  ~ .rating__label:nth-of-type(-n + 3)
  .rating__star-fill,
.rating__input-4:checked
  ~ .rating__label:nth-of-type(-n + 4)
  .rating__star-fill,
.rating__input-5:checked
  ~ .rating__label:nth-of-type(-n + 5)
  .rating__star-fill {
  animation-name: starFill;
}
.rating__input-1:not(:checked):hover
  ~ .rating__label:first-of-type
  .rating__star-fill,
.rating__input-2:not(:checked):hover
  ~ .rating__label:nth-of-type(2)
  .rating__star-fill,
.rating__input-3:not(:checked):hover
  ~ .rating__label:nth-of-type(3)
  .rating__star-fill,
.rating__input-4:not(:checked):hover
  ~ .rating__label:nth-of-type(4)
  .rating__star-fill,
.rating__input-5:not(:checked):hover
  ~ .rating__label:nth-of-type(5)
  .rating__star-fill {
  fill: white;
}

.rating__sr {
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #17181c;
    --fg: #e3e4e8;
  }

  .rating {
    margin: auto;
  }
  .rating__star-stroke {
    stroke: #5870b2;
  }
}
@keyframes starRing {
  from,
  20% {
    animation-timing-function: ease-in;
    opacity: 1;
    r: 8px;
    stroke-width: 16px;
    transform: scale(0);
  }
  35% {
    animation-timing-function: ease-out;
    opacity: 0.5;
    r: 8px;
    stroke-width: 16px;
    transform: scale(1);
  }
  50%,
  to {
    opacity: 0;
    r: 16px;
    stroke-width: 0;
    transform: scale(1);
  }
}
@keyframes starFill {
  from,
  40% {
    animation-timing-function: ease-out;
    transform: scale(0);
  }
  60% {
    animation-timing-function: ease-in-out;
    transform: scale(1.2);
  }
  80% {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
@keyframes starStroke {
  from {
    transform: scale(1);
  }
  20%,
  to {
    transform: scale(0);
  }
}
@keyframes starLine {
  from,
  40% {
    animation-timing-function: ease-out;
    stroke-dasharray: 1 23;
    stroke-dashoffset: 1;
  }
  60%,
  to {
    stroke-dasharray: 12 13;
    stroke-dashoffset: -13;
  }
}
</style>
