import { TestBed } from '@angular/core/testing';

import { TraineeServicesService } from './sidebar.service';

describe('TraineeServicesService', () => {
  let service: TraineeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
