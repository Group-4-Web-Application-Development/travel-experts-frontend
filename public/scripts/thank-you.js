let count = parseInt(document.getElementById("countdown").innerHTML);
var interval = setInterval(() => {
  document.getElementById("countdown").innerHTML = --count;
  if (count <= 0) {
    clearInterval(interval);
    window.location.replace("/customer-registration.html");
  }
}, 1000);
