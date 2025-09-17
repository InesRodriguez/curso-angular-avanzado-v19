import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // About page - can be server-rendered for SEO
  { path: '', renderMode: RenderMode.Client },
  { path: 'about', renderMode: RenderMode.Prerender },

  {
    path: 'category/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'product/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'locations',
    renderMode: RenderMode.Client,
  },
  // Wildcard route for 404 pages
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
