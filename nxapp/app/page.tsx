
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Child from "@/components/Child";

export default function Home() {
  const router = useRouter();

  const [states] = useState(["Tozeur", "Gafsa", "Tunis"]);
  const [chosen, setChosen] = useState("");

  function gotoLogin() {
    router.push("/login");
  }

  function gotoContact() {
    router.push("/contact");
  }

  function gotoProducts() {
    router.push("/products");
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2]">

      {/* Welcome section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">

        {/* Text */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#bd795c]">
            Welcome to Maison
          </p>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-[#294b3c] sm:text-6xl">
            Discover things
            <span className="block text-[#bd795c]">
              worth loving.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-[#777b70]">
            Explore our carefully selected collection of products.
            Find something special and enjoy discovering your next
            favourite.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={gotoProducts}
              className="rounded-full bg-[#294b3c] px-7 py-3.5 font-semibold text-white transition hover:bg-[#bd795c]"
            >
              Explore products →
            </button>

            <button
              onClick={gotoContact}
              className="rounded-full border border-[#294b3c] px-7 py-3.5 font-semibold text-[#294b3c] transition hover:bg-[#294b3c] hover:text-white"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* Decorative visual */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#efeee7] p-8 sm:min-h-[440px]">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d9cbb8]/50" />
          <div className="absolute -bottom-20 -left-12 h-72 w-72 rounded-full bg-[#d9a58e]/30" />

          <div className="relative z-10 max-w-sm text-center">
            <span className="text-7xl">✦</span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-[#bd795c]">
              The Maison collection
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-snug text-[#294b3c]">
              A little something for every day.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#777b70]">
              Thoughtfully selected. Ready to be discovered.
            </p>
          </div>
        </div>

      </section>

      {/* Features section */}
      <section className="border-y border-[#e9e6dc] bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">

          <div>
            <span className="text-2xl text-[#bd795c]">✧</span>
            <h3 className="mt-3 font-bold text-[#294b3c]">
              Curated collection
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#777b70]">
              Explore a variety of products in one place.
            </p>
          </div>

          <div>
            <span className="text-2xl text-[#bd795c]">◇</span>
            <h3 className="mt-3 font-bold text-[#294b3c]">
              Easy discovery
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#777b70]">
              Find product information and details with ease.
            </p>
          </div>

          <div>
            <span className="text-2xl text-[#bd795c]">♡</span>
            <h3 className="mt-3 font-bold text-[#294b3c]">
              Here to help
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#777b70]">
              Have questions? Our contact page is ready for you.
            </p>
          </div>

        </div>
      </section>

      {/* Location selection */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl bg-[#efeee7] p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bd795c]">
            Explore your selection
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#294b3c]">
            Choose your location
          </h2>

          <p className="mt-2 text-sm text-[#777b70]">
            Select a state from the list.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Child states={states} onSelect={setChosen} />

            <p className="text-sm text-[#777b70]" aria-live="polite">
              Selected:{" "}
              <strong className="text-[#294b3c]">
                {chosen || "No location selected"}
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="bg-[#294b3c] px-5 py-14 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9a58e]">
          Start exploring
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Find your next favourite.
        </h2>

        <button
          onClick={gotoProducts}
          className="mt-7 rounded-full bg-[#d9a58e] px-7 py-3.5 font-semibold text-[#294b3c] transition hover:bg-white"
        >
          Browse the collection →
        </button>
      </section>

    </main>
  );
}
