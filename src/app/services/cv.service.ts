import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private jsonUrl = 'assets/cv-data.json';

  constructor(private http: HttpClient) {}

  // Obtener todos los datos del CV
  getCvData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Obtener solo los enlaces de contacto para el header
  getLinks(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        links: data.links,
      }))
    );
  }

  // Obtener solo el nombre, título, descripción y fortalezas para el perfil
  getProfileData(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        name: data.name,
        role: data.role,
        description: data.description,
        profile_strengths: data.profile_strengths
      }))
    );
  }

  getExperienceData(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        experience: data.experience
      }))
    );
  }

  getEducationData(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        education: data.education
      }))
    );
  }

  getCertificationsData(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        certifications: data.certifications
      }))
    );
  }

  getContactData(): Observable<any> {
    return this.getCvData().pipe(
      map(data => ({
        contact: data.contact
      }))
    );
  }
}
