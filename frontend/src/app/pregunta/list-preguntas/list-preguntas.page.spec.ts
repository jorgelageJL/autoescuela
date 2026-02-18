import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPreguntasPage } from './list-preguntas.page';

describe('ListPreguntasPage', () => {
  let component: ListPreguntasPage;
  let fixture: ComponentFixture<ListPreguntasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
