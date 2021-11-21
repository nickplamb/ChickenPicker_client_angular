import { TestBed } from '@angular/core/testing';

import { BreedDescriptionService } from './breed-description.service';

describe('BreedDescriptionService', () => {
  let service: BreedDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
