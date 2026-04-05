import * as d3 from "d3";
import "./EconomistBarChart.css";

function measureTextWidth(text) {
  const svg = d3.select("body").append("svg");
  const width = svg
    .append("text")
    .attr("class", "label")
    .text(text)
    .node()
    .getComputedTextLength();
  svg.remove();
  return width;
}

// Initialize React Component
export default function EconomistBarChart({ data, width, height }) {
  const labelOffset = 7;
  const labelThreshold = 8;
  const maxValue = d3.max(data, (d) => d.count);
  const maxValueGrid = Math.ceil(maxValue / 5) * 5;
  const gridTicks = d3.range(0, maxValueGrid + 1, 5);

  console.log("maxValueGrid", maxValueGrid);
  console.log("gridTicks", gridTicks);

  const xScale = d3.scaleLinear().domain([0, maxValueGrid]).range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain([...data].sort((a, b) => b.count - a.count).map((d) => d.name))
    .range([0, height])
    .padding(0.3);

  const header = (
    <div className="header" style={{ width: 0.95 * width }}>
      <div className="headerLine" />
      <div className="headerBox" />
      <span className="title">Escape artists</span>
      <br />
      <span className="subtitle">
        Number of laboratory-acquired infections, 1970-2021
      </span>
    </div>
  );

  const footer = (
    <div className="footer">
      <span>
        Sources: Laboratory-Acquired Infection Database; American Biological
        Safety Association
      </span>
      <br />
      <span>The Economist</span>
    </div>
  );

  const plotBackground = (
    <rect x={0} y={0} width={width} height={height} className="plot-bg" />
  );

  const gridLines = gridTicks.map((tick, i) => (
    <g key={i}>
      <text x={xScale(tick)} y={-10} className="xAxisText">
        {tick}
      </text>
      <line
        x1={xScale(tick)}
        y1={0}
        x2={xScale(tick)}
        y2={height}
        stroke={i === 0 ? "black" : "var(--grid-line)"}
        opacity={i === 0 ? 0.8 : 0.2}
        className="gridLine"
      />
    </g>
  ));

  const allBars = data.map((d, i) => {
    const xLabel = d.count < labelThreshold ? xScale(d.count) : 0;
    const yLabel = yScale(d.name) + yScale.bandwidth() / 2;
    const yBar = yScale(d.name);
    const labelColor =
      d.count < labelThreshold ? "var(--economist-blue)" : "#fff";

    return (
      <g key={i}>
        <rect
          key={"bar-" + i}
          x={0}
          y={yBar}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          fill={"var(--economist-blue)"}
          className="bar"
        />
        {d.count < labelThreshold && (
          <rect
            key={"label-bg-" + i}
            x={labelOffset + xLabel}
            y={yBar}
            width={measureTextWidth(d.name)}
            height={yScale.bandwidth()}
            fill="var(--background)"
            className="label-bg"
          />
        )}
        <text
          key={"label-" + i}
          x={labelOffset + xLabel}
          y={yLabel}
          style={{ fill: labelColor }}
          className="label"
        >
          {d.name}
        </text>
      </g>
    );
  });

  return (
    <>
      {header}
      <svg
        width={width}
        height={height}
        overflow="visible"
        className="economist-barchart"
      >
        {plotBackground}
        {gridLines}
        {allBars}
      </svg>
      {footer}
    </>
  );
}
