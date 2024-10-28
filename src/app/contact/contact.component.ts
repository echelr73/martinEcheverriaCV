import { Component } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass'
})
export class ContactComponent {

  public contact: any;

  // Mapa de tecnologías a URLs de íconos
  techIcons: { [key: string]: string } = {
    Email: "https://img.icons8.com/ios-filled/50/new-post.png",
    LinkedIn: "https://img.icons8.com/ios-filled/50/linkedin.png",
    GitHub: "https://img.icons8.com/ios-filled/50/github.png",
    WhatsApp: "https://img.icons8.com/ios-filled/50/whatsapp.png"
  };

  // Función para obtener el ícono por tecnología
  getIcon(tech: string): string {
    return this.techIcons[tech] || ''; // Devuelve el URL o cadena vacía si no encuentra
  }

  constructor(private cvService: CvService) {
    this.getData();
  }

  getData(): void {
    this.cvService.getContactData().subscribe(data => {
      this.contact = data.contact;
    });
  }

}
