import { useSSRContext, defineComponent, ref, mergeProps, withAsyncContext, computed, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
import { u as useFetch, _ as _imports_0 } from './unavailable-B0cPAupf.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D0iNu2gU.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "starRating",
  __ssrInlineRender: true,
  props: {
    title: {},
    movieId: {}
  },
  setup(__props) {
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "rating" }, _attrs))} data-v-a56a09e1><div class="rating__stars" data-v-a56a09e1><input id="rating-1" class="rating__input rating__input-1" type="radio" name="rating" value="1" data-v-a56a09e1><input id="rating-2" class="rating__input rating__input-2" type="radio" name="rating" value="2" data-v-a56a09e1><input id="rating-3" class="rating__input rating__input-3" type="radio" name="rating" value="3" data-v-a56a09e1><input id="rating-4" class="rating__input rating__input-4" type="radio" name="rating" value="4" data-v-a56a09e1><input id="rating-5" class="rating__input rating__input-5" type="radio" name="rating" value="5" data-v-a56a09e1><label class="rating__label" for="rating-1" data-v-a56a09e1><svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-v-a56a09e1><g transform="translate(16,16)" data-v-a56a09e1><circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" data-v-a56a09e1></circle></g><g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a56a09e1><g transform="translate(16,16) rotate(180)" data-v-a56a09e1><polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" data-v-a56a09e1></polygon><polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" data-v-a56a09e1></polygon></g><g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12" data-v-a56a09e1><polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" data-v-a56a09e1></polyline></g></g></svg><span class="rating__sr" data-v-a56a09e1>1 star\u2014Terrible</span></label><label class="rating__label" for="rating-2" data-v-a56a09e1><svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-v-a56a09e1><g transform="translate(16,16)" data-v-a56a09e1><circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" data-v-a56a09e1></circle></g><g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a56a09e1><g transform="translate(16,16) rotate(180)" data-v-a56a09e1><polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" data-v-a56a09e1></polygon><polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" data-v-a56a09e1></polygon></g><g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12" data-v-a56a09e1><polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" data-v-a56a09e1></polyline></g></g></svg><span class="rating__sr" data-v-a56a09e1>2 stars\u2014Bad</span></label><label class="rating__label" for="rating-3" data-v-a56a09e1><svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-v-a56a09e1><g transform="translate(16,16)" data-v-a56a09e1><circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" data-v-a56a09e1></circle></g><g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a56a09e1><g transform="translate(16,16) rotate(180)" data-v-a56a09e1><polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" data-v-a56a09e1></polygon><polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" data-v-a56a09e1></polygon></g><g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12" data-v-a56a09e1><polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" data-v-a56a09e1></polyline></g></g></svg><span class="rating__sr" data-v-a56a09e1>3 stars\u2014OK</span></label><label class="rating__label" for="rating-4" data-v-a56a09e1><svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-v-a56a09e1><g transform="translate(16,16)" data-v-a56a09e1><circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" data-v-a56a09e1></circle></g><g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a56a09e1><g transform="translate(16,16) rotate(180)" data-v-a56a09e1><polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" data-v-a56a09e1></polygon><polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" data-v-a56a09e1></polygon></g><g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12" data-v-a56a09e1><polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" data-v-a56a09e1></polyline></g></g></svg><span class="rating__sr" data-v-a56a09e1>4 stars\u2014Good</span></label><label class="rating__label" for="rating-5" data-v-a56a09e1><svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-v-a56a09e1><g transform="translate(16,16)" data-v-a56a09e1><circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" data-v-a56a09e1></circle></g><g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a56a09e1><g transform="translate(16,16) rotate(180)" data-v-a56a09e1><polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" data-v-a56a09e1></polygon><polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" data-v-a56a09e1></polygon></g><g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12" data-v-a56a09e1><polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" data-v-a56a09e1></polyline><polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" data-v-a56a09e1></polyline></g></g></svg><span class="rating__sr" data-v-a56a09e1>5 stars\u2014Excellent</span></label><p class="rating__display" data-rating="1" hidden data-v-a56a09e1>Terrible</p><p class="rating__display" data-rating="2" hidden data-v-a56a09e1>Bad</p><p class="rating__display" data-rating="3" hidden data-v-a56a09e1>OK</p><p class="rating__display" data-rating="4" hidden data-v-a56a09e1>Good</p><p class="rating__display" data-rating="5" hidden data-v-a56a09e1>Excellent</p></div></form>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/starRating.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a56a09e1"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "trailers",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { id } = useRoute().params;
    const { data: trailer } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/trailer/${id}`, "$h1ArYAnkyZ")), __temp = await __temp, __restore(), __temp);
    console.log("trailer : ", trailer);
    let videoKeys = [];
    for (let result of trailer.value.results) {
      if (result.key) {
        videoKeys.push(result.key);
      }
    }
    const limitedVideoKeys = computed(() => {
      return videoKeys.slice(0, 10);
    });
    const iframeStyles = computed(() => ({
      width: "370px",
      height: "320px",
      marginLeft: "15px",
      "@media screen and (max-width: 430px)": {
        width: "27px",
        height: "190px"
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-3e7a2b72><div class="trailer-p" data-v-3e7a2b72><p data-v-3e7a2b72>Trailers</p></div>`);
      if (unref(limitedVideoKeys).length > 0) {
        _push(`<div class="trailers_container" data-v-3e7a2b72><!--[-->`);
        ssrRenderList(unref(limitedVideoKeys), (videoKey) => {
          _push(`<div class="trailers" data-v-3e7a2b72><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${videoKey}`)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="${ssrRenderStyle(unref(iframeStyles))}" data-v-3e7a2b72></iframe></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="error" data-v-3e7a2b72><p data-v-3e7a2b72>\u26A0\uFE0FTrailers not available\u26A0\uFE0F</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/trailers.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3e7a2b72"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "similar-movies",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { id } = useRoute().params;
    const { data: similarMovies } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/similar-movies/${id}`,
      "$BMuZbHVQjD"
    )), __temp = await __temp, __restore(), __temp);
    console.log("similar movies : ", similarMovies);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-0f52f6ae><h1 data-v-0f52f6ae>Similar Movies</h1>`);
      if (unref(similarMovies).results.length > 0) {
        _push(`<div class="movies" data-v-0f52f6ae><!--[-->`);
        ssrRenderList(unref(similarMovies).results, (movie) => {
          _push(`<div class="similar-movies" data-v-0f52f6ae><div class="movie" data-v-0f52f6ae>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/detail/${movie.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (movie.poster_path) {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", "https://image.tmdb.org/t/p/w500" + movie.poster_path)} data-v-0f52f6ae${_scopeId}>`);
                } else {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", _imports_0)} alt="poster" data-v-0f52f6ae${_scopeId}>`);
                }
                _push2(`<p data-v-0f52f6ae${_scopeId}>${ssrInterpolate(movie.title)}</p>`);
              } else {
                return [
                  movie.poster_path ? (openBlock(), createBlock("img", {
                    key: 0,
                    class: "movie_image",
                    src: "https://image.tmdb.org/t/p/w500" + movie.poster_path
                  }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                    key: 1,
                    class: "movie_image",
                    src: _imports_0,
                    alt: "poster"
                  })),
                  createVNode("p", null, toDisplayString(movie.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="error" data-v-0f52f6ae><p data-v-0f52f6ae>\u26A0\uFE0FSimilar movies not available\u26A0\uFE0F</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/similar-movies.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0f52f6ae"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { id } = useRoute$1().params;
    const { data: detail, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/detail/${id}`, "$qTwq0iy38b")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_StarRating = __nuxt_component_0;
      const _component_trailers = __nuxt_component_1;
      const _component_SimilarMovies = __nuxt_component_2;
      if (unref(detail)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-5a462202><div class="background_image" style="${ssrRenderStyle({
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${unref(detail).backdrop_path}')`
        })}" data-v-5a462202>`);
        if (unref(detail).poster_path) {
          _push(`<img class="poster"${ssrRenderAttr("src", "https://image.tmdb.org/t/p/w500" + unref(detail).poster_path)} alt="poster" data-v-5a462202>`);
        } else {
          _push(`<img class="poster"${ssrRenderAttr("src", _imports_0)} alt="poster" data-v-5a462202>`);
        }
        _push(`<div class="content" data-v-5a462202><div class="title_and_genres" data-v-5a462202><h1 class="title" data-v-5a462202>${ssrInterpolate(unref(detail).title)}</h1><div class="genres" data-v-5a462202>`);
        if (unref(detail).genres.length > 0) {
          _push(`<ul data-v-5a462202><!--[-->`);
          ssrRenderList(unref(detail).genres, (i) => {
            _push(`<li data-v-5a462202>\u{1F3F7}\uFE0F${ssrInterpolate(i.name)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<ul class="error" data-v-5a462202> \u26A0\uFE0FNo genres available\u26A0\uFE0F </ul>`);
        }
        _push(`</div></div><div class="descriptions" data-v-5a462202>`);
        _push(ssrRenderComponent(_component_StarRating, {
          title: unref(detail).title,
          movieId: unref(detail).id
        }, null, _parent));
        _push(`<div class="description_item" data-v-5a462202><h3 data-v-5a462202>Release Date:\xA0</h3><p data-v-5a462202>${ssrInterpolate(unref(detail).release_date)}</p></div><div class="description_item" data-v-5a462202><h3 data-v-5a462202>Language:\xA0</h3><p data-v-5a462202>${ssrInterpolate((_a = unref(detail).spoken_languages[0]) == null ? void 0 : _a.name)}</p></div><div class="description_item" data-v-5a462202><h3 data-v-5a462202>Origin Country:\xA0</h3><p data-v-5a462202>${ssrInterpolate(unref(detail).origin_country[0])}</p></div><div class="description_item" data-v-5a462202><h3 data-v-5a462202>Popularity:\xA0</h3><p data-v-5a462202>${ssrInterpolate(unref(detail).popularity)}</p></div><h3 data-v-5a462202>Overview</h3><p data-v-5a462202>${ssrInterpolate(unref(detail).overview)}</p></div></div></div>`);
        _push(ssrRenderComponent(_component_trailers, null, null, _parent));
        _push(`<div class="production_companies" data-v-5a462202><p data-v-5a462202>Production Companies</p></div><div class="companies" data-v-5a462202>`);
        if (unref(detail).production_companies.logo_path) {
          _push(`<!--[-->`);
          ssrRenderList(unref(detail).production_companies, (company) => {
            _push(`<div class="company" style="${ssrRenderStyle(company.logo_path ? null : { display: "none" })}" data-v-5a462202><img${ssrRenderAttr("src", "https://image.tmdb.org/t/p/w500" + company.logo_path)} alt="logo" data-v-5a462202><p data-v-5a462202>${ssrInterpolate(company == null ? void 0 : company.name)}</p></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="error" data-v-5a462202><p data-v-5a462202>\u26A0\uFE0FProduction companies not available\u26A0\uFE0F</p></div>`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_SimilarMovies, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a462202"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ByCLJVga.mjs.map
