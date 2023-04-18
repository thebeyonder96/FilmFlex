import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

   }

   login(username:string,password:string){
    return this.http.post(
      'https://dummyjson.com/auth/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
   }
}
