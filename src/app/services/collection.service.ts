import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private token;
  private headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('X-token', this.token);
  }

  registerCollection(CollectionData: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/api/collection', CollectionData, {
        headers: this.headers,
      })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:', response); // Imprimir la respuesta del servidor
        }),
        catchError((error) => {
          console.error('Error al registrar coleccion:', error);
          return of('Error al registrar la coleccion');
        })
      );
  }

  getCollections() {
    return this.http.get<any>('http://localhost:3000/api/collection');
  }
  deleteCollections(id: any) {
    return this.http.delete(`http://localhost:3000/api/collection/${id}`, {
      headers: this.headers,
    });
  }
  getCollectionById (id: any){
    return this.http.get <any> (`http://localhost:3000/api/collection/${id}`)
  }
  updateCollection (id:any, data: any){
    return this.http.patch <any> (`http://localhost:3000/api/collection/${id}`, data, {headers:this.headers})
   
   }
}
