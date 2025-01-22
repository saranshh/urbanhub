import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CommonModule, RouterModule, PricePipe],
  template: `
    <div
      class="border rounded-lg overflow-hidden hover:shadow-xl h-96 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
    >
      <!-- Image Section -->
      <div class="relative group h-40 flex-shrink-0">
        <img
          [src]="product.image"
          [alt]="product.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
        ></div>
      </div>

      <!-- Content Section -->
      <div class="p-4 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">
          {{ product.name }}
        </h3>
        <p class="text-xl font-bold text-gray-600 my-2">
          {{ product.price | price }}
        </p>
        <p class="text-sm text-gray-500 mb-4">{{ product.category }}</p>

        <!-- Button Section -->
        <div class="mt-auto flex justify-between items-center gap-2">
          <button
            [routerLink]="['/product', product.id]"
            class="flex-1 border-[1px] bg-white text-gray px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            View Details
          </button>
          <button
            (click)="addToCart()"
            class="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
            [class.pointer-events-none]="isAdding"
          >
            <span [class.opacity-0]="isAdding">Add to Cart</span>
            <span
              *ngIf="isAdding"
              class="absolute inset-0 flex items-center justify-center"
            >
              Added! ✓
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
  isAdding = false;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.isAdding = true;
    setTimeout(() => {
      this.isAdding = false;
    }, 1000);
  }
}
