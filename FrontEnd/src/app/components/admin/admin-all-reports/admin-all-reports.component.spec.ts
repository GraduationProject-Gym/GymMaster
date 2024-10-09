import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllReportsComponent } from './admin-all-reports.component';

describe('AdminAllReportsComponent', () => {
  let component: AdminAllReportsComponent;
  let fixture: ComponentFixture<AdminAllReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
