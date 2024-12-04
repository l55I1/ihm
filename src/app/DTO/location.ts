export interface Location {
  showDetails: boolean;
  id: string;
  name: string;
  status: string;
  maxCapacity: number;
  availableSpaces: number;
  latitude: number;
  longitude: number;
  tariffs: {
    day: {
      tarif_15: string;
      tarif_30: string;
      tarif_1h: string;
      tarif_1h30: string;
      tarif_2h: string;
      tarif_3h: string;
      tarif_4h: string;
    };
    night: {
      tarif_nuit_15: number;
      tarif_nuit_30: number;
      tarif_nuit_1h: number;
      tarif_nuit_1h30: number;
      tarif_nuit_2h: number;
      tarif_nuit_3h: number;
      tarif_nuit_4h: number;
    };
  };
  openingHours: string | null;
}
