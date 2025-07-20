let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const username = document.getElementById("username");

document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 1000);
    running = true;
  }
});

document.getElementById("pause").addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  laps.innerHTML = "";
  lapCounter = 0;
  difference = 0;
  running = false;
});

document.getElementById("lap").addEventListener("click", () => {
  if (!running) return;
  const currentTime = formatTime(new Date().getTime() - startTime);
  const user = username.value || "Unknown User";
  const lapItem = document.createElement("li");
  lapItem.textContent = `${++lapCounter}. ${user} - ${currentTime}`;
  laps.appendChild(lapItem);
});

function updateDisplay() {
  updatedTime = new Date().getTime() - startTime;
  display.textContent = formatTime(updatedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}
