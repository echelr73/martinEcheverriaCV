import { Component } from '@angular/core';
import { PrivacyPolicyService } from '../services/privacy-policy.service';
import { PrivacyPolicy, PrivacyPolicyContent } from '../models/privacyPolicy.model';
import { TermsOfUse } from '../models/termsOfUse.model';
import { TermsOfUseService } from '../services/terms-of-use.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  showPrivacyPolicy = false;
  showTermsOfUse = false;
  public privacyPolicyData: PrivacyPolicy;
  public termsOfUseData: TermsOfUse;

  constructor(private privacyPolicyService: PrivacyPolicyService, private termsOfUseService: TermsOfUseService) { }

  openModal(type: string): void {
    if (type === 'privacyPolicy') {
      this.getPrivacyPolicyData();
      this.showPrivacyPolicy = true;
    } else if (type === 'termsOfUse') {
      this.getTermsOfUseData();
      this.showTermsOfUse = true;
    }
  }

  closeModal(): void {
    this.showPrivacyPolicy = false;
    this.showTermsOfUse = false;
  }

  getPrivacyPolicyData(): void {
    this.privacyPolicyService.getPrivacyPolicyData().subscribe(data => {
      this.privacyPolicyData = data;
    });
  }

  getTermsOfUseData(): void {
    this.termsOfUseService.getTermsOfUseData().subscribe(data => {
      this.termsOfUseData = data;
    });
  }
}
