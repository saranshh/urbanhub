import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { map } from "rxjs/operators";
import { CartService } from "../../services/cart.service";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule, PricePipe],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>

      <div *ngIf="(cartItems$ | async)?.length === 0" class="text-center py-8">
        Your cart is empty
      </div>

      <div *ngIf="(cartItems$ | async)?.length as itemCount">
        <div class="space-y-4">
          <div
            *ngFor="let item of cartItems$ | async"
            class="border p-4 rounded"
          >
            <div class="flex justify-between items-center">
              <img
                [src]="item.product.image"
                [alt]="item.product.name"
                class="w-20 h-20 object-cover"
              />
              <div class="flex-grow px-4">
                <h3 class="font-semibold">{{ item.product.name }}</h3>
                <p class="text-gray-600">{{ item.product.price | price }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <input
                  type="number"
                  [value]="item.quantity"
                  (change)="updateQuantity(item.product.id, $event)"
                  min="1"
                  class="w-20 p-2 border rounded"
                />
                <button
                  (click)="removeItem(item.product.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-right">
          <p class="text-xl font-bold">
            Total: {{ (total$ | async) || 0 | price }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;
  total$ = this.cartItems$.pipe(
    map((items) =>
      (items ?? []).reduce(
        (total, item) =>
          total + (item.product.price ?? 0) * (item.quantity ?? 0),
        0 // Ensure the total is always a number
      )
    )
  );

  constructor(private cartService: CartService) {}

  updateQuantity(productId: number, event: Event) {
    const quantity = Number((event.target as HTMLInputElement).value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
