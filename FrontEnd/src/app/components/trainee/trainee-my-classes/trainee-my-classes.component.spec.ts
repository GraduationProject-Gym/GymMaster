import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeMyClassesComponent } from './trainee-my-classes.component';

describe('TraineeMyClassesComponent', () => {
  let component: TraineeMyClassesComponent;
  let fixture: ComponentFixture<TraineeMyClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeMyClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeMyClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
