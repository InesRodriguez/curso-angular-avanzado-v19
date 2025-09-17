import { Injectable, inject } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Product } from './models/product.model';
import { environment } from '@env/environment';

export interface PageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

const DEFAULT_META_VALUES = {
  type: 'website',
  description: 'product description',
  image: '',
  url: '',
} as const;

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  generateBasicMetaTags(description: string): MetaDefinition[] {
    return [
      {
        name: 'description',
        content: description ?? DEFAULT_META_VALUES.description,
      },
    ];
  }

  generateOpenGraphTags(data: PageMetaData): MetaDefinition[] {
    return [
      {
        property: 'og:title',
        content: data.title ?? '',
      },
      {
        property: 'og:description',
        content: data.description ?? DEFAULT_META_VALUES.description,
      },
      {
        property: 'og:image',
        content: data.image ?? DEFAULT_META_VALUES.image,
      },
      {
        property: 'og:url',
        content: data.url ?? DEFAULT_META_VALUES.url,
      },
      {
        property: 'og:type',
        content: data.type ?? DEFAULT_META_VALUES.type,
      },
    ];
  }
  generateMetaTagsFromPageData(pageData: PageMetaData): MetaDefinition[] {
    return [
      ...this.generateBasicMetaTags(pageData.description),
      ...this.generateOpenGraphTags(pageData),
    ];
  }
  generateProductMetaTags(product: Product): MetaDefinition[] {
    const pageData: PageMetaData = {
      title: product.title,
      description: product.description,
      image: product.images[0],
      url: `${environment.domain}/product/${product.slug}`,
      type: 'product',
    };

    return this.generateMetaTagsFromPageData(pageData);
  }

  applyMetaTags(metaTags: MetaDefinition[]): void {
    metaTags.forEach(tag => {
      this.metaService.updateTag(tag);
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setProductMetaTags(product: Product): void {
    this.setTitle(product.title);
    const metaTags = this.generateProductMetaTags(product);
    this.applyMetaTags(metaTags);
  }
}
