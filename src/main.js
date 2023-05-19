import { createApp } from "vue";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "@/assets/styles/global.css";

import App from "./App.vue";
import router from "./router";
import { registerGlobalComponent } from "@/utils/import";

const app = createApp(App);

registerGlobalComponent(app);

app.use(router).use(DatePicker).mount("#app");
