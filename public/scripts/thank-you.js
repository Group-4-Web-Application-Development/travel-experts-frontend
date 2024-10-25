/**
 * @file thank-you.js
 * @description A thank-yo's JavaScript for couting down.
 *
 * @version 1.0.0
 * @date 2024-10-25
 * @author Sorawat Tanthikun
 */
let count = parseInt(document.getElementById("countdown").innerHTML);
var interval = setInterval(() => {
  document.getElementById("countdown").innerHTML = --count;
  if (count <= 0) {
    clearInterval(interval);
    window.location.replace("/registration");
  }
}, 1000);
