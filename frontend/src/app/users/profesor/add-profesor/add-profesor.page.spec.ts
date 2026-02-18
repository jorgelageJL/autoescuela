import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProfesorPage } from './add-profesor.page';

describe('AddProfesorPage', () => {
  let component: AddProfesorPage;
  let fixture: ComponentFixture<AddProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
