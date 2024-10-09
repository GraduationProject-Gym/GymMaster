import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTraineesAttendanceComponent } from './admin-trainees-attendance.component';

describe('AdminTraineesAttendanceComponent', () => {
  let component: AdminTraineesAttendanceComponent;
  let fixture: ComponentFixture<AdminTraineesAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTraineesAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTraineesAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
