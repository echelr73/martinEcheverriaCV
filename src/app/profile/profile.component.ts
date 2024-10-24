import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit {
  name: any;
  role: any;
  description: any;
  profile_strengths: any;

  // Aquí seleccionamos el componente 'experience' por su id
  @ViewChild('experience', { static: false }) experienceSection!: ElementRef;
  @ViewChild('studies', { static: false }) studiesSection!: ElementRef;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getProfileData().subscribe(data => {
      this.name = data.name;
      this.role = data.role;
      this.description = data.description;
      this.profile_strengths = data.profile_strengths;
    });
  }

  scrollToExperience() {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToStudies() {
    const element = document.getElementById('studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}