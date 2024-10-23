import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass'
})
export class ExperienceComponent implements AfterViewInit {

  cards = [
    { title: 'Experiencia 1', content: 'Descripción de la experiencia 1' },
    { title: 'Experiencia 2', content: 'Descripción de la experiencia 2' },
    { title: 'Experiencia 3', content: 'Descripción de la experiencia 3' },
    { title: 'Experiencia 4', content: 'Descripción de la experiencia 4' },
    { title: 'Experiencia 5', content: 'Descripción de la experiencia 5' },
    { title: 'Experiencia 6', content: 'Descripción de la experiencia 6' }
  ];

  @ViewChildren('card', { read: ElementRef }) cardsElement!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    // Configura el IntersectionObserver para observar cuando las tarjetas son visibles
    const options = {
      root: null, // Usa el viewport como contenedor
      threshold: 0.1 // 10% del elemento debe estar visible para activar la animación
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'card-visible');
        } else {
          this.renderer.removeClass(entry.target, 'card-visible');
        }
      });
    }, options);
    // Aplica el observer a cada tarjeta mat-card
    this.cardsElement.forEach(card => observer.observe(card.nativeElement));

  }
}