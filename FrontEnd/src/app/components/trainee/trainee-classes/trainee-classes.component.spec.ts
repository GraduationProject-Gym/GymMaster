import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeClassesComponent } from './trainee-classes.component';

describe('TraineeClassesComponent', () => {
  let component: TraineeClassesComponent;
  let fixture: ComponentFixture<TraineeClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
