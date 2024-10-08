import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExersiseComponent } from './all-exersise.component';

describe('AllExersiseComponent', () => {
  let component: AllExersiseComponent;
  let fixture: ComponentFixture<AllExersiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllExersiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllExersiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
