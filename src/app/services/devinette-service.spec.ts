import { TestBed } from '@angular/core/testing';

import { DevinetteService } from './devinette-service';

describe('DevinetteService', () => {
  let service: DevinetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevinetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
