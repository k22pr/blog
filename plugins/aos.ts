import Vue from "vue";
// import AOS from 'aos';
var AOS = require("aos");
import "aos/dist/aos.css";

AOS.init({
  easing: "ease-in",
  offset: 100,
  delay: 100,
  duration: 600,
});
