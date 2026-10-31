
"use client";

import Link from "next/link";
import ProductCard from "../products/ProductCard";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-[#f8f7f2]">

      {/* Hero section */}
      <section className="bg-[#efeee7] px-5 py-16 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#bd795c]">
          YOUR PERSONAL COLLECTION
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-[#294b3c] sm:text-5xl">
          Your <span className="text-[#bd795c]">Favourites</span>
        </h1>

        <p className="mt-4 text-sm text-[#777b70] sm:text-base">
          All the products you love, collected in one place.
        </p>
      </section>

      {/* Favorites content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">

        <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#294b3c]">
              Saved Products
            </h2>

            <p className="mt-1 text-sm text-[#777b70]">
              Your favourite products
            </p>
          </div>

          <span className="text-sm font-semibold text-[#294b3c]">
            {favorites.length} products
          </span>
        </div>

        {favorites.length > 0 ? (

          /* Display favorite products */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        ) : (

          /* Empty favorites */
          <div className="py-20 text-center">

            <div className="text-7xl text-[#bd795c]">
              ♡
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#294b3c]">
              No favourites yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777b70]">
              You haven't saved any products. Explore our catalogue
              and add products you love!
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex rounded-full bg-[#294b3c] px-7 py-3 font-semibold text-white transition hover:bg-[#bd795c]"
            >
              Explore products →
            </Link>

          </div>
        )}

      </section>
    </main>
  );
}
