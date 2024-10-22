import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass'
})
export class ExperienceComponent {
  cards = [
    { title: 'Experiencia 1', content: 'Descripción de la experiencia 1' },
    { title: 'Experiencia 2', content: 'Descripción de la experiencia 2' },
    { title: 'Experiencia 3', content: 'Descripción de la experiencia 3' },
    { title: 'Experiencia 4', content: 'Descripción de la experiencia 4' },
    { title: 'Experiencia 5', content: 'Descripción de la experiencia 5' },
    { title: 'Experiencia 6', content: 'Descripción de la experiencia 6' }
  ];

}
