import { _ as __nuxt_component_0 } from './nuxt-link-D0iNu2gU.mjs';
import { useSSRContext, defineComponent, mergeProps, ref, provide, withCtx, createVNode, createTextVNode, unref } from 'vue';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import axios from 'axios';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "logout",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-c243d468><div class="modal-content" data-v-c243d468><h2 data-v-c243d468>Logout Confirmation</h2><p data-v-c243d468>Are you sure you want to log out?</p><div class="button-group" data-v-c243d468><button class="confirm-btn" data-v-c243d468><span data-v-c243d468>Yes, Logout</span></button><button class="cancel-btn" data-v-c243d468><span data-v-c243d468>Cancel</span></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/logout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c243d468"]]);
const baseUrl = "http://localhost:3100";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const searchByTitle = ref("");
    const clearSearchByTitle = () => {
      searchByTitle.value = "";
    };
    provide("searchByTitle", searchByTitle);
    const handleHomeClick = () => {
      clearSearchByTitle();
    };
    const isSidebarOpen = ref(false);
    const isAuthenticated = ref(false);
    const showLogoutModal = ref(false);
    const closeLogoutModal = () => {
      showLogoutModal.value = false;
    };
    const authenticateUser = async () => {
      const response = await axios.get(baseUrl + "/authenticate-user", {
        withCredentials: true
      });
      if (response.status === 200) {
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    };
    const handleLogout = async () => {
      try {
        await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
        isAuthenticated.value = false;
        closeLogoutModal();
        navigateTo("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<body${ssrRenderAttrs(_attrs)} data-v-f43462b2><div class="container" data-v-f43462b2><div class="header" data-v-f43462b2><div class="info" data-v-f43462b2><ul data-v-f43462b2><li class="home" data-v-f43462b2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        onClick: handleHomeClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="material-icons" data-v-f43462b2${_scopeId}>home</span>\xA0 Home`);
          } else {
            return [
              createVNode("span", { class: "material-icons" }, "home"),
              createTextVNode("\xA0 Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f43462b2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="material-icons" data-v-f43462b2${_scopeId}>group</span> \xA0About Us`);
          } else {
            return [
              createVNode("span", { class: "material-icons" }, "group"),
              createTextVNode(" \xA0About Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f43462b2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="material-icons" data-v-f43462b2${_scopeId}>call</span> \xA0Contact`);
          } else {
            return [
              createVNode("span", { class: "material-icons" }, "call"),
              createTextVNode(" \xA0Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f43462b2>`);
      if (!unref(isAuthenticated)) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="material-icons" data-v-f43462b2${_scopeId}>login</span> \xA0Login`);
            } else {
              return [
                createVNode("span", { class: "material-icons" }, "login"),
                createTextVNode(" \xA0Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<a href="#" data-v-f43462b2><span class="material-icons" data-v-f43462b2>logout</span> \xA0Logout </a>`);
      }
      _push(`</li></ul></div></div>`);
      if (unref(isAuthenticated)) {
        _push(`<nav class="${ssrRenderClass([{ open: unref(isSidebarOpen) }, "sideBar"])}" data-v-f43462b2><span class="material-icons menu" data-v-f43462b2>menu</span><ul data-v-f43462b2><li data-v-f43462b2><span class="material-icons" data-v-f43462b2>\xA0person</span>\xA0Profile</li><li data-v-f43462b2><span class="material-icons" data-v-f43462b2>\xA0favorite</span>\xA0 Favorites </li>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/ratedMovies" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<li data-v-f43462b2${_scopeId}><span class="material-icons" data-v-f43462b2${_scopeId}>\xA0rate_review</span>\xA0Rated Movies </li>`);
            } else {
              return [
                createVNode("li", { onClick: authenticateUser }, [
                  createVNode("span", { class: "material-icons" }, "\xA0rate_review"),
                  createTextVNode("\xA0Rated Movies ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<li data-v-f43462b2><span class="material-icons" data-v-f43462b2>\xA0notifications</span>\xA0Notification </li><li data-v-f43462b2><span class="material-icons" data-v-f43462b2>\xA0settings</span>\xA0Settings </li></ul></nav>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<footer data-v-f43462b2>Copyright \xA9 2024 Tan</footer></div>`);
      _push(ssrRenderComponent(LogoutModal, {
        "is-open": unref(showLogoutModal),
        onClose: closeLogoutModal,
        onConfirm: handleLogout
      }, null, _parent));
      _push(`</body>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f43462b2"]]);

export { _default as default };
//# sourceMappingURL=default-Cr1KKlXR.mjs.map
