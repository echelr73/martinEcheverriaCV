import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CvService } from '../services/cv.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cvServiceMock: jasmine.SpyObj<CvService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],  // Asegurarte de importar los módulos necesarios
      declarations: [HeaderComponent],
      providers: [
        { provide: CvService, useValue: cvServiceMock } // Usar el mock para CvService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should call scrollToExperience when scrollToExperience is called', () => {
    const scrollToExperienceSpy = spyOn(component, 'scrollToExperience');
    component.scrollToExperience();
    expect(scrollToExperienceSpy).toHaveBeenCalled();
  });

  it('should call scrollToStudies when scrollToStudies is called', () => {
    const scrollToStudiesSpy = spyOn(component, 'scrollToStudies');
    component.scrollToStudies();
    expect(scrollToStudiesSpy).toHaveBeenCalled();
  });
});
