import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  async getLocations(origin: string): Promise<Location[]> {
    const url = new URL(`${environment.apiUrl}/locations`);
    console.log('origin', origin);
    if (origin) {
      url.searchParams.set('origin', origin);
    }
    const response = await fetch(url.toString());
    return response.json();
  }
}
