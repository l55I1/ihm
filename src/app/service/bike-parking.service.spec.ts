import { TestBed } from '@angular/core/testing';

import { BikeParkingService } from './bike-parking.service';

describe('BikeParkingService', () => {
  let service: BikeParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
