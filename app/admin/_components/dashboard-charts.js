"use client";

import { useState } from "react";

export default function DashboardCharts({ 
  applications, 
  data = applications,
  title = "Job Applications Overview",
  subtitle = "Monitor applicant traffic patterns across days, months, and years.",
  valueSuffix = "applications"
}) {
  const [groupBy, setGroupBy] = useState("month"); // "day" | "month" | "year"
  const [yearFilter, setYearFilter] = useState("all"); // "all" | "2025" | "2026"
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 1. Filter applications by Year if active
  const filteredApps = (data || []).filter((app) => {
    if (!app.createdAt) return false;
    const date = new Date(app.createdAt);
    if (isNaN(date.getTime())) return false;
    
    if (yearFilter !== "all") {
      return date.getFullYear().toString() === yearFilter;
    }
    return true;
  });

  // 2. Aggregate Data
  let chartData = [];

  if (groupBy === "day") {
    // Days of the week
    const days = [
      { label: "Sunday", short: "Sun", value: 0 },
      { label: "Monday", short: "Mon", value: 0 },
      { label: "Tuesday", short: "Tue", value: 0 },
      { label: "Wednesday", short: "Wed", value: 0 },
      { label: "Thursday", short: "Thu", value: 0 },
      { label: "Friday", short: "Fri", value: 0 },
      { label: "Saturday", short: "Sat", value: 0 },
    ];

    filteredApps.forEach((app) => {
      const date = new Date(app.createdAt);
      const dayIndex = date.getDay();
      days[dayIndex].value += 1;
    });

    chartData = days;
  } else if (groupBy === "month") {
    // Months of the year
    const months = [
      { label: "January", short: "Jan", value: 0 },
      { label: "February", short: "Feb", value: 0 },
      { label: "March", short: "Mar", value: 0 },
      { label: "April", short: "Apr", value: 0 },
      { label: "May", short: "May", value: 0 },
      { label: "June", short: "Jun", value: 0 },
      { label: "July", short: "Jul", value: 0 },
      { label: "August", short: "Aug", value: 0 },
      { label: "September", short: "Sep", value: 0 },
      { label: "October", short: "Oct", value: 0 },
      { label: "November", short: "Nov", value: 0 },
      { label: "December", short: "Dec", value: 0 },
    ];

    filteredApps.forEach((app) => {
      const date = new Date(app.createdAt);
      const monthIndex = date.getMonth();
      months[monthIndex].value += 1;
    });

    chartData = months;
  } else if (groupBy === "year") {
    // Years wise
    const yearsMap = {};
    (data || []).forEach((app) => {
      if (!app.createdAt) return;
      const date = new Date(app.createdAt);
      if (isNaN(date.getTime())) return;
      const yr = date.getFullYear().toString();
      yearsMap[yr] = (yearsMap[yr] || 0) + 1;
    });

    // Ensure 2025 and 2026 are present in the sorting order
    const sortedYears = Object.keys(yearsMap).sort();
    if (!sortedYears.includes("2025")) sortedYears.unshift("2025");
    if (!sortedYears.includes("2026") && !sortedYears.includes("2026")) sortedYears.push("2026");

    chartData = sortedYears.map((yr) => ({
      label: yr,
      short: yr,
      value: yearsMap[yr] || 0,
    }));
  }

  // 3. SVG Dimensions
  const svgWidth = 800;
  const svgHeight = 400;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 40;
  const paddingBottom = 50;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const maxValue = Math.max(...chartData.map((d) => d.value), 10); // avoid division by 0
  const yTicks = 4;

  return (
    <article className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 xl:col-span-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Group By Filter */}
          <div className="flex rounded-2xl bg-slate-100 p-1">
            {[
              { id: "day", label: "Days" },
              { id: "month", label: "Months" },
              { id: "year", label: "Years" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  setGroupBy(btn.id);
                  setHoveredIndex(null);
                }}
                className={`rounded-[1.1rem] px-4 py-2 text-xs font-semibold transition ${
                  groupBy === btn.id
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Year Filter (only visible when not year-wise) */}
          {groupBy !== "year" && (
            <div className="flex rounded-2xl bg-slate-100 p-1">
              {[
                { id: "all", label: "All Years" },
                { id: "2025", label: "2025" },
                { id: "2026", label: "2026" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    setYearFilter(btn.id);
                    setHoveredIndex(null);
                  }}
                  className={`rounded-[1.1rem] px-4 py-2 text-xs font-semibold transition ${
                    yearFilter === btn.id
                      ? "bg-cyan-500 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative mt-6 w-full overflow-hidden">
        {/* Hover Tooltip Box */}
        {hoveredIndex !== null && (
          <div
            className="absolute rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 border border-white/10"
            style={{
              left: `${
                paddingLeft +
                (hoveredIndex + 0.5) * (chartWidth / chartData.length)
              }px`,
              top: `${
                paddingTop +
                chartHeight -
                (chartData[hoveredIndex].value / maxValue) * chartHeight -
                15
              }px`,
            }}
          >
            <div className="text-cyan-300 font-bold">{chartData[hoveredIndex].label}</div>
            <div className="mt-0.5 text-white">{chartData[hoveredIndex].value.toLocaleString()} {valueSuffix}</div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-auto w-full select-none"
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="barHoverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Gridlines & Y-Ticks */}
          {Array.from({ length: yTicks + 1 }).map((_, tickIdx) => {
            const val = Math.round((maxValue / yTicks) * tickIdx);
            const y = paddingTop + chartHeight - (tickIdx / yTicks) * chartHeight;

            return (
              <g key={tickIdx} className="opacity-40">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-xs font-semibold"
                >
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* X Axis Line */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={svgWidth - paddingRight}
            y2={paddingTop + chartHeight}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Bars */}
          {chartData.map((d, idx) => {
            const colWidth = chartWidth / chartData.length;
            const barWidth = colWidth * 0.65;
            const x = paddingLeft + idx * colWidth + (colWidth - barWidth) / 2;
            const barHeight = (d.value / maxValue) * chartHeight;
            const y = paddingTop + chartHeight - barHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <g key={idx}>
                {/* Interactive Bar Column Area (invisible for larger hover target) */}
                <rect
                  x={paddingLeft + idx * colWidth}
                  y={paddingTop}
                  width={colWidth}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Actual Visual Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 3)} // minor height for 0/low value visibility
                  rx={6}
                  ry={6}
                  fill={isHovered ? "url(#barHoverGrad)" : "url(#barGrad)"}
                  className="transition-all duration-300 pointer-events-none"
                />

                {/* X Axis Label */}
                <text
                  x={x + barWidth / 2}
                  y={paddingTop + chartHeight + 24}
                  textAnchor="middle"
                  className={`text-[11px] font-semibold transition ${
                    isHovered ? "fill-slate-900 font-bold" : "fill-slate-400"
                  }`}
                >
                  {d.short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </article>
  );
}
