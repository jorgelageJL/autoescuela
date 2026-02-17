import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTestsPage } from './admin-tests.page';

describe('AdminTestsPage', () => {
  let component: AdminTestsPage;
  let fixture: ComponentFixture<AdminTestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
