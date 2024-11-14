import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appAppTouchTooltip]'
})
export class AppTouchTooltipDirective {

  constructor(private el: ElementRef, private tooltip: MatTooltip) {}

  // Se activa cuando el usuario toca el elemento
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.tooltip.show(); // Mostrar el tooltip cuando se toque el elemento
  }

  // Se activa cuando el usuario deja de tocar el elemento
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.tooltip.hide(); // Ocultar el tooltip cuando se deje de tocar
  }
}
