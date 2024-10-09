import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMembershipComponent } from './admin-add-membership.component';

describe('AdminAddMembershipComponent', () => {
  let component: AdminAddMembershipComponent;
  let fixture: ComponentFixture<AdminAddMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddMembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
