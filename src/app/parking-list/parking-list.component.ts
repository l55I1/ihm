import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../service/parking.service';
import { SearchbarService } from '../service/searchbar.service';
import { viewService } from "../service/view.service";
import { Location } from "../DTO/location";
import { ActivatedRoute } from '@angular/router';
import {Bike_locations} from "../DTO/bike_locations";
import {BikeParkingService} from "../service/bike-parking.service";
import {MapModeService} from "../service/mapmode.service";

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {
  isCar: boolean = false;
  searchText: string = '';
  carLocations: Location[] = [];
  bikeLocations: Bike_locations[] = [];
  constructor(private parkingService: ParkingService,
              private searchbarService: SearchbarService,
              private viewService: viewService,
              private route: ActivatedRoute,
              private bikeParkingService:BikeParkingService,
              private mapModeService:MapModeService

  ) { }

  onLocationClick(lat: number, lon: number): void {
    this.viewService.setLocation(lat, lon);
  }
  toggleDetails(item: any): void {
    item.showDetails = !item.showDetails;
  }

  ngOnInit(): void {
    this.mapModeService.mode$.subscribe((mode) => {
      this.isCar = mode === 'car';
      this.loadParkingData();
    });

    this.searchbarService.string$.subscribe((data: string) => {
      this.searchText = data.toLowerCase();
    });

    this.route.queryParams.subscribe((params) => {
      const searchText = params['q'];
      if (searchText) {
        this.searchText = searchText.toLowerCase();
        console.log('Query Parameter - Search Text:', searchText);
      }
    });
  }

  private async loadParkingData(): Promise<void> {
    try {
      if (this.isCar) {
        this.carLocations = await this.parkingService.fetchParkingLocations();
        this.carLocations.forEach(item => item.showDetails = false);
      } else {
        const bikeResponse = await this.bikeParkingService.fetchBikeParkingLots()
        this.bikeLocations = bikeResponse;
        this.bikeLocations.forEach(item => item.showDetails = false);
      }
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  }

  get filteredCarLocations(): Location[] {
    return this.carLocations.filter((location) =>
      location.name.toLowerCase().includes(this.searchText)
    );
  }

  get filteredBikeLocations(): Bike_locations[] {
    return this.bikeLocations.filter((location) =>
      (location.nom_voie|| 'Unnamed Bike Parking').toLowerCase().includes(this.searchText)
    );
  }
}
