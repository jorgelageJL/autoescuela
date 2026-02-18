import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListResultadosPage } from './list-resultados.page';

describe('ListResultadoPage', () => {
  let component: ListResultadosPage;
  let fixture: ComponentFixture<ListResultadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResultadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
