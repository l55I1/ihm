import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  private stringSubject = new BehaviorSubject<string>('');
  
  // Expose the string as an Observable
  string$ = this.stringSubject.asObservable();

  constructor() {}

  // Method to set the string value
  setString(value: string) {
    console.log('Setting string value:', value);
    this.stringSubject.next(value);
  }

  // Method to get the current value of the string
  getString(): string {
    return this.stringSubject.value;
  }

}
