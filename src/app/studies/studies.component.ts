import { Component } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.sass'
})
export class StudiesComponent {

  public study: any;

  constructor(private cvService: CvService) {
    this.getData();
  }

  getData(): void {
    this.cvService.getEducationData().subscribe(data => {
      this.study = data.education;
      console.log(this.study);
    });
  }
}
