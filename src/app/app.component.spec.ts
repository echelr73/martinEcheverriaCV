import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show the scroll-to-top button when scrolled more than 100px', () => {
    // Simulamos el desplazamiento estableciendo scrollY a 101
    Object.defineProperty(window, 'scrollY', { value: 101, writable: true });
    component.onWindowScroll();
    expect(component.showButton).toBeTrue();
  });

  it('should hide the scroll-to-top button when scrolled less than 100px', () => {
    // Simulamos el desplazamiento estableciendo scrollY a 101
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    component.onWindowScroll();
    expect(component.showButton).toBeFalse();
  });

  it('should scroll to top when scrollToTop is called', () => {
    // Espiar el método window.scrollTo
    const scrollSpy = spyOn(window as any, 'scrollTo');
    component.scrollToTop();
    // Verificamos que scrollTo fue llamado con el objeto de opciones correcto
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
