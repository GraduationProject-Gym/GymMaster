import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReviewComponent } from './do-review.component';

describe('DoReviewComponent', () => {
  let component: DoReviewComponent;
  let fixture: ComponentFixture<DoReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
