import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private token;
  private headers!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem ('token') || '';
    this.headers = new HttpHeaders ().set ('X-token',this.token)
  }

  getCategory(){
    return this.http.get<any>('http://localhost:3000/api/categories')
  }

  
  registerCategory(CategoryData: Category): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/categories', CategoryData, {headers:this.headers})
   .pipe(
       tap((response) => {
           console.log('Respuesta del servidor:', response); // Imprimir la respuesta del servidor
       }),
       catchError(error => {
           console.error('Error al registrar el producto:', error);
           return of('Error al registrar el producto');
       })
   );
}

deleteCategory (id: any){
  return this.http.delete (`http://localhost:3000/api/categories/${id}`, {headers:this.headers})

}
getCategoryById (id: any){
  return this.http.get <any> (`http://localhost:3000/api/categories/${id}`, {headers:this.headers})
}

updateCategory (id:any, data: any){
 return this.http.patch <any> (`http://localhost:3000/api/categories/${id}`, data, {headers:this.headers})

}
}

