import { TestBed } from '@angular/core/testing';

import { viewService } from './view.service';

describe('ViewService', () => {
  let service: viewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(viewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
