import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAlumnoPage } from './add-alumno.page';

describe('AddAlumnoPage', () => {
  let component: AddAlumnoPage;
  let fixture: ComponentFixture<AddAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
