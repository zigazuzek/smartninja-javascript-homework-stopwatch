// IMPORTANT: This will only work on a server and not by opening the HTML file in your browser
import Stopwatch from './stopwatch.js';

// Creating a new element from class and providing the display and laps output as parameters
let stopwatch = new Stopwatch(document.querySelector(".display"), document.querySelector(".laps"));

// Event listeners
document.querySelector(".start").addEventListener('click', function () {
    stopwatch.start();
});

document.querySelector(".stop").addEventListener('click', function () {
    stopwatch.stop();
});

document.querySelector(".lap").addEventListener('click', function () {
    stopwatch.lap();
});

document.querySelector(".reset").addEventListener('click', function () {
    stopwatch.clearStopwatch();
});
