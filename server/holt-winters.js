import { holtWinters } from "forecasting";

const salesData = [100, 120, 130, 150, 170, 160, 180];

const model = holtWinters(salesData, {
  alpha: 0.2,
  beta: 0.1,
  gamma: 0.2,
  period: 12,
  forecast: 3,
});

console.log("Predicted next months:", model);
