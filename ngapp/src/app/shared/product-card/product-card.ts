
import { Component, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { FavoritesService } from '../../favorites';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  product = input.required<Product>();

  private favoritesService = inject(FavoritesService);

  // Check if this product is already a favourite
  isFavorite = computed(() =>
    this.favoritesService.isFavorite(this.product().id)
  );

  // Add or remove from favourites
  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.product());
  }
}
