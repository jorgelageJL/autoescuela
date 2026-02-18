import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProfesorPage } from './list-profesors.page';

describe('ListProfesorPage', () => {
  let component: ListProfesorPage;
  let fixture: ComponentFixture<ListProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
