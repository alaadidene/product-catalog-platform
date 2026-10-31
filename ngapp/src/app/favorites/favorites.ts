
import { Component, inject } from '@angular/core';
import { ProductCard } from '../shared/product-card/product-card';
import { FavoritesService } from '../favorites';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [ProductCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

  private favoritesService = inject(FavoritesService);

  // Get favourite products
  favorites = this.favoritesService.favorites;
}
