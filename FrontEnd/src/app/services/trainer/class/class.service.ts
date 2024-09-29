import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../../auth-token.service';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = '';
  private showClass = `${environment.domain}/gym-classes`;
  private selectedClass:any;

  constructor(private http: HttpClient, private readonly authToken:AuthTokenService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authToken.getToken();
    console.log(token)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

  }

  getClassById(classId: string){
    return this.http.get(`${this.apiUrl}/${classId}`);
  }

  updateClass(classId: string, classData: any) {
    return this.http.put(`${this.apiUrl}/${classId}`, classData);
  }
  getShowClass(id:number):Observable <any>{
    // this.getHeaders()
    const headers =this.getHeaders() ;
    // console.log(headers);
    return this.http.get(`${this.showClass}/${id}`, {headers});

  }
  setSelectedclass(classe:any){
    this.selectedClass = classe;
  }
  getSelectedClass(){
    return this.selectedClass;
  }

}

