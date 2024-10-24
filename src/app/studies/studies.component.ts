import { Component } from '@angular/core';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.sass'
})
export class StudiesComponent {

  public studies = [
      {
        "degree": "Ingeniería en Sistemas de Información",
        "institution": "Universidad Tecnológica Nacional",
        "period": "2015 - 2021",
        "description": "Estudios enfocados en desarrollo de software, bases de datos, redes y administración de proyectos."
      },
      {
        "degree": "Curso de Fullstack Developer",
        "institution": "Udemy",
        "period": "2021",
        "description": "Curso online de desarrollo web completo utilizando tecnologías modernas como Angular, Node.js y MongoDB."
      }
    ]

}
