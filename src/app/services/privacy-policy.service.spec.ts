import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrivacyPolicyService } from './privacy-policy.service';
import { environment } from '../../environments/environment';
import { PrivacyPolicy } from '../models/privacyPolicy.model';

describe('PrivacyPolicyService', () => {
  let service: PrivacyPolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrivacyPolicyService]
    });
    service = TestBed.inject(PrivacyPolicyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request and return data when calling getPrivacyPolicyDataAPI', (done) => {
    const mockData = { title: 'Privacy Policy', content: [] };

    service.getPrivacyPolicyDataAPI().subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getPrivacyPolicyData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should cache the observable and share the result in getPrivacyPolicyDataAPI', () => {
    service.getPrivacyPolicyDataAPI().subscribe();
    service.getPrivacyPolicyDataAPI().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}getPrivacyPolicyData`);
    expect(req.request.method).toBe('GET');
    req.flush({ title: 'Privacy Policy', content: [] });

    httpMock.verify();
  });

  it('should return a PrivacyPolicy object with transformed data when calling getPrivacyPolicyData', (done) => {
    const mockData = {
      title: 'Privacy Policy',
      subtitle: 'Legal Info',
      subtitleDate: '2024-11-12',
      content: [
        { title: 'Data Collection', description: 'We collect data to improve services.' },
        { title: 'Data Usage', description: 'Data is used in accordance with privacy laws.' }
      ]
    };

    service.getPrivacyPolicyData().subscribe(policy => {
      expect(policy).toEqual(
        new PrivacyPolicy(
          'Privacy Policy',
          'Legal Info',
          '2024-11-12',
          [
            { title: 'Data Collection', description: 'We collect data to improve services.' },
            { title: 'Data Usage', description: 'Data is used in accordance with privacy laws.' }
          ]
        )
      );
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getPrivacyPolicyData`);
    req.flush(mockData);
  });

  it('should return a PrivacyPolicy object with default values if data is incomplete or null', (done) => {
    const incompleteData = { title: null, subtitle: null, subtitleDate: null, content: null };

    service.getPrivacyPolicyData().subscribe(policy => {
      expect(policy.title).toBeNull();
      expect(policy.subtitle).toBeNull();
      expect(policy.subtitleDate).toBeNull();
      expect(policy.content).toEqual([]);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getPrivacyPolicyData`);
    req.flush(incompleteData);
  });
});
