import { Component } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Education } from '../models/education.model';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.sass'
})
export class StudiesComponent {

  public study: Education;

  constructor(private cvService: CvService) {
    this.getData();
  }

  getData(): void {
    this.cvService.getEducationData().subscribe(data => {
      this.study = data;
    });
  }
}
