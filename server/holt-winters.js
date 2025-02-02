import forecast from "nostradamus";
// the changes are reflected in the forked nostradmus repo https://github.com/aymenloudiy/Nostradamus.js
var data = [
  362, 385, 432, 341, 382, 409, 498, 387, 473, 513, 582, 474, 544, 582, 681,
  557, 628, 707, 773, 592, 627, 725, 854, 661,
];

var alpha = 0.5; // Overall smoothing
var beta = 0.4; // Trend smoothing
var gamma = 0.6; // Seasonal smoothing
var period = 4; // Observations per season
var m = 4; // Future periods to forecast

var predictions = forecast(data, alpha, beta, gamma, period, m);

console.log(predictions);
