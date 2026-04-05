import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EconomistBarChart from "./EconomistBarChart.jsx";

const meta = [
  {
    name: "Hantavirus",
    url: "https://en.wikipedia.org/wiki/Hantavirus",
    description:
      "A virus naturally carried by rodents that can cause hemorrhagic fever with renal syndrome (HFRS) and hantavirus pulmonary syndrome (HPS). It spreads through contact with infected rodent droppings, urine, or saliva.",
  },
  {
    name: "Tularemia",
    url: "https://en.wikipedia.org/wiki/Tularemia",
    description:
      "Also known as rabbit fever, tularemia is an infectious disease caused by the bacterium Francisella tularensis. It typically spreads via ticks, deer flies, or contact with infected animals.",
  },
  {
    name: "Dengue",
    url: "https://en.wikipedia.org/wiki/Dengue_fever",
    description:
      "A mosquito-borne viral disease prevalent in tropical and subtropical regions worldwide. Most cases are mild, but a small proportion develop severe, life-threatening complications.",
  },
  {
    name: "Ebola",
    url: "https://en.wikipedia.org/wiki/Ebola",
    description:
      "A rare but severe and often fatal illness spread through direct contact with blood or body fluids of infected individuals. Case fatality rates have ranged from 25% to 90% in past outbreaks.",
  },
  {
    name: "E. coli",
    url: "https://en.wikipedia.org/wiki/Escherichia_coli",
    description:
      "A bacterium naturally present in the intestines of warm-blooded animals; most strains are harmless, but certain pathogenic variants can cause serious foodborne illness.",
  },
  {
    name: "Tuberculosis",
    url: "https://en.wikipedia.org/wiki/Tuberculosis",
    description:
      "A contagious disease caused by Mycobacterium tuberculosis that primarily affects the lungs. It spreads through the air when infected individuals cough or sneeze.",
  },
  {
    name: "Salmonella",
    url: "https://en.wikipedia.org/wiki/Salmonella",
    description:
      "A genus of bacteria responsible for common foodborne illness, typically transmitted through contaminated food or water. Infections range from mild gastroenteritis to serious systemic disease.",
  },
  {
    name: "Vaccinia",
    url: "https://en.wikipedia.org/wiki/Vaccinia",
    description:
      "A large DNA poxvirus used as the basis for the smallpox vaccine, contributing to the global eradication of smallpox. It can cause mild infections in laboratory workers who handle it.",
  },
  {
    name: "Brucella",
    url: "https://en.wikipedia.org/wiki/Brucella",
    description:
      "A genus of bacteria causing brucellosis, transmitted through contact with infected animals or unpasteurized dairy products. It primarily affects mammals and can lead to serious complications in humans.",
  },
];

const counts = [
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

const metaByName = Object.fromEntries(meta.map((d) => [d.name, d]));
const data = counts.map((d) => ({ ...d, ...metaByName[d.name] }));

// The chart dimensions (often passed as prop too)
const width = 650;
const height = 360;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EconomistBarChart data={data} width={width} height={height} />
  </StrictMode>,
);
