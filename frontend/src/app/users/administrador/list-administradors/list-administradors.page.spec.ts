import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAdministradorPage } from './list-administradors.page';

describe('ListAdministradorPage', () => {
  let component: ListAdministradorPage;
  let fixture: ComponentFixture<ListAdministradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
