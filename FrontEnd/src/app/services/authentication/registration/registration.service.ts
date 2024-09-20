import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private readonly http: HttpClient) { }
  private readonly registrationUrl = "http://localhost:8000/api/register";

    register(data: { email: string, password: string, name:string,
        age:number, goal:string, phone:string,
        address:string, gender:string, role:string,image:string }) {
    console.log(data); // Test sent payload
    return this.http.post(this.registrationUrl, data);
}
}
