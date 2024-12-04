import { Injectable } from '@angular/core';
import { Location } from '../DTO/location'

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/export-api-parking-citedia/records?limit=11';

  constructor() {}

  async fetchParkingLocations(): Promise<Location[]> {
    const response = await fetch(this.apiUrl);
    const data = await response.json();

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.key,
      status: item.status,
      maxCapacity: item.max,
      availableSpaces: item.free,
      latitude: item.geo.lat,
      longitude: item.geo.lon,
      tariffs: {
        day: {
          tarif_15: item.tarif_15,
          tarif_30: item.tarif_30,
          tarif_1h: item.tarif_1h,
          tarif_1h30: item.tarif_1h30,
          tarif_2h: item.tarif_2h,
          tarif_3h: item.tarif_3h,
          tarif_4h: item.tarif_4h,
        },
        night: {
          tarif_nuit_15: item.tarif_nuit_15,
          tarif_nuit_30: item.tarif_nuit_30,
          tarif_nuit_1h: item.tarif_nuit_1h,
          tarif_nuit_1h30: item.tarif_nuit_1h30,
          tarif_nuit_2h: item.tarif_nuit_2h,
          tarif_nuit_3h: item.tarif_nuit_3h,
          tarif_nuit_4h: item.tarif_nuit_4h,
        }
      },
      openingHours: item.orgahoraires || null,
    }));
  }
}
