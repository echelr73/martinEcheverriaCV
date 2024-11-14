import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TermsOfUseService } from './terms-of-use.service';
import { environment } from '../../environments/environment';
import { TermsOfUse } from '../models/termsOfUse.model';

describe('TermsOfUseService', () => {
  let service: TermsOfUseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TermsOfUseService]
    });
    service = TestBed.inject(TermsOfUseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve full Terms of Use data from API', () => {
    const mockData = {
      title: 'Terms Title',
      subtitle: 'Terms Subtitle',
      subtitleDate: '2023-01-01',
      content: [{ title: 'Section 1', description: 'Description 1' }]
    };

    service.getTermsOfUseDataAPI().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getTermsOfUseData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should cache and share the response using shareReplay', () => {
    const mockData = {
      title: 'Terms Title',
      subtitle: 'Terms Subtitle',
      subtitleDate: '2023-01-01',
      content: [{ title: 'Section 1', description: 'Description 1' }]
    };

    service.getTermsOfUseDataAPI().subscribe();
    service.getTermsOfUseDataAPI().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}getTermsOfUseData`);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should return a TermsOfUse object when data is valid', (done) => {
    const mockData = {
      title: 'Terms Title',
      subtitle: 'Terms Subtitle',
      subtitleDate: '2023-01-01',
      content: [{ title: 'Section 1', description: 'Description 1' }]
    };

    service.getTermsOfUseData().subscribe(terms => {
      expect(terms.title).toBe('Terms Title');
      expect(terms.subtitle).toBe('Terms Subtitle');
      expect(terms.subtitleDate).toBe('2023-01-01');
      expect(terms.content).toEqual([{ title: 'Section 1', description: 'Description 1' }]);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getTermsOfUseData`);
    req.flush(mockData);
  });

  it('should return a TermsOfUse object with default values if data is incomplete or null', (done) => {
    const incompleteData = { title: null, subtitle: null, subtitleDate: null, content: null };

    service.getTermsOfUseData().subscribe(terms => {
      expect(terms.title).toBeNull();
      expect(terms.subtitle).toBeNull();
      expect(terms.subtitleDate).toBeNull();
      expect(terms.content).toEqual([]); // Default to empty array if content is null
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getTermsOfUseData`);
    req.flush(incompleteData);
  });
});
