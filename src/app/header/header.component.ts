import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit {

  links: any;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getLinks().subscribe(data => {
      this.links = data.links;
    });
  }
    
}
