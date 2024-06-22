import { TestBed } from '@angular/core/testing';

import { PetPalsApiService } from './pet-pals-api.service';

describe('CaregiversApiService', () => {
  let service: PetPalsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetPalsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
