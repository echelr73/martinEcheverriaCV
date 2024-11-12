import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CvService } from '../services/cv.service';
import { ProfileStrengths } from '../models/profile-strength.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit {
  role: string;
  profile_strengths: ProfileStrengths;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getProfileData().subscribe(data => {
      this.role = data.role;
      this.profile_strengths = data.profile_strengths;
    });
  }
}