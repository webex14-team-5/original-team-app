import { createApp } from "vue"
import App from "./App.vue"
import "../firebase.js"
import router from "./router"
import axios from "axios"

// Vue.config.productionTip = false
axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/team5-original-app/databases/(default)/documents"

createApp(App).use(router).mount("#app")
