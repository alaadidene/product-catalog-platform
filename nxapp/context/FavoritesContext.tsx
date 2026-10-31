
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

interface FavoritesContextType {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved favourites after the component mounts
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("maison-favorites");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites) as Product[]);
      }
    } catch {
      console.error("Unable to load favourites.");
    }

    setIsLoaded(true);
  }, []);

  // Save favourites whenever the list changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "maison-favorites",
        JSON.stringify(favorites)
      );
    }
  }, [favorites, isLoaded]);

  function isFavorite(productId: number): boolean {
    return favorites.some((product) => product.id === productId);
  }

  function toggleFavorite(product: Product): void {
    setFavorites((current) => {
      const alreadyFavorite = current.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return current.filter((item) => item.id !== product.id);
      }

      return [...current, product];
    });
  }

  function removeFavorite(productId: number): void {
    setFavorites((current) =>
      current.filter((product) => product.id !== productId)
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
