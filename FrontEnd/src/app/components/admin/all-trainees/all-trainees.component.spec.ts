import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTraineesComponent } from './all-trainees.component';

describe('AllTraineesComponent', () => {
  let component: AllTraineesComponent;
  let fixture: ComponentFixture<AllTraineesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTraineesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
