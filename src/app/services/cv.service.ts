import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { Profile, ProfileStrength, ProfileStrengths } from '../models/profile-strength.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Certification } from '../models/certification.model';
import { Contact, ContactLink } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private jsonUrl = environment.apiUrl;
  private function = 'getCvData';
  private cvData$: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  // Obtener todos los datos del CV
  getCvData(): Observable<any> {
    if (!this.cvData$) {
      this.cvData$ = this.http.get<any>(this.jsonUrl + this.function).pipe(
        shareReplay(1), // Comparte el resultado con todos los suscriptores
        catchError((error) => {
          console.error('Error fetching CV data:', error);
          return of(null);
        })
      );
    }
    return this.cvData$;
  }

  // Obtener solo el nombre, título, descripción y fortalezas para el perfil
  getProfileData(): Observable<Profile | null> {
    return this.getCvData().pipe(
      map((data: any) => data ? ({
        role: data.role,
        profile_strengths: new ProfileStrengths(
          data.profile_strengths.title,
          new ProfileStrength(data.profile_strengths.strengths_learner.title, data.profile_strengths.strengths_learner.tooltip),
          new ProfileStrength(data.profile_strengths.strengths_responsibility.title, data.profile_strengths.strengths_responsibility.tooltip),
          new ProfileStrength(data.profile_strengths.strengths_focus.title, data.profile_strengths.strengths_focus.tooltip),
          new ProfileStrength(data.profile_strengths.strengths_achiever.title, data.profile_strengths.strengths_achiever.tooltip),
          new ProfileStrength(data.profile_strengths.strengths_futuristic.title, data.profile_strengths.strengths_futuristic.tooltip)
        )
      }) : null)
    );
  }

  // Obtener solo los datos de experiencia
  getExperienceData(): Observable<Experience[] | null> {
    return this.getCvData().pipe(
      map(data => data ?
        data.experience.map((exp: any) =>
          new Experience(
            exp.position,
            exp.company,
            exp.period,
            exp.description,
            exp.technology)
        ) : null)
    );
  }

  // Obtener solo los datos de educación
  getEducationData(): Observable<Education | null> {
    return this.getCvData().pipe(
      map(data => data ?
        new Education(
          data.education.degree,
          data.education.institution,
          data.education.period,
          data.education.description
        ) : null)
    );
  }

  // Obtener solo los datos de certificaciones
  getCertificationsData(): Observable<Certification[] | null> {
    return this.getCvData().pipe(
      map(data => data ?
        data.certifications.map((cert: any) =>
          new Certification(
            cert.logo,
            cert.title,
            cert.description
          )
        ) : null)
    );
  }

  // Obtener solo los datos de contacto
  getContactData(): Observable<Contact | null> {
    return this.getCvData().pipe(
      map(data => data ? new Contact(
        data.contact.description,
        data.contact.links.map((link: any) =>
          new ContactLink(
            link.text,
            link.url
          )
        )
      ) : null)
    );
  }
}
