import { createApp } from "vue";
import "./output.css";
import App from "./App.vue";
import Preview from "./components/Preview.vue";
import "font-awesome/css/font-awesome.css";
import { createPlayer } from "@vue-motion/core";
// /**@ts-ignore */
// import router from 'virtual:router'
// /**@ts-ignore */
// import player from 'virtual:player'

if (__D__) {
  createApp(App)
    .use(
      createPlayer({
        studio: true,
      }),
    )
    .mount("#app");
} else {
  createApp(Preview).mount("#app");
}
