 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUserData: User|null = null;


  /** Forma anterior a la version Angular 16 */
  constructor( private http: HttpClient, private router: Router ) { }

  /** Esto es un getter (funcion para obtener datos de la clase) */


  get userData (): User|null{
    const storedData = localStorage.getItem ('authUserData');

    return this._authUserData || (storedData && storedData !== 'undefined'? JSON.parse (storedData) : null)
  }

  registerUser ( newUser: User ) :Observable <boolean|string>{
    return this.http.post <Response>( 'http://localhost:3000/api/auth/register', newUser )
      .pipe(     
        map ((data)=>{
          return data.ok
        }),
        catchError ((error)=>{
          // console.log(error);
          return of ("error")
        })
      );
    }
    

  loginUser(credenciales: User) :Observable <boolean|string|undefined>{
    return this.http.post <Response> ('http://localhost:3000/api/auth/login',credenciales)
      .pipe(
        tap ((data) => {
          console.log(data);

          
          if (data.token){

            if (data.data){
              this._authUserData = data.data;
              localStorage.setItem ('authUserData', JSON.stringify (data.data));

            }
            localStorage.setItem ('token', data.token);
          }
          
        }),
        map((data) => {
          return data.ok
        }),
        catchError ((error) => {
          return of ('error')
        })
      );
  }

  logoutUser(): Observable<boolean> {

    this._authUserData = null;                  // Elimina datos del usuario autenticado en el Servicio
    localStorage.removeItem( 'token' );         // Elimina token del LocalStorage
    localStorage.removeItem( 'authUserData' );  // Elimina datos del usuario autenticado en el LocalStorage


    return of( true );
  }

  verifyUser (){
    const token = localStorage.getItem ('token')||''
    const headers = new HttpHeaders ().set ('X-Token',token)
    return this.http.get <Response>('http://localhost:3000/api/auth/re-new-token',{headers})
    .pipe (
      tap ((data)=>{
        console.log(data)
      }),
      map((data)=>{
        return data.ok
      }),
      catchError ((data) =>{
        return of (false)

      })
    )

  }
}
  