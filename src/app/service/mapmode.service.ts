import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapModeService {
  private modeSubject = new BehaviorSubject<'car' | 'bike'>('car');
  mode$ = this.modeSubject.asObservable();

  setMode(mode: 'car' | 'bike'): void {
    this.modeSubject.next(mode);
  }

  toggleMode(): void {
    const currentMode = this.modeSubject.value;
    this.modeSubject.next(currentMode === 'car' ? 'bike' : 'car');
  }
}
