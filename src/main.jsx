import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EconomistBarChart from "./EconomistBarChart.jsx";

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },
];

// The chart dimensions (often passed as prop too)
const width = 650;
const height = 360;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EconomistBarChart data={data} width={width} height={height} />
  </StrictMode>,
);
