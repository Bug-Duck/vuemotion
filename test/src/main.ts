import { createApp } from "vue";
import "./style.css";
import { createPlayer } from "@vue-motion/core";
import App from "./App.vue";

createApp(App)
  .use(
    createPlayer({
      studio: true,
    }),
  )
  .mount("#app");
