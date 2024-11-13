import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TermsOfUse } from '../models/termsOfUse.model';

@Injectable({
  providedIn: 'root'
})
export class TermsOfUseService {

  private jsonUrl = environment.apiUrl;
  private function = 'getTermsOfUseData';
  private termsOfUseData$: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  // Obtener todos los datos del CV
  getTermsOfUseDataAPI(): Observable<any> {
    if (!this.termsOfUseData$) {
      this.termsOfUseData$ = this.http.get<any>(this.jsonUrl + this.function).pipe(
        shareReplay(1) // Comparte el resultado con todos los suscriptores
      );
    }
    return this.termsOfUseData$;
  }

  // Obtener solo el nombre, título, descripción y fortalezas para el perfil
  getTermsOfUseData(): Observable<TermsOfUse> {
    return this.getTermsOfUseDataAPI().pipe(
      map(data =>
        new TermsOfUse(
          data.title,
          data.subtitle,
          data.subtitleDate,
          data.content.map((content: any) =>
            ({
              title: content.title,
              description: content.description
            })
        ))
    ));
  }
}
