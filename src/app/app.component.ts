import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  
  // Variable para mostrar u ocultar el botón de scroll-to-top
  showButton = false;

  // Detecta el evento de desplazamiento de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verifica la posición de desplazamiento actual
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // Muestra el botón si la posición de desplazamiento supera los 100px
    this.showButton = scrollPosition > 100;
  }

  // Método para desplazarse suavemente al tope de la página
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
