import { createApp } from "vue";
/** @ts-expect-error virtual-import */
import player from "virtual:player";
/** @ts-expect-error virtual-import */
import router from "virtual:router";
/** @ts-expect-error virtual-import */
import App from "virtual:user-main";

console.log(player);

createApp(App).use(router).use(player).mount("#app");
