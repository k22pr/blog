import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios.create({
   baseURL: "http://localhost:1337",
   timeout: 3000,
});

// Vue.use(axios);
