import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditClassComponent } from './admin-edit-class.component';

describe('AdminEditClassComponent', () => {
  let component: AdminEditClassComponent;
  let fixture: ComponentFixture<AdminEditClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
