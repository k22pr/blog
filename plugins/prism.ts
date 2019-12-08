import Vue from "vue";
// import Prism from "vue-prism";
var Prism = require("vue-prism");

import "prismjs";

require("~/static/prism.css");

import "prismjs/plugins/autolinker/prism-autolinker.min";
import "prismjs/plugins/autolinker/prism-autolinker.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Vue.component("prism", Prism);
Vue.use(Prism);
