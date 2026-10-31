
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from './models/product';
import { ProductsResponse } from './models/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = 'https://dummyjson.com/products';

  // Get all products
  getProducts(limit: number = 12, skip: number = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}?limit=${limit}&skip=${skip}`
    );
  }

  // Search products by name
  searchProducts(
    query: string,
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
    );
  }

  // Get all product categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiUrl}/category-list`
    );
  }

  // Get products by category
  getProductsByCategory(
    category: string,
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    );
  }

  // Get one product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );
  }
}
