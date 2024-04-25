import { TestBed } from '@angular/core/testing';

import { PetpalsApiService } from './petpals-api.service';

describe('CaregiversApiService', () => {
  let service: PetpalsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetpalsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
