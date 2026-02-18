import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPreguntaPage } from './add-pregunta.page';

describe('AddPreguntaPage', () => {
  let component: AddPreguntaPage;
  let fixture: ComponentFixture<AddPreguntaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
