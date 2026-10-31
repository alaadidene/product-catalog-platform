
import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../product';
import { Product } from '../models/product';
import { ProductCard } from '../shared/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  private service = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  products = signal<Product[]>([]);
  categories = signal<string[]>([]);

  loading = signal(true);
  error = signal('');

  // Search
  searchQuery = signal('');
  activeSearch = signal(false);

  // Category filter
  selectedCategory = signal('');

  // Pagination
  pageSize = 12;
  currentPage = signal(1);
  total = signal(0);

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize))
  );

  constructor() {

    // Load available categories
    this.service.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
        console.error('Unable to load product categories.');
      }
    });

    // Read search and category filters from URL
    this.route.queryParamMap.subscribe(params => {

      const query = params.get('q')?.trim() ?? '';
      const category = params.get('category') ?? '';

      this.searchQuery.set(query);
      this.activeSearch.set(query.length > 0);

      this.selectedCategory.set(
        query ? '' : category
      );

      this.currentPage.set(1);

      this.loadProducts();
    });
  }

  // Load products, search results or category products
  loadProducts() {

    this.loading.set(true);
    this.error.set('');

    const skip = (this.currentPage() - 1) * this.pageSize;
    const query = this.searchQuery();
    const category = this.selectedCategory();

    let request;

    if (query) {
      request = this.service.searchProducts(
        query,
        this.pageSize,
        skip
      );
    } else if (category) {
      request = this.service.getProductsByCategory(
        category,
        this.pageSize,
        skip
      );
    } else {
      request = this.service.getProducts(
        this.pageSize,
        skip
      );
    }

    request.subscribe({
      next: (data) => {
        this.products.set(data.products);
        this.total.set(data.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'Unable to load products. Please check your connection and try again.'
        );
        this.loading.set(false);
      }
    });
  }

  // Update the search input
  updateSearchQuery(event: Event) {

    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.searchQuery.set(target.value);
    }
  }

  // Search products
  searchProducts() {

    const query = this.searchQuery().trim();

    if (!query) {
      this.clearSearch();
      return;
    }

    this.router.navigate(['/products/search'], {
      queryParams: {
        q: query,
        category: null
      }
    });
  }

  // Clear search and category filters
  clearSearch() {

    this.searchQuery.set('');
    this.selectedCategory.set('');

    this.router.navigate(['/products'], {
      queryParams: {
        q: null,
        category: null
      }
    });
  }

  // Change selected category
  onCategoryChange(event: Event) {

    const target = event.target;

    if (target instanceof HTMLSelectElement) {

      const category = target.value;

      this.router.navigate(['/products'], {
        queryParams: {
          q: null,
          category: category || null
        }
      });
    }
  }

  // Go to the next page
  nextPage() {

    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.loadProducts();
    }
  }

  // Go to the previous page
  previousPage() {

    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.loadProducts();
    }
  }
}
