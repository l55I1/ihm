import { Injectable } from '@angular/core';
import { Bike_locations, ParkingLotResponse } from "../DTO/bike_locations";

@Injectable({
  providedIn: 'root',
})
export class BikeParkingService {
  private apiUrl =
    'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/parkings_velos_sur_rennes_metropole/records?limit=20';

  constructor() {}

  /**
   * Fetches bike parking lot data from the API and maps it to ParkingLot DTO.
   * @returns Promise<Bike_locations[]> A list of bike parking lots.
   */
  async fetchBikeParkingLots(): Promise<Bike_locations[]> {
    try {
      const response = await fetch(this.apiUrl);
      const rawData = await response.json() as ParkingLotResponse;

      // Return the results directly since the DTO is already structured.
      return rawData.results.map((record) => ({
        geo_point_2d: record.geo_point_2d,
        geo_shape: record.geo_shape,
        gml_id: record.gml_id,
        id_parc_velo: record.id_parc_velo,
        nom: record.nom || 'Unknown',
        code_insee: record.code_insee,
        nom_commune: record.nom_commune,
        nom_voie: record.nom_voie,
        id_voie: record.id_voie,
        type: record.type,
        gestionnaire: record.gestionnaire,
        localisation: record.localisation,
        condition_acces: record.condition_acces,
        annee_mes: record.annee_mes || null,
        nb_support_std: record.nb_support_std,
        nb_support_cargo: record.nb_support_cargo || 0,
        nb_total_place: record.nb_total_place,
        date_maj: record.date_maj || null,
        commentaire: record.commentaire || null,
      }));
    } catch (error) {
      console.error('Error fetching bike parking data:', error);
      throw new Error('Failed to fetch bike parking data.');
    }
  }
}
