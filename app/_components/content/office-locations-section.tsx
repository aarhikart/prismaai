const officeLocations = [
  {
    country: "Singapore",
    company: "Prisma AI Corporation Pte. Ltd.",
    address: "10 Ubi Crescent #04-25 Ubi TechPark (Lobby B) Singapore 408564",
    phone: "+65 9642 9199",
  },
  {
    country: "Germany",
    company: "Prisma",
    address: "Singerstrasse, 14, 10243, Berlin, Germany",
  },
  {
    country: "Dubai",
    company: "Prisma",
    address: "Unit no. 4 / 403 One Business Bay by Omniyat, Burj Khalifa",
  },
  {
    country: "Italy",
    company: "Software Products Italia S. R. L.",
    address: "Via Arno, 108, 50019 Sesto Fiorentino (FI), Italy",
    phone: "+39 055 33651",
  },
  {
    country: "London",
    company: "Prisma AI Limited",
    address: "134 Buckingham Palace Road, London, England, SW1W 9SA",
  },
  {
    country: "India",
    company: "Prisma Global Limited (Mumbai)",
    address: "5th floor, STAR Hub 2, Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400059.",
    phone: "022-45031100",
    secondaryOffice: {
      company: "Prisma Global Limited (Bengaluru)",
      address: "08-112, Block D3, Manyata Tech Park Rd, Thannisandra, Bengaluru 560045",
    },
  },
];

export function OfficeLocationsSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.45)] sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Global Offices</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Contact Prisma teams across key operating regions.
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            Use these office details when you need local coordination, in-person discussions, or regional commercial follow-up.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {officeLocations.map((office) => (
            <article
              key={office.country}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_50px_rgba(2,6,23,0.28)] backdrop-blur"
            >
              <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">
                {office.country}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                {office.company}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{office.address}</p>
              {office.phone ? <p className="mt-4 text-sm font-semibold text-cyan-200">Phone: {office.phone}</p> : null}

              {office.secondaryOffice ? (
                <div className="mt-6 rounded-[22px] border border-white/10 bg-slate-950/45 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Additional Office</p>
                  <p className="mt-3 text-sm font-semibold text-white">{office.secondaryOffice.company}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{office.secondaryOffice.address}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
