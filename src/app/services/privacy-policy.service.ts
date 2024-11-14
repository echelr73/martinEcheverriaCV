import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrivacyPolicy } from '../models/privacyPolicy.model';

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {

  private jsonUrl = environment.apiUrl;
  private function = 'getPrivacyPolicyData';
  private privacyPolicyData$: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  // Obtener todos los datos del CV
  getPrivacyPolicyDataAPI(): Observable<any> {
    if (!this.privacyPolicyData$) {
      this.privacyPolicyData$ = this.http.get<any>(this.jsonUrl + this.function).pipe(
        shareReplay(1) // Comparte el resultado con todos los suscriptores
      );
    }
    return this.privacyPolicyData$;
  }

  // Obtener solo el nombre, título, descripción y fortalezas para el perfil
  getPrivacyPolicyData(): Observable<PrivacyPolicy> {
    return this.getPrivacyPolicyDataAPI().pipe(
      map(data =>
        new PrivacyPolicy(
          data.title ?? null,
          data.subtitle ?? null,
          data.subtitleDate ?? null,
          Array.isArray(data.content) ? data.content.map((content: any) =>
            ({
              title: content.title,
              description: content.description
            })) : [] // Usa un array vacío si data.content es null o no es un array
      ))
    );
  }

}
