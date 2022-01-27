import { createApp } from "vue";
import App from "./App.vue";
import "./styles";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdBackspaceOutlined,
  RiGithubLine,
  BiCaretLeft,
  BiCaretRight,
  MdRefresh
} from "oh-vue-icons/icons";

addIcons(
  MdBackspaceOutlined,
  RiGithubLine,
  BiCaretLeft,
  BiCaretRight,
  MdRefresh
);

// resize for scaling the board size
window.addEventListener("resize", onResize);
// set size on startup
onResize();

function onResize() {
  // get actual vh on mobile
  document.body.style.setProperty("--vh", window.innerHeight + "px");
}

const app = createApp(App);
app.component("VIcon", OhVueIcon);
app.mount("#app");
