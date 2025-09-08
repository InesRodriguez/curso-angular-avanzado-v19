import { Component, inject, input, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly category_id = input<string>();
  readonly slug = input<string>();

  categoriesResource = resource({
    loader: () => this.categoryService.getAllPromise(),
  });
  productsResource = rxResource({
    request: () => ({
      category_slug: this.slug(),
    }),
    loader: ({ request }) => this.productService.getProducts(request),
  });

  // Ya no se usa ngOnInit porque se usa rxResource para obtener los datos ylos estados se manejan con el rxResource
  /*ngOnInit() {
    this.getCategories();
  }*/

  // Ya no se usa ngOnChanges porque en la propiedad request de rxResource se observa el cambio de la propiedad slug y se ejecuta el loader para obtener los productos
  /* ngOnChanges() {
  this.getProducts();
  }*/

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    this.categoriesResource.set([]);
  }
  reloadCategories() {
    this.categoriesResource.reload();
  }

  reloadProducts() {
    this.productsResource.reload();
  }

  /*private getProducts() {
    this.productService.getProducts({category_id: this.category_id(), category_slug: this.slug()})
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
    })
  }*/
  /*private getCategories() {
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories.set(data);
      },
    })
  }*/
}
