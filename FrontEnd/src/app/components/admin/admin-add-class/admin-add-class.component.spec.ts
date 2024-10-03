import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddClassComponent } from './admin-add-class.component';

describe('AdminAddClassComponent', () => {
  let component: AdminAddClassComponent;
  let fixture: ComponentFixture<AdminAddClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
