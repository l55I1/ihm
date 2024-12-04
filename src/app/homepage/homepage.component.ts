import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  searchQuery: string = '';
  carSelected: boolean = false;
  bikeSelected: boolean = false;
  selectedFontStyle: string = ''; 
  

  constructor(private router: Router) {}

  onSearch() {
    console.log('Search query:', this.searchQuery);
  }

  navigateToMapPage() {
    this.router.navigate(['/map'], { queryParams: { q: this.searchQuery, isCar: this.carSelected } });
  }

  onToggleChange(event: any) {
    this.carSelected = event.value === 'bold';
    console.log('carSelected:', this.carSelected);
  }
  

}
