import { Component, inject, input, linkedSignal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { MetaTagsService } from '@shared/meta-tags.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  readonly slug = input.required<string>();
  productRs = rxResource({
    request: () => ({
      slug: this.slug(),
    }),
    loader: ({ request }) => this.productService.getOneBySlug(request.slug),
  });
  $cover = linkedSignal({
    source: this.productRs.value,
    computation: (product, previous) => {
      if (product) {
        return product.images[0];
      }
      return previous;
    },
  });
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private metaTagsService = inject(MetaTagsService);

  constructor() {
    effect(() => {
      const product = this.productRs.value();
      if (product) {
        this.metaTagsService.setProductMetaTags(product);
      }
    });
  }

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.productRs.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
