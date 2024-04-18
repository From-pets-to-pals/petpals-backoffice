import { TestBed } from '@angular/core/testing';

import { CaregiversApiService } from './caregivers-api.service';

describe('CaregiversApiService', () => {
  let service: CaregiversApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregiversApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
