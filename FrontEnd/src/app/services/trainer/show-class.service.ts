import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowClassService {
  constructor(private readonly http: HttpClient) { }
  private readonly ShowClassUrl = "http://localhost:8000/api/trainee-class";

  getClassByID( ){
   // console.log(); // Test sent payload
    return this.http.get(this.ShowClassUrl);
  }
  getClasses( trainee_class:any){
    return this.http.get(this.ShowClassUrl+"/"+trainee_class);
  }

}
