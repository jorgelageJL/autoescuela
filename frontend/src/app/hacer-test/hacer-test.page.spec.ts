import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HacerTestPage } from './hacer-test.page';

describe('HacerTestPage', () => {
  let component: HacerTestPage;
  let fixture: ComponentFixture<HacerTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
