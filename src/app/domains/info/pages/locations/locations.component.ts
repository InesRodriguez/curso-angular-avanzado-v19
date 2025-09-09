import {
  afterNextRender,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { LocationsService } from '@shared/services/locations.service';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
})
export default class LocationsComponent {
  private locationsService = inject(LocationsService);
  $origin = signal('');
  constructor() {
    afterNextRender(() => {
      console.log('afterNextRender entrò');
      navigator.geolocation.getCurrentPosition(position => {
        console.log('position', position);
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    });
  }

  locationsResource = resource({
    request: () => ({ origin: this.$origin() }),
    loader: async ({ request }) =>
      this.locationsService.getLocations(request.origin),
  });
}
