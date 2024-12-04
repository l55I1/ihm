export interface GeoPoint2D {
  lon: number;
  lat: number;
}

export interface GeoShape {
  type: string;
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  properties: Record<string, any>;
}

export interface Bike_locations {
  geo_point_2d: GeoPoint2D;
  geo_shape: GeoShape;
  gml_id: string;
  id_parc_velo: number;
  nom: string | null;
  code_insee: number;
  nom_commune: string;
  nom_voie: string;
  id_voie: number;
  type: string;
  gestionnaire: string;
  localisation: string;
  condition_acces: string;
  annee_mes: number | null;
  nb_support_std: number;
  nb_support_cargo: number | null;
  nb_total_place: number;
  date_maj: string | null;
  commentaire: string | null;
  showDetails?: boolean;
}

export interface ParkingLotResponse {
  total_count: number;
  results: Bike_locations[];
}
