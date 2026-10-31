
import { Injectable, signal } from '@angular/core';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // Load saved favourites from localStorage
  private loadFavorites(): Product[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const saved = localStorage.getItem('shopease-favorites');
      return saved ? JSON.parse(saved) as Product[] : [];
    } catch {
      return [];
    }
  }

  // Store favourite products
  favorites = signal<Product[]>(this.loadFavorites());

  // Save favourites in localStorage
  private saveFavorites(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'shopease-favorites',
        JSON.stringify(this.favorites())
      );
    }
  }

  // Check whether a product is a favourite
  isFavorite(productId: number): boolean {
    return this.favorites().some(
      product => product.id === productId
    );
  }

  // Add or remove a product from favourites
  toggleFavorite(product: Product): void {

    if (this.isFavorite(product.id)) {
      this.favorites.update(products =>
        products.filter(item => item.id !== product.id)
      );
    } else {
      this.favorites.update(products => [
        ...products,
        product
      ]);
    }

    this.saveFavorites();
  }

  // Remove a product from favourites
  removeFavorite(productId: number): void {
    this.favorites.update(products =>
      products.filter(product => product.id !== productId)
    );

    this.saveFavorites();
  }
}
