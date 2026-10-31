
import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../product';
import { Product } from '../../models/product';
import { FavoritesService } from '../../favorites';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  private service = inject(ProductService);
  private route = inject(ActivatedRoute);
  private favoritesService = inject(FavoritesService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');

  // Check whether the current product is a favourite
  isFavorite = computed(() => {
    const currentProduct = this.product();

    return currentProduct
      ? this.favoritesService.isFavorite(currentProduct.id)
      : false;
  });

  // Add or remove the current product from favourites
  toggleFavorite(): void {
    const currentProduct = this.product();

    if (currentProduct) {
      this.favoritesService.toggleFavorite(currentProduct);
    }
  }

  constructor() {

    this.route.paramMap.pipe(

      switchMap(params => {

        const id = Number(params.get('id'));

        this.loading.set(true);
        this.error.set('');
        this.product.set(null);

        if (!Number.isInteger(id) || id <= 0) {
          this.error.set('Invalid product ID');
          this.loading.set(false);
          return of(null);
        }

        return this.service.getProduct(id).pipe(
          catchError(() => {
            this.error.set('Unable to load product details.');
            return of(null);
          })
        );

      })

    ).subscribe(data => {

      if (data) {
        this.product.set(data);
      }

      this.loading.set(false);

    });

  }
}
