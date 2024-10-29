import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass'
})
export class ExperienceComponent implements AfterViewInit, OnInit {

  public cards: any[] = [];
  public isSmallScreen = false;

  @ViewChildren('card', { read: ElementRef }) cardsElement!: QueryList<ElementRef>;

  // Mapa de tecnologías a URLs de íconos
  techIcons: { [key: string]: string } = {
    Angular: "https://img.icons8.com/color/48/angularjs.png",
    ".NET": "https://img.icons8.com/color/48/net-framework.png",
    Git: "https://img.icons8.com/color/48/git.png",
    "SQL Server": "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-sql-server-big-data-wanicon-lineal-color-wanicon.png",
    Azure: "https://img.icons8.com/fluency/48/azure-1.png",
    Postman: "https://img.icons8.com/dusk/50/postman-api.png",
    Node: "https://img.icons8.com/fluency/48/node-js.png",
    Windows: "https://img.icons8.com/color/48/windows-10.png",
    Office: "https://img.icons8.com/office/40/microsoft-365.png"
  };

  // Función para obtener el ícono por tecnología
  getIcon(tech: string): string {
    return this.techIcons[tech] || ''; // Devuelve el URL o cadena vacía si no encuentra
  }

  constructor(private renderer: Renderer2, private cvService: CvService) {
    this.getData();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 800;
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
      let counter = 0;
      entries.forEach(entry => {
        
        if (entry.isIntersecting) {
          if (counter % 2 === 0){
            this.renderer.addClass(entry.target, 'card-visible-right');
          }else {
            this.renderer.addClass(entry.target, 'card-visible-left');;
          }
          counter++;
        } else {
          this.renderer.removeClass(entry.target, 'card-visible-left');
          this.renderer.removeClass(entry.target, 'card-visible-right');
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