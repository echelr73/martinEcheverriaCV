import { Component, HostListener, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.sass'
})
export class CertificationsComponent implements OnInit {

  public certifications: any[];
  public isSmallScreen = false;
  public rowHeight = '300px';

  // Mapa de tecnologías a URLs de íconos
  techIcons: { [key: string]: string } = {
    Azure: "data:image/png;base64,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",
    Javascript: "https://img.icons8.com/ios/50/javascript.png",
    Photoshop: "https://img.icons8.com/ios/50/adobe-photoshop--v1.png",
    DesignUX: "https://img.icons8.com/ios/50/web.png"
  };

  // Función para obtener el ícono por tecnología
  getIcon(tech: string): string {
    return this.techIcons[tech] || ''; // Devuelve el URL o cadena vacía si no encuentra
  }

  constructor(private cvService: CvService) {
    this.getData();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 800;
    this.rowHeight = this.isSmallScreen ? '300px' : '300px';
  }

  getData(): void {
    this.cvService.getCertificationsData().subscribe(data => {
      this.certifications = data.certifications;
    });
  }
}
