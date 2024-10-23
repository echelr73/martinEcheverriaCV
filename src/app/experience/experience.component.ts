import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass'
})
export class ExperienceComponent implements AfterViewInit {

  public cards: any[] = [];

  @ViewChildren('card', { read: ElementRef }) cardsElement!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2, private cvService: CvService) {
    this.getData();
  }

  ngAfterViewInit(): void {
    if (this.cardsElement) {
      this.setupObserver();
    }
  }

  private setupObserver() {
    const options = {
      root: null, // Usa el viewport como contenedor
      threshold: 0.5 // 10% del elemento debe estar visible para activar la animación
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

    // Asegúrate de que cardsElement tiene elementos antes de observar
    this.cardsElement.forEach(card => {
      if (card.nativeElement) {
        observer.observe(card.nativeElement);
      }
    });
  }

  getData(): void {
    this.cvService.getExperienceData().subscribe(data => {
      this.cards = data.experience;

      setTimeout(() => {
        this.setupObserver();
      });
    });
  }
}