
"use client";

import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e6dc] bg-[#f8f7f2]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

        {/* Brand */}
        <Link href="/" className="group flex flex-col">
          <span className="text-2xl font-extrabold tracking-tight text-[#294b3c]">
            Maison<span className="text-[#bd795c]">.</span>
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#777b70]">
            Curated collection
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">

          <Link
            href="/"
            className="text-sm font-medium text-[#777b70] transition hover:text-[#bd795c]"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-semibold text-[#294b3c] transition hover:text-[#bd795c]"
          >
            Products
          </Link>

          {/* Favorites */}
          <Link
            href="/favorites"
            className="relative text-sm font-medium text-[#777b70] transition hover:text-[#bd795c]"
          >
            ♡ Favorites

            {favorites.length > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#bd795c] px-1.5 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            href="/contact"
            className="hidden text-sm font-medium text-[#777b70] transition hover:text-[#bd795c] sm:block"
          >
            Contact
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-[#294b3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#bd795c]"
          >
            Login
          </Link>

        </div>
      </nav>
    </header>
  );
}
