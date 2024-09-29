import { TestBed } from '@angular/core/testing';

import { ShowClassService } from './show-class.service';

describe('ShowClassService', () => {
  let service: ShowClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
