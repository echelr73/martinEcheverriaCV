import { Component } from '@angular/core';
import { PrivacyPolicyService } from '../services/privacy-policy.service';
import { PrivacyPolicy, PrivacyPolicyContent } from '../models/privacyPolicy.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  showPrivacyPolicy = false;
  showTermsOfUse = false;
  public privacyPolicyData: PrivacyPolicy;

  constructor(private privacyPolicy: PrivacyPolicyService) { }

  openModal(type: string): void {
    if (type === 'privacyPolicy') {
      this.getPrivacyPolicyData();
      this.showPrivacyPolicy = true;
    } else if (type === 'termsOfUse') {
      this.showTermsOfUse = true;
    }
  }

  closeModal(): void {
    this.showPrivacyPolicy = false;
    this.showTermsOfUse = false;
  }

  getPrivacyPolicyData(): void {
    this.privacyPolicy.getProfileData().subscribe(data => {
      this.privacyPolicyData = data;
    });
  }
}
