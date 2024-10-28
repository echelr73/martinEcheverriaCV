import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

    showPrivacyPolicy = false;
    showTermsOfUse = false;
  
    openModal(type: string): void {
      if (type === 'privacyPolicy') {
        this.showPrivacyPolicy = true;
      } else if (type === 'termsOfUse') {
        this.showTermsOfUse = true;
      }
    }
  
    closeModal(): void {
      this.showPrivacyPolicy = false;
      this.showTermsOfUse = false;
    }
  }
