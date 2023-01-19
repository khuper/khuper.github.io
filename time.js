let timeElement = document.getElementById("time");
setInterval(function() {
  let currentTime = new Date();
  let month = currentTime.toLocaleString("default", {month: "long"});
  let day = currentTime.getDate();
  let year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  let ampm = (hours < 12) ? "AM" : "PM";
  hours = (hours > 12) ? hours - 12 : hours;
  hours = (hours == 0) ? 12 : hours;
  let time = hours + ":" + minutes + " " + ampm;
  timeElement.innerHTML = month + " " + day + ", " + year + " " + time;
}, 1000);