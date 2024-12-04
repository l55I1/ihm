import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class viewService {
  private locationSubject = new Subject<{ latitude: number; longitude: number }>();
  location$ = this.locationSubject.asObservable();

  setLocation(latitude: number, longitude: number): void {
    this.locationSubject.next({ latitude, longitude });
  }
}
