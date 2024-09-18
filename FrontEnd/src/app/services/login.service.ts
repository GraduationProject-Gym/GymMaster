import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http:HttpClient) { }
  private readonly loginUrl = "http://localhost:8000/api/login";

  login(data: { name: string; password: string }){
    return this.http.post(this.loginUrl, data)
    .pipe(tap((result) => {
      localStorage.setItem('authUser', JSON.stringify(result));
    }));
  }


}
