import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdministradorPage } from './add-administrador.page';

describe('AddAdministradorPage', () => {
  let component: AddAdministradorPage;
  let fixture: ComponentFixture<AddAdministradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
