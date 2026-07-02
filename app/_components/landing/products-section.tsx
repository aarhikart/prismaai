import { products } from "./landing-data";

export function ProductsSection() {
  return (
    <section id="products" className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">Products</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Premium AI products designed to perform in enterprise reality.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Each product focuses on a distinct operational challenge while sharing the same Prism.ai trust, orchestration, and deployment standards.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.name}
              id={product.id}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)] transition duration-300 hover:translate-y-[-4px] hover:border-cyan-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">{product.category}</p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                    {product.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{product.description}</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#082f49_0%,#06b6d4_100%)] text-lg font-semibold text-white shadow-[0_18px_40px_rgba(8,47,73,0.28)]">
                  AI
                </div>
              </div>

              <div className="mt-6 rounded-[26px] border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Explainable outputs", "Secure deployment", "Rapid integration"].map((feature) => (
                    <div key={feature} className="rounded-[18px] bg-white px-4 py-4 text-center text-sm font-medium text-slate-700">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
