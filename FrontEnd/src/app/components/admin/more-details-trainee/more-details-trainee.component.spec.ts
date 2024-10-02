import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsTraineeComponent } from './more-details-trainee.component';

describe('MoreDetailsTraineeComponent', () => {
  let component: MoreDetailsTraineeComponent;
  let fixture: ComponentFixture<MoreDetailsTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreDetailsTraineeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreDetailsTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
