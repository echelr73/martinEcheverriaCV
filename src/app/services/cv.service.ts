import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile, ProfileStrengths } from '../models/profile-strength.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Certification } from '../models/certification.model';
import { Contact, ContactLink } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  //private jsonUrl = 'assets/cv-data.json';
  private jsonUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todos los datos del CV
  getCvData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Obtener solo el nombre, título, descripción y fortalezas para el perfil
  getProfileData(): Observable<Profile> {
    return this.http.get<Profile>(this.jsonUrl).pipe(
      map((data: any) => ({
        role: data.role,
        profile_strengths: new ProfileStrengths(
          data.profile_strengths.title,
          data.profile_strengths.strengths_learner,
          data.profile_strengths.strengths_responsibility,
          data.profile_strengths.strengths_focus,
          data.profile_strengths.strengths_achiever,
          data.profile_strengths.strengths_futuristic
        )
      }))
    );
  }

  // Obtener solo los datos de experiencia
  getExperienceData(): Observable<Experience[]> {
    return this.getCvData().pipe(
      map(data =>
        data.experience.map((exp: any) =>
          new Experience(
            exp.position,
            exp.company,
            exp.period,
            exp.description,
            exp.technology)
        ))
    );
  }

  // Obtener solo los datos de educación
  getEducationData(): Observable<Education> {
    return this.getCvData().pipe(
      map(data =>
        new Education(
          data.education.degree,
          data.education.institution,
          data.education.period,
          data.education.description
        ))
    );
  }

  // Obtener solo los datos de certificaciones
  getCertificationsData(): Observable<Certification[]> {
    return this.getCvData().pipe(
      map(data =>
        data.certifications.map((cert: any) =>
          new Certification(
            cert.logo,
            cert.title,
            cert.description
          )
        ))
    );
  }

  // Obtener solo los datos de contacto
  getContactData(): Observable<Contact> {
    return this.getCvData().pipe(
      map(data => new Contact(
        data.contact.description,
        data.contact.links.map((link: any) =>
          new ContactLink(
            link.text,
            link.url
          )
        )
      ))
    );
  }
}
