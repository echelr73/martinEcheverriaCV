import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { AppTouchTooltipDirective } from './app-touch-tooltip.directive';

@Component({
  template: `<div matTooltip="Test tooltip" appAppTouchTooltip>Hover or Touch me</div>`
})
class TestComponent {}

describe('AppTouchTooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let tooltip: MatTooltip;
  let el: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppTouchTooltipDirective, TestComponent],
      imports: [MatTooltipModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    tooltip = fixture.debugElement.query(By.directive(AppTouchTooltipDirective)).injector.get(MatTooltip);
    el = fixture.debugElement.query(By.directive(AppTouchTooltipDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new AppTouchTooltipDirective(el, tooltip);
    expect(directive).toBeTruthy();
  });
});
