
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Products } from './products/products';
import { ProductDetail } from './products/product-detail/product-detail';
import { Favorites } from './favorites/favorites';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'contact/:id', component: Contact },

  // Products catalogue
  { path: 'products', component: Products },

  // Product search (must be before :id)
  { path: 'products/search', component: Products },

  // Product details
  { path: 'products/:id', component: ProductDetail },
  
  { path: 'favorites', component: Favorites },
];
