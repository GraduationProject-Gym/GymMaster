import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http:HttpClient) { }
  // private readonly url="http://localhost:8000/api/Register";
  private readonly url="https://jsonplaceholder.typicode.com/users";

  // registration(userData: any) {
  //   return this.http.post(this.url, userData);
  // }

  registration() {
    return this.http.get(this.url);
  }

  // register(userData: any): Observable<any> {
  //   return this.http.post(this.url, userData);
  // }

}
