import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoryAttendanceComponent } from './admin-history-attendance.component';

describe('AdminHistoryAttendanceComponent', () => {
  let component: AdminHistoryAttendanceComponent;
  let fixture: ComponentFixture<AdminHistoryAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHistoryAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHistoryAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
