import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { ProductCardComponent } from "../product-card/product-card.component";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, PricePipe],
  template: `
    <!-- Hero Section -->
    <div class="bg-black text-white">
      <div class="container mx-auto px-6 py-32">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div>
              <span
                class="inline-block px-4 py-1 border border-white/20 text-xs tracking-wider mb-4"
              >
                NEW SEASON 2025
              </span>
              <h1
                class="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              >
                Elevate Your
                <span class="block">Style Game</span>
              </h1>
            </div>
            <p class="text-gray-400 text-lg leading-relaxed max-w-md">
              Discover our curated collection of premium essentials designed for
              the modern lifestyle.
            </p>
            <div class="flex gap-4">
              <a href="#products">
                <button
                  class="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </button>
              </a>
              <button
                class="border border-white/20 px-8 py-3 font-medium hover:bg-white hover:text-black transition-all"
              >
                Explore
              </button>
            </div>
          </div>
          <div class="hidden md:block relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"
            ></div>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000"
              alt="Fashion Model"
              class="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-16">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <span class="material-icons text-3xl mb-4">🚚</span>
            <h3 class="font-medium mb-2">Free Shipping</h3>
            <p class="text-sm text-gray-600">On orders over ₹150</p>
          </div>
          <div class="text-center">
            <span class="material-icons text-3xl mb-4">⚡</span>
            <h3 class="font-medium mb-2">Express Delivery</h3>
            <p class="text-sm text-gray-600">1-2 business days</p>
          </div>
          <div class="text-center">
            <span class="material-icons text-3xl mb-4">💳</span>
            <h3 class="font-medium mb-2">Secure Payment</h3>
            <p class="text-sm text-gray-600">100% secure checkout</p>
          </div>
          <div class="text-center">
            <span class="material-icons text-3xl mb-4">↩️</span>
            <h3 class="font-medium mb-2">Easy Returns</h3>
            <p class="text-sm text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>

    <div id="products" class="bg-gray-50 pt-8">
      <div class="pt-12 pb-8 flex justify-center text-3xl font-semibold">
        Our Products
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-gray-50 py-6">
      <div class="container mx-auto px-6 ">
        <!-- Search and Filter Section -->
        <div class="bg-white p-6 mb-12 shadow-sm rounded-md">
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Search</label
              >
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Search products..."
                class="w-full pl-2 pr-4 py-2 border-[1px] rounded-md border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Category</label
              >
              <select
                [(ngModel)]="selectedCategory"
                class="w-full border-gray-200 border-[1px] pl-2 pr-4 py-2 rounded-md focus:border-gray-900 focus:ring-0 transition-colors"
              >
                <option value="">All Categories</option>
                <option *ngFor="let category of categories" [value]="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Sort By</label
              >
              <select
                [(ngModel)]="sortBy"
                class="w-full border-[1px] pl-2 pr-4 py-2 rounded-md border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div class="flex flex-wrap gap-2 mb-8" *ngIf="hasActiveFilters">
          <span
            *ngIf="selectedCategory"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-900 text-white"
          >
            {{ selectedCategory }}
            <button
              (click)="selectedCategory = ''"
              class="ml-2 hover:text-gray-300 focus:outline-none"
            >
              ×
            </button>
          </span>
          <span
            *ngIf="searchTerm"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-900 text-white"
          >
            "{{ searchTerm }}"
            <button
              (click)="searchTerm = ''"
              class="ml-2 hover:text-gray-300 focus:outline-none"
            >
              ×
            </button>
          </span>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <app-product-card
            *ngFor="let product of paginatedProducts"
            [product]="product"
          ></app-product-card>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center mt-16 mb-10">
          <button
            class="px-4 py-2 text-sm border rounded-l-md"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)"
          >
            Previous
          </button>
          <div class="flex">
            <button
              *ngFor="let page of [].constructor(totalPages); let i = index"
              class="px-4 py-2 text-sm border"
              [class.bg-gray-900]="currentPage === i + 1"
              [class.text-white]="currentPage === i + 1"
              [class.bg-gray-100]="currentPage !== i + 1"
              (click)="goToPage(i + 1)"
            >
              {{ i + 1 }}
            </button>
          </div>
          <button
            class="px-4 py-2 text-sm border rounded-r-md"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)"
          >
            Next
          </button>
        </div>

        <!-- Empty State -->
        <div
          *ngIf="filteredProducts.length === 0"
          class="text-center py-16 bg-white"
        >
          <span class="material-icons text-4xl text-gray-400 mb-4">🔍</span>
          <h3 class="text-lg font-medium mb-2">No Products Found</h3>
          <p class="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="bg-black text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold mb-4">Join Our Newsletter</h2>
        <p class="text-gray-400 mb-8 max-w-md mx-auto">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <div class="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 bg-transparent border border-white/20 px-4 py-2 focus:border-white focus:ring-0 transition-colors placeholder-gray-500"
          />
          <button
            class="bg-white text-black px-8 py-2 font-medium hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white pt-16 pb-8">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div>
            <h3 class="text-xl font-bold mb-4 tracking-tight">UrbanHub</h3>
            <p class="text-gray-400 mb-6 leading-relaxed">
              Curating premium fashion essentials for the modern individual.
              Quality, style, and sustainability combined.
            </p>
            <div class="flex space-x-6">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <span class="material-icons">facebook</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <span class="material-icons">twitter</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <span class="material-icons">instagram</span>
              </a>
            </div>
          </div>

          <!-- Shop -->
          <div>
            <h3 class="text-sm font-medium mb-4 tracking-wider">SHOP</h3>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >New Arrivals</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Best Sellers</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Coming Soon</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Sale</a
                >
              </li>
            </ul>
          </div>

          <!-- Help -->
          <div>
            <h3 class="text-sm font-medium mb-4 tracking-wider">HELP</h3>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Shipping</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Returns</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Sizing</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white text-sm transition-colors"
                  >Contact Us</a
                >
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-sm font-medium mb-4 tracking-wider">CONTACT</h3>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-center text-sm">
                <span class="material-icons mr-2 text-lg">📍</span>
                Koramangala, Bangalore 560095
              </li>
              <li class="flex items-center text-sm">
                <span class="material-icons mr-2 text-lg">📞</span>
                +1 234 567 8900
              </li>
              <li class="flex items-center text-sm">
                <span class="material-icons mr-2 text-lg">✉️</span>
                hello&#64;urbanhub.com
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-white/10 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">
              © 2025 SHOPHUB. All rights reserved.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
                >Privacy</a
              >
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
                >Terms</a
              >
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors"
                >Cookies</a
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  searchTerm = "";
  selectedCategory = "";
  sortBy = "featured";

  // Pagination properties
  currentPage = 1;
  productsPerPage = 8;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.categories = this.productService.getCategories();
  }

  get filteredProducts(): Product[] {
    return this.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  get sortedProducts(): Product[] {
    return [...this.filteredProducts].sort((a, b) => {
      switch (this.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  // Paginated products
  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.sortedProducts.slice(startIndex, endIndex);
  }

  // Total pages
  get totalPages(): number {
    return Math.ceil(this.sortedProducts.length / this.productsPerPage);
  }

  // Check if there are active filters
  get hasActiveFilters(): boolean {
    return Boolean(this.searchTerm || this.selectedCategory);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
