import { TestBed } from '@angular/core/testing';

import { CvService } from './cv.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { ProfileStrength, ProfileStrengths } from '../models/profile-strength.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Certification } from '../models/certification.model';
import { Contact, ContactLink } from '../models/contact.model';

describe('CvService', () => {
  let service: CvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CvService]
    });
    service = TestBed.inject(CvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch profile data and map correctly', (done) => {
    const mockData = {
      role: 'Developer',
      profile_strengths: {
        title: 'Strengths Title',
        strengths_learner: { title: 'Learner', tooltip: 'Learner Tooltip' },
        strengths_responsibility: { title: 'Responsibility', tooltip: 'Responsibility Tooltip' },
        strengths_focus: { title: 'Focus', tooltip: 'Focus Tooltip' },
        strengths_achiever: { title: 'Achiever', tooltip: 'Achiever Tooltip' },
        strengths_futuristic: { title: 'Futuristic', tooltip: 'Futuristic Tooltip' }
      }
    };

    service.getProfileData().subscribe(profile => {
      expect(profile).toEqual({
        role: 'Developer',
        profile_strengths: new ProfileStrengths(
          'Strengths Title',
          new ProfileStrength('Learner', 'Learner Tooltip'),
          new ProfileStrength('Responsibility', 'Responsibility Tooltip'),
          new ProfileStrength('Focus', 'Focus Tooltip'),
          new ProfileStrength('Achiever', 'Achiever Tooltip'),
          new ProfileStrength('Futuristic', 'Futuristic Tooltip')
        )
      });
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should return null if no profile data is available', (done) => {
    service.getProfileData().subscribe(profile => {
      expect(profile).toBeNull();
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(null); // Simula una respuesta `null` desde el servidor
  });
  

  it('should fetch experience data and mal correctly', (done) => {
    const mockData = {
      experience: [
        {
          position: 'Developer',
          company: 'Company',
          period: 'Period',
          description: 'Description',
          technology: []
        }
      ]
    };

    service.getExperienceData().subscribe(experience => {
      expect(experience).toEqual([
        new Experience(
          'Developer',
          'Company',
          'Period',
          'Description',
          []
        )
      ]);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

  });  

  it('should fetch education data and map correctly', (done) => {
    const mockData = {
      education: {
        degree: 'Degree',
        institution: 'Institution',
        period: 'Period',
        description: 'Description'
      }
    };

    service.getEducationData().subscribe(education => {
      expect(education).toEqual(
        new Education(
          'Degree',
          'Institution',
          'Period',
          'Description'
        )
      );
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should return null if no education data is available', (done) => {
    service.getEducationData().subscribe(education => {
      expect(education).toBeNull();
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(null); // Simula una respuesta `null` desde el servidor
  });
  
  it('should fetch certifications data and map correctly', (done) => {
    const mockData = {
      certifications: [
        { logo: 'logo1.png', title: 'Certification 1', description: 'Description 1' },
        { logo: 'logo2.png', title: 'Certification 2', description: 'Description 2' }
      ]
    };
  
    service.getCertificationsData().subscribe(certifications => {
      expect(certifications).toEqual([
        new Certification('logo1.png', 'Certification 1', 'Description 1'),
        new Certification('logo2.png', 'Certification 2', 'Description 2')
      ]);
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  
  it('should return null if no certifications data is available', (done) => {
    service.getCertificationsData().subscribe(certifications => {
      expect(certifications).toBeNull();
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(null); // Simula una respuesta `null` desde el servidor
  });
  
  it('should fetch contact data and map correctly', (done) => {
    const mockData = {
      contact: {
        description: 'Contact description',
        links: [
          { text: 'Link 1', url: 'http://link1.com' },
          { text: 'Link 2', url: 'http://link2.com' }
        ]
      }
    };
  
    service.getContactData().subscribe(contact => {
      expect(contact).toEqual(
        new Contact(
          'Contact description',
          [
            new ContactLink('Link 1', 'http://link1.com'),
            new ContactLink('Link 2', 'http://link2.com')
          ]
        )
      );
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  
  it('should return null if no contact data is available', (done) => {
    service.getContactData().subscribe(contact => {
      expect(contact).toBeNull();
      done();
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}getCvData`);
    expect(req.request.method).toBe('GET');
    req.flush(null); // Simula una respuesta `null` desde el servidor
  });
  

});