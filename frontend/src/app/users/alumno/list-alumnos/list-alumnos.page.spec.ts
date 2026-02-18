import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAlumnosPage } from './list-alumnos.page';

describe('ListAlumnosPage', () => {
  let component: ListAlumnosPage;
  let fixture: ComponentFixture<ListAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
