const officeLocations = [
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    region: "Europe Hub",
    coordinates: { left: "18%", top: "24%" },
    color: "from-fuchsia-500 to-pink-500",
    glow: "rgba(236,72,153,0.42)",
    details: "Client strategy, partnerships, and enterprise delivery coordination.",
  },
  {
    id: "germany",
    city: "Germany",
    country: "Central Europe",
    region: "Operations Node",
    coordinates: { left: "49%", top: "32%" },
    color: "from-indigo-500 to-cyan-400",
    glow: "rgba(99,102,241,0.42)",
    details: "Regional workflow enablement, security programs, and solution operations.",
  },
  {
    id: "italy",
    city: "Italy",
    country: "Southern Europe",
    region: "Design Collaboration",
    coordinates: { left: "52%", top: "39%" },
    color: "from-sky-400 to-indigo-500",
    glow: "rgba(56,189,248,0.4)",
    details: "Creative production, product narratives, and multilingual campaign support.",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East Office",
    coordinates: { left: "58%", top: "43%" },
    color: "from-violet-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.42)",
    details: "Regional business development, partner enablement, and account expansion.",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    region: "Commercial Base",
    coordinates: { left: "66%", top: "52%" },
    color: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.45)",
    details: "Customer operations, account leadership, and cross-functional execution.",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    region: "Engineering Base",
    coordinates: { left: "69%", top: "57%" },
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(34,211,238,0.42)",
    details: "Product engineering, AI systems delivery, and platform architecture.",
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Southeast Asia",
    region: "APAC Office",
    coordinates: { left: "78%", top: "63%" },
    color: "from-emerald-400 to-cyan-400",
    glow: "rgba(52,211,153,0.42)",
    details: "Regional go-to-market execution, client operations, and expansion support.",
  },
];

function OfficePin({ office, index }) {
  return (
    <div
      className="jobs-map-pin group absolute z-20"
      style={{
        left: office.coordinates.left,
        top: office.coordinates.top,
        animationDelay: `${index * 0.45}s`,
      }}
    >
      <div
        className="jobs-map-popup pointer-events-none absolute bottom-[calc(100%+1.1rem)] left-1/2 w-[15rem] -translate-x-1/2 rounded-[24px] border border-white/12 bg-slate-950/92 p-4 text-left opacity-0 shadow-[0_24px_60px_rgba(2,6,23,0.5)] backdrop-blur-xl transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-[-8px] group-hover:opacity-100"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
          {office.region}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-white">
          {office.city}
        </h3>
        <p className="mt-1 text-sm text-slate-300">{office.country}</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">{office.details}</p>
      </div>

      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl transition duration-300 group-hover:scale-125" />

      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div
          className={`jobs-map-marker relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${office.color} text-white shadow-[0_18px_35px_rgba(15,23,42,0.35)] transition duration-300 group-hover:scale-110`}
          style={{ boxShadow: `0 14px 36px ${office.glow}` }}
        >
          <span
            className={`absolute left-1/2 top-[72%] h-4 w-4 -translate-x-1/2 rotate-45 rounded-[4px] bg-gradient-to-br ${office.color}`}
          />
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
            <div className="h-2 w-2 rounded-full bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DottedWorldMap() {
  return (
    <svg
      viewBox="0 0 1200 560"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="jobs-map-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.2" fill="rgba(103,232,249,0.62)" />
        </pattern>
        <linearGradient id="jobs-map-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.1)" />
          <stop offset="50%" stopColor="rgba(165,243,252,0.95)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.1)" />
        </linearGradient>
        <filter id="jobs-map-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity="0.95" filter="url(#jobs-map-soft-glow)">
        <path
          d="M74 183c22-32 60-52 115-60 44-7 84-24 122-48 22-14 54-21 92-20 29 1 61 6 96 14 32 8 67 12 104 11 52-1 104-11 156-30 29-10 59-16 88-16 42 0 82 9 120 26 47 22 95 35 143 38 46 3 87 16 121 39 34 23 51 53 52 91 2 39-12 70-41 95-29 25-68 39-118 42-44 3-88-2-131-15-33-10-65-12-94-7-39 7-74 21-105 42-42 29-87 43-133 41-40-1-77-14-110-38-25-18-52-28-82-31-40-4-79 4-118 24-55 28-113 41-174 40-59-1-111-16-156-43-40-24-84-38-134-42-37-3-67-16-90-38-23-23-33-51-31-86 3-28 13-53 31-74Z"
          fill="url(#jobs-map-dots)"
        />
        <path
          d="M292 264c23-11 47-14 73-8 22 5 39 18 51 40 13 23 16 47 9 73-8 31-23 61-44 89-18 25-29 55-35 91-6 37-15 55-29 55-18 0-32-16-42-49-9-27-9-58 0-93 6-25 2-52-10-80-14-31-21-58-20-81 1-17 7-29 17-37 10-8 20-12 30-13Z"
          fill="url(#jobs-map-dots)"
        />
        <path
          d="M505 177c18-15 43-24 74-27 35-4 66 5 93 25 20 16 36 38 47 65 12 29 16 61 13 94-3 34-12 66-28 95-18 32-42 56-72 72-29 15-60 19-92 11-27-6-49-22-67-46-22-30-33-67-35-111-2-38 5-73 21-104 12-23 28-42 46-57Z"
          fill="url(#jobs-map-dots)"
        />
        <path
          d="M667 132c26-23 56-36 92-39 37-4 78 0 122 10 52 12 108 18 168 17 53-1 103 7 151 23 46 16 78 40 95 73 10 18 9 37-2 57-12 22-31 38-57 49-27 11-53 19-79 24-27 5-49 16-67 32-20 17-36 39-47 67-12 29-34 44-64 46-34 2-63-9-86-33-19-19-30-43-33-72-2-21-7-43-15-64-8-22-22-36-42-43-28-11-61-11-99 1-38 12-74 13-108 2-26-8-43-25-50-50-8-25-2-49 18-71 13-15 31-29 53-41Z"
          fill="url(#jobs-map-dots)"
        />
        <path
          d="M972 340c21-10 40-11 58-2 17 8 29 23 36 45 7 23 6 46-2 68-8 22-18 45-32 68-13 20-28 31-47 34-20 3-37-4-52-21-17-20-26-46-28-78-2-28 3-53 15-74 12-20 29-34 52-40Z"
          fill="url(#jobs-map-dots)"
        />
      </g>

      <ellipse
        cx="600"
        cy="286"
        rx="516"
        ry="208"
        fill="none"
        stroke="url(#jobs-map-fade)"
        strokeWidth="2"
        opacity="0.45"
      />
    </svg>
  );
}

export default function JobsGlobalLocationsMap() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_40px_140px_rgba(2,6,23,0.55)] lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col justify-center rounded-[30px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Global Locations
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Connected teams across Europe, the Middle East, and Asia.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Hover across the network to explore where Prism.ai teams coordinate product delivery,
              customer operations, engineering, and regional growth.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {officeLocations.map((office) => (
                <div
                  key={office.id}
                  className="rounded-[22px] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.05]"
                >
                  <p className="font-semibold text-white">{office.city}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                    {office.country}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(248,250,252,0.96)_0%,rgba(224,242,254,0.94)_100%)] p-4 shadow-[0_30px_80px_rgba(8,47,73,0.24)] sm:p-6">
            <div className="jobs-world-map relative aspect-[1.9/1] overflow-hidden rounded-[26px] border border-cyan-100 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)] p-4 sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_44%)]" />
              <DottedWorldMap />
              {officeLocations.map((office, index) => (
                <OfficePin key={office.id} office={office} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
