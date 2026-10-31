
import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private favoritesService = inject(FavoritesService);

  // Live number of favourite products
  favoritesCount = computed(() =>
    this.favoritesService.favorites().length
  );
}
