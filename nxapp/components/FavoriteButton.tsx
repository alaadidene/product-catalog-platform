
"use client";

import type { Product } from "../types/product";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteButtonProps {
  product: Product;
  variant?: "card" | "detail";
}

export default function FavoriteButton({
  product,
  variant = "card",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(product)}
      aria-label={
        active ? "Remove from favourites" : "Add to favourites"
      }
      aria-pressed={active}
      className={
        variant === "card"
          ? `absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-110 ${
              active ? "text-[#bd795c]" : "text-[#777b70]"
            }`
          : `inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${
              active
                ? "border-[#bd795c] bg-[#bd795c] text-white"
                : "border-[#294b3c] bg-transparent text-[#294b3c] hover:bg-[#294b3c] hover:text-white"
            }`
      }
    >
      {variant === "card" ? (
        active ? "♥" : "♡"
      ) : (
        <>
          <span className="text-lg">{active ? "♥" : "♡"}</span>
          {active ? "Remove from favourites" : "Add to favourites"}
        </>
      )}
    </button>
  );
}
