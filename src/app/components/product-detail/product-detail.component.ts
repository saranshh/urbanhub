import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Product } from "../../models/product.model";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, PricePipe],
  template: `
    <div class="container mx-auto p-4" *ngIf="product">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="relative group">
            <img
              [src]="product.image"
              [alt]="product.name"
              class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
            ></div>
          </div>

          <div class="p-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ product.name }}
            </h1>
            <p class="text-gray-500 mb-6 text-lg leading-relaxed">
              {{ product.description }}
            </p>
            <p class="text-3xl font-bold text-gray-600 mb-6">
              {{ product.price | price }}
            </p>
            <div class="mb-8">
              <span
                class="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700"
              >
                {{ product.category }}
              </span>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center border rounded-lg">
                <button
                  (click)="decrementQuantity()"
                  class="px-4 py-2 text-xl hover:bg-gray-100 transition-colors"
                  [disabled]="quantity <= 1"
                >
                  -
                </button>
                <span class="px-4 py-2 border-x text-lg">{{ quantity }}</span>
                <button
                  (click)="incrementQuantity()"
                  class="px-4 py-2 text-xl hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                (click)="addToCart()"
                class="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 relative overflow-hidden"
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
      </div>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity = 1;
  isAdding = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      const id = Number(idParam);
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.isAdding = true;
      setTimeout(() => {
        this.isAdding = false;
        this.quantity = 1;
      }, 1000);
    }
  }
}
