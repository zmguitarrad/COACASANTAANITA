import { TestBed } from '@angular/core/testing';

import { PoaService } from './poa.service';

describe('PoaService', () => {
  let service: PoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
