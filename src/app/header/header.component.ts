import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit {

  public isMenuOpen = false;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToExperience() {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.toggleMenu();
    }
  }

  scrollToStudies() {
    const element = document.getElementById('education');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.toggleMenu();
    }
  }

  scrollToCertifications() {
    const element = document.getElementById('certifications');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.toggleMenu();
    }
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.toggleMenu();
    }
  }
    
}
