import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routes } from "./app/app.routes";
import { map } from "rxjs/operators";
import { CartService } from "./app/services/cart.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-black text-white sticky top-0 z-50 pt-1">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-12">
            <a routerLink="/" class="text-2xl font-bold tracking-tight">UrbanHub</a>
            <div class="hidden md:flex space-x-8">
              <a routerLink="/" class="text-sm hover:text-gray-300 transition-colors"
                >NEW ARRIVALS</a
              > 
              <a href="#products" class="text-sm hover:text-gray-300 transition-colors"
                >COLLECTIONS</a
              >
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <a routerLink="/cart" class="relative group">
              <button class="hover:text-gray-300 transition-colors relative">
                <span class="sr-only">Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div
                  *ngIf="cartItemCount$ | async as count"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform"
                >
                  {{ count }}
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class App {
  cartItemCount$ = this.cartService.cartItems$.pipe(
    map((items: any[]) =>
      (items ?? []).reduce(
        (total: number, item: any) => total + (item.quantity ?? 0),
        0
      )
    )
  );

  constructor(private cartService: CartService) {}
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
