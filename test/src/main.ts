import { createApp } from "vue";
import "./style.css";
import { createPlayer } from "@vue-motion/core";
import { setups } from "@vue-motion/extension-animations";
import App from "./App.vue";

createApp(App)
  .use(
    createPlayer({
      addition: setups,
    }),
  )
  .mount("#app");
