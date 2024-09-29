import { TestBed } from '@angular/core/testing';

import { TraineeServicesService } from './trainee-services.service';

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
