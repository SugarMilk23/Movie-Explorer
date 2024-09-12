import { _ as __nuxt_component_0 } from './nuxt-link-D0iNu2gU.mjs';
import { useSSRContext, defineComponent, inject, ref, withAsyncContext, watch, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0, u as useFetch } from './unavailable-B0cPAupf.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const searchByTitle = inject("searchByTitle", ref(""));
    const searchResults = ref([]);
    const movies = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(500);
    const searchResultsTotalPages = ref(0);
    const currentResultsPage = ref(1);
    const isResetPage = ref(false);
    const isMounted = ref(false);
    const titleVisible = ref(false);
    const fetchMovies = async () => {
      const { data } = await useFetch("/api/movies", { query: { page: currentPage.value } }, "$pqtWcjQkdb");
      movies.value = data.value.results;
    };
    [__temp, __restore] = withAsyncContext(() => fetchMovies()), await __temp, __restore();
    const fetchSearchResults = async () => {
      const { data } = await useFetch(`/api/search/${searchByTitle.value}`, {
        query: { title: searchByTitle.value, page: currentResultsPage.value }
      }, "$cmRBlMwAGX");
      searchResults.value = data.value.results;
      searchResultsTotalPages.value = data.value.total_pages;
      if (isResetPage.value) {
        currentResultsPage.value = 1;
        isResetPage.value = false;
      }
      currentPage.value = 1;
      sessionStorage.removeItem("currentPage");
    };
    watch([currentPage], async () => {
      await fetchMovies();
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage.value));
    });
    watch([currentResultsPage], async () => {
      await fetchSearchResults();
      sessionStorage.setItem("currentResultsPage", JSON.stringify(currentResultsPage.value));
    });
    const watcherForSearchByTitle = async () => {
      console.log("watcher is triggered");
      if (searchByTitle.value === "") {
        sessionStorage.removeItem("searchByTitle");
        sessionStorage.removeItem("currentResultsPage");
        currentResultsPage.value = 1;
        searchResults.value = [];
      } else {
        if (isMounted.value) {
          await fetchSearchResults();
          isMounted.value = false;
        } else {
          isResetPage.value = true;
          await fetchSearchResults();
        }
        sessionStorage.setItem("searchByTitle", searchByTitle.value);
        sessionStorage.setItem("currentResultsPage", JSON.stringify(currentResultsPage.value));
      }
    };
    watch(searchByTitle, async () => {
      watcherForSearchByTitle();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="search" data-v-dfaccf85><input type="search" placeholder="Search"${ssrRenderAttr("value", unref(searchByTitle))} data-v-dfaccf85><span class="material-icons" data-v-dfaccf85>\xA0search</span></div>`);
      if (!unref(searchByTitle)) {
        _push(`<div class="trending" data-v-dfaccf85><h1 class="${ssrRenderClass({ "visible": titleVisible.value })}" data-v-dfaccf85>Trending Now</h1><div class="movies" data-v-dfaccf85><!--[-->`);
        ssrRenderList(movies.value, (movie) => {
          _push(`<div class="movie" data-v-dfaccf85>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/detail/${movie.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (movie.poster_path) {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", "https://image.tmdb.org/t/p/w500" + movie.poster_path)} data-v-dfaccf85${_scopeId}>`);
                } else {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", _imports_0)} alt="poster" data-v-dfaccf85${_scopeId}>`);
                }
                _push2(`<p class="title" data-v-dfaccf85${_scopeId}>${ssrInterpolate(movie.title)}</p>`);
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
                  createVNode("p", { class: "title" }, toDisplayString(movie.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (totalPages.value > 1) {
          _push(`<div class="pagination" data-v-dfaccf85><button class="paginate first"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\xAB</span></button><button class="paginate prev"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\u2039</span></button><div class="counter" data-v-dfaccf85>${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)}</div><button class="paginate next"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\u203A</span></button><button class="paginate last"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\xBB</span></button><input type="number"${ssrRenderAttr("value", currentPage.value)} min="1"${ssrRenderAttr("max", totalPages.value)} data-v-dfaccf85></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="results" data-v-dfaccf85><h1 class="${ssrRenderClass({ "visible": titleVisible.value })}" data-v-dfaccf85>Results</h1><div class="movies" data-v-dfaccf85><!--[-->`);
        ssrRenderList(searchResults.value, (result) => {
          _push(`<div class="movie" data-v-dfaccf85>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/detail/${result.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (result.poster_path) {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", "https://image.tmdb.org/t/p/w500" + result.poster_path)} data-v-dfaccf85${_scopeId}>`);
                } else {
                  _push2(`<img class="movie_image"${ssrRenderAttr("src", _imports_0)} alt="poster" data-v-dfaccf85${_scopeId}>`);
                }
                _push2(`<p class="title" data-v-dfaccf85${_scopeId}>${ssrInterpolate(result.title)}</p>`);
              } else {
                return [
                  result.poster_path ? (openBlock(), createBlock("img", {
                    key: 0,
                    class: "movie_image",
                    src: "https://image.tmdb.org/t/p/w500" + result.poster_path
                  }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                    key: 1,
                    class: "movie_image",
                    src: _imports_0,
                    alt: "poster"
                  })),
                  createVNode("p", { class: "title" }, toDisplayString(result.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (searchResults.value) {
          _push(`<div class="pagination" data-v-dfaccf85><button class="paginate first"${ssrIncludeBooleanAttr(currentResultsPage.value === 1) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\xAB</span></button><button class="paginate prev"${ssrIncludeBooleanAttr(currentResultsPage.value === 1) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\u2039</span></button><div class="counter" data-v-dfaccf85>${ssrInterpolate(currentResultsPage.value)} / ${ssrInterpolate(searchResultsTotalPages.value)}</div><button class="paginate next"${ssrIncludeBooleanAttr(currentResultsPage.value === searchResultsTotalPages.value) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\u203A</span></button><button class="paginate last"${ssrIncludeBooleanAttr(currentResultsPage.value === searchResultsTotalPages.value) ? " disabled" : ""} data-v-dfaccf85><span class="arrow" data-v-dfaccf85>\xBB</span></button><input type="number"${ssrRenderAttr("value", currentResultsPage.value)} min="1"${ssrRenderAttr("max", searchResultsTotalPages.value)} data-v-dfaccf85></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dfaccf85"]]);

export { index as default };
//# sourceMappingURL=index-CL-VzTXU.mjs.map
