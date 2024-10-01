import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAllClassesComponent } from './trainee-all-classes.component';

describe('TraineeAllClassesComponent', () => {
  let component: TraineeAllClassesComponent;
  let fixture: ComponentFixture<TraineeAllClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeAllClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeAllClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
