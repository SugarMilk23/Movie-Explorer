import { useSSRContext, defineComponent, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
    const isLogIn = ref(true);
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-ad80a759><div class="${ssrRenderClass([{ flipped: !isLogIn.value }, "flip-container"])}" data-v-ad80a759><div class="toggle-form" data-v-ad80a759><p class="sign-up" data-v-ad80a759>Sign Up</p><p class="login" data-v-ad80a759>Login</p><span class="${ssrRenderClass([{ signUp: !isLogIn.value }, "slider"])}" data-v-ad80a759></span></div><div class="flipper" data-v-ad80a759><div class="front" data-v-ad80a759><form class="box" data-v-ad80a759><p class="text-muted" data-v-ad80a759>Please enter your username and password!</p><input type="text"${ssrRenderAttr("value", userName.value)} placeholder="Username" data-v-ad80a759><input type="password"${ssrRenderAttr("value", password.value)} placeholder="Password" data-v-ad80a759><a class="forgot text-muted" href="#" data-v-ad80a759>Forgot password?</a><input type="submit" value="Login" data-v-ad80a759><div class="col-md-12" data-v-ad80a759><ul class="social-network social-circle" data-v-ad80a759><li data-v-ad80a759><a href="#" class="icoFacebook" title="Facebook" data-v-ad80a759><img width="44" height="44" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" data-v-ad80a759></a></li><li data-v-ad80a759><a href="#" class="icoTwitter" title="Twitter" data-v-ad80a759><img width="44" height="44" src="https://img.icons8.com/fluency/48/twitterx--v1.png" alt="twitterx--v1" data-v-ad80a759></a></li><li data-v-ad80a759><a href="#" class="icoGoogle" title="Google +" data-v-ad80a759><img width="42" height="42" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" data-v-ad80a759></a></li></ul></div></form></div><div class="back" data-v-ad80a759><form class="box" data-v-ad80a759><p class="text-muted" data-v-ad80a759>Please fill in your details to sign up!</p><input type="text"${ssrRenderAttr("value", userName.value)} placeholder="Username" data-v-ad80a759><input type="email"${ssrRenderAttr("value", email.value)} placeholder="Email" data-v-ad80a759><input type="password"${ssrRenderAttr("value", password.value)} placeholder="Password" data-v-ad80a759><input type="password"${ssrRenderAttr("value", confirmPassword.value)} placeholder="Confirm Password" data-v-ad80a759><input type="submit" value="Sign Up" data-v-ad80a759><div class="col-md-12" data-v-ad80a759><ul class="social-network social-circle" data-v-ad80a759><li data-v-ad80a759><a href="#" class="icoFacebook" title="Facebook" data-v-ad80a759><img width="44" height="44" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" data-v-ad80a759></a></li><li data-v-ad80a759><a href="#" class="icoTwitter" title="Twitter" data-v-ad80a759><img width="44" height="44" src="https://img.icons8.com/fluency/48/twitterx--v1.png" alt="twitterx--v1" data-v-ad80a759></a></li><li data-v-ad80a759><a href="#" class="icoGoogle" title="Google +" data-v-ad80a759><img width="42" height="42" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" data-v-ad80a759></a></li></ul></div></form></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad80a759"]]);

export { index as default };
//# sourceMappingURL=index-vS4nfXI1.mjs.map
