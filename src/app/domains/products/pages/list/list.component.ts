import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';

import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  cart = this.cartService.cart;
  total = this.cartService.total;

  ngOnInit(){
    this.getProducts(0);
    this.getCategories();
  }
 
  ngOnChanges(changes: SimpleChanges){
    const category_id = changes['category_id'];

    if(category_id){
      this.getProducts(category_id.currentValue);
    }
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

  private getProducts(category_id: number){
    this.productService.getProducts(category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    });
  }

  private getCategories(){
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: () => {

      }
    });
  }
}