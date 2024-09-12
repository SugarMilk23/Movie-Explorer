import { useSSRContext, defineComponent, ref, computed, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const ratedMovies = ref([]);
    ref(null);
    const currentIndex = ref(0);
    const carouselStyle = computed(() => ({
      transform: `translateX(calc(50% - ${currentIndex.value * 200}px - 400px))`
    }));
    const getItemStyle = (index2) => {
      const distance = Math.abs(index2 - currentIndex.value);
      const scale = Math.max(0.8, 1 - distance * 0.1);
      const opacity = Math.max(0.5, 1 - distance * 0.2);
      const zIndex = 100 - distance;
      return {
        transform: `perspective(1000px) rotateY(${(index2 - currentIndex.value) * 5}deg) scale(${scale})`,
        opacity,
        zIndex
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-fd81fb6f><h1 data-v-fd81fb6f>Rated Movies</h1><div class="carousel-container" data-v-fd81fb6f><button class="nav-button prev" data-v-fd81fb6f>&lt;</button><div class="carousel-view" data-v-fd81fb6f><div class="rated-movies-container" style="${ssrRenderStyle(carouselStyle.value)}" data-v-fd81fb6f><!--[-->`);
      ssrRenderList(ratedMovies.value, (ratedMovie, index2) => {
        _push(`<div class="ratedMovie" style="${ssrRenderStyle(getItemStyle(index2))}" data-v-fd81fb6f>`);
        if (ratedMovie.rating == 1) {
          _push(`<div data-v-fd81fb6f><p data-v-fd81fb6f>\u2B50</p><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`)} alt="poster" data-v-fd81fb6f><h3 data-v-fd81fb6f>${ssrInterpolate(ratedMovie.title)}</h3><p data-v-fd81fb6f>rating: ${ssrInterpolate(ratedMovie.rating)}</p></div>`);
        } else if (ratedMovie.rating == 2) {
          _push(`<div data-v-fd81fb6f><p data-v-fd81fb6f>\u2B50\u2B50</p><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`)} alt="poster" data-v-fd81fb6f><h3 data-v-fd81fb6f>${ssrInterpolate(ratedMovie.title)}</h3><p data-v-fd81fb6f>rating: ${ssrInterpolate(ratedMovie.rating)}</p></div>`);
        } else if (ratedMovie.rating == 3) {
          _push(`<div data-v-fd81fb6f><p data-v-fd81fb6f>\u2B50\u2B50\u2B50</p><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`)} alt="poster" data-v-fd81fb6f><h3 data-v-fd81fb6f>${ssrInterpolate(ratedMovie.title)}</h3><p data-v-fd81fb6f>rating: ${ssrInterpolate(ratedMovie.rating)}</p></div>`);
        } else if (ratedMovie.rating == 4) {
          _push(`<div data-v-fd81fb6f><p data-v-fd81fb6f>\u2B50\u2B50\u2B50\u2B50</p><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`)} alt="poster" data-v-fd81fb6f><h3 data-v-fd81fb6f>${ssrInterpolate(ratedMovie.title)}</h3><p data-v-fd81fb6f>rating: ${ssrInterpolate(ratedMovie.rating)}</p></div>`);
        } else if (ratedMovie.rating == 5) {
          _push(`<div data-v-fd81fb6f><p data-v-fd81fb6f>\u2B50\u2B50\u2B50\u2B50\u2B50</p><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500/${ratedMovie.poster_path}`)} alt="poster" data-v-fd81fb6f><h3 data-v-fd81fb6f>${ssrInterpolate(ratedMovie.title)}</h3><p data-v-fd81fb6f>rating: ${ssrInterpolate(ratedMovie.rating)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><button class="nav-button next" data-v-fd81fb6f>&gt;</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ratedMovies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd81fb6f"]]);

export { index as default };
//# sourceMappingURL=index-CoiDm5Q6.mjs.map
