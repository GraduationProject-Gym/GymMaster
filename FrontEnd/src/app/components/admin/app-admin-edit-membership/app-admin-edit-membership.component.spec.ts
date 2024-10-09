import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminEditMembershipComponent } from './app-admin-edit-membership.component';

describe('AppAdminEditMembershipComponent', () => {
  let component: AppAdminEditMembershipComponent;
  let fixture: ComponentFixture<AppAdminEditMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAdminEditMembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdminEditMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
