import { createApp } from "vue";
import "./style.less";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);
app.mount("#app");
