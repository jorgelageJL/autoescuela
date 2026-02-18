import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTestsPage } from './list-tests.page';

describe('ListTestsPage', () => {
  let component: ListTestsPage;
  let fixture: ComponentFixture<ListTestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
