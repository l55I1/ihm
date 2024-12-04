import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParkingService } from '../service/parking.service';
import { Bike_locations} from "../DTO/bike_locations";
import { SearchbarService } from '../service/searchbar.service';
import { viewService } from "../service/view.service";
import { Location } from '../DTO/location';
import * as L from 'leaflet';
import { marker, Marker } from 'leaflet';
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import {BikeParkingService} from "../service/bike-parking.service";
import {MapModeService} from "../service/mapmode.service";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private locationSubscription!: Subscription;
  searchText: string = '';
  isCar: boolean = false;

  constructor(
    private bikeParkingService:BikeParkingService,
    private parkingService: ParkingService,
    private searchbarService: SearchbarService,
    private viewService: viewService,
    private route: ActivatedRoute,
    private mapModeService:MapModeService
  ) {}

  ngOnInit(): void {
    this.initMap();

    this.mapModeService.mode$.subscribe((mode) => {
      this.isCar = mode === 'car';
      this.reloadMap();
    });
    this.route.queryParams.subscribe(params => {
      const isCar = params['isCar'] === 'true';
      this.mapModeService.setMode(isCar ? 'car' : 'bike');
    });

    this.locationSubscription = this.viewService.location$.subscribe(coords => {
      this.setMapCenter(coords.latitude, coords.longitude);
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([48.083328, -1.68333], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  reloadMap():void{
    this.clearMarkers();
    if(this.isCar){
      this.loadParkingLocations();
    }else{
      this.loadBikeParkingLocations();
    }
  }

  private clearMarkers(): void {
    this.map.eachLayer((layer) => {
      // Remove all layers except the tile layer
      if (layer instanceof Marker) {
        this.map.removeLayer(layer);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

  private async loadParkingLocations(): Promise<void> {
    const locations: Location[] = await this.parkingService.fetchParkingLocations();

    const filteredLocations = this.searchText
      ? locations.filter(location => location.name.toLowerCase().includes(this.searchText.toLowerCase()))
      : locations;

    filteredLocations.forEach(location => {
      const parkingMarker: Marker = marker([location.latitude, location.longitude])
        .addTo(this.map)
        .bindPopup(`
          <b>${location.name}</b><br>
          Status: ${location.status}<br>
          Free Spaces: ${location.availableSpaces}/${location.maxCapacity}<br>
          Tariffs (Day):<br>
          15 min: ${location.tariffs.day.tarif_15} €<br>
          30 min: ${location.tariffs.day.tarif_30} €<br>
          1 hr: ${location.tariffs.day.tarif_1h} €<br>
          2 hrs: ${location.tariffs.day.tarif_2h} €
        `);
    });
  }
  private async loadBikeParkingLocations(): Promise<void> {
    try {
      const parkingLots: Bike_locations[] = await this.bikeParkingService.fetchBikeParkingLots();
      parkingLots.forEach((parkingLot) => {
        const parkingMarker: Marker = marker([parkingLot.geo_point_2d.lat, parkingLot.geo_point_2d.lon])
          .addTo(this.map)
          .bindPopup(`
          <b>${parkingLot.nom || 'Unnamed Parking Lot'}</b><br>
          Commune: ${parkingLot.nom_commune}<br>
          Address: ${parkingLot.nom_voie}<br>
          Total Spaces: ${parkingLot.nb_total_place}<br>
          Standard Bike Racks: ${parkingLot.nb_support_std}<br>
          Cargo Bike Racks: ${parkingLot.nb_support_cargo || 'N/A'}<br>
          Access Conditions: ${parkingLot.condition_acces}<br>
          Managed By: ${parkingLot.gestionnaire}<br>
          Last Updated: ${parkingLot.date_maj || 'Unknown'}<br>
          Comments: ${parkingLot.commentaire || 'None'}
        `);
      });
    } catch (error) {
      console.error('Failed to load bike parking locations:', error);
    }
  }


  private setMapCenter(latitude: number, longitude: number, zoomLevel: number = 17): void {
    this.map.setView([latitude, longitude], zoomLevel);
  }

  sendString() {
    console.log('Sending string to service:', this.searchText);
    this.searchbarService.setString(this.searchText);
  }

  onToggleChange(event: any): void {
    const mode = event.value === 'bold' ? 'car' : 'bike';
    this.mapModeService.setMode(mode);
  }

}
