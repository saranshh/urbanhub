import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(products.find(p => p.id === id));
  }

  getCategories(): string[] {
    return [...new Set(products.map(p => p.category))];
  }
}