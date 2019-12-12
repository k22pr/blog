import Vue from "vue";
// import AOS from 'aos';
var AOS = require("aos");
import "aos/dist/aos.css";

AOS.init({
  easing: "ease-in-sine",
  offset: 300,
  delay: 100,
  duration: 600,
});
