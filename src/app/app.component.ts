import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'webCV';

  showButton = false;

  // Detecta el scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showButton = scrollPosition > 100; // Mostrar botón si se scrollea más de 100px
  }

  // Método para volver al tope
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
