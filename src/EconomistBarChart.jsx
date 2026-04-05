import { useState, useRef } from "react";
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
  const containerRef = useRef(null);
  const [hoveredName, setHoveredName] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: "", count: 0, description: "", url: "" });

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

    const isActive = hoveredName === null || hoveredName === d.name;

    return (
      <g
        key={i}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setHoveredName(d.name)}
        onMouseLeave={() => {
          setHoveredName(null);
          setTooltip((t) => ({ ...t, visible: false }));
        }}
        onMouseMove={(e) => {
          const rect = containerRef.current.getBoundingClientRect();
          setTooltip({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top, name: d.name, count: d.count, description: d.description, url: d.url });
        }}
      >
        <rect
          key={"bar-" + i}
          x={0}
          y={yBar}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          fill={"var(--economist-blue)"}
          className="bar"
          opacity={isActive ? 1 : 0.3}
          style={{ transition: "opacity 150ms ease" }}
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
            opacity={isActive ? 1 : 0.3}
            style={{ transition: "opacity 150ms ease" }}
          />
        )}
        <text
          key={"label-" + i}
          x={labelOffset + xLabel}
          y={yLabel}
          style={{ fill: labelColor, opacity: isActive ? 1 : 0.3, transition: "opacity 150ms ease" }}
          className="label"
        >
          {d.name}
        </text>
      </g>
    );
  });

  return (
    <div className="chart-container" ref={containerRef} style={{ position: "relative" }}>
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
      {tooltip.visible && (
        <div className="tooltip" style={{ left: tooltip.x + 12, top: tooltip.y - 28 }}>
          <div className="tooltip-name">{tooltip.name}</div>
          <div className="tooltip-value">{tooltip.count} infections</div>
          {tooltip.description && (
            <div className="tooltip-description">{tooltip.description}</div>
          )}
          {tooltip.url && (
            <a className="tooltip-link" href={tooltip.url} target="_blank" rel="noreferrer">
              Wikipedia →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
