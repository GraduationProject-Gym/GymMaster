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
  private showTrainee = `${environment.domain}/trainees`;
  private createReview = `${environment.domain}/review`;
  private getClassTrainer = `${environment.domain}/getClassTrainer`;



  private selectedClass:any;
  private selectedtrainee:any;

  constructor(private http: HttpClient, private readonly authToken:AuthTokenService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authToken.getToken();
    console.log(token)
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  }

  getClassById(classId: string){
    return this.http.get(`${this.apiUrl}/${classId}`);
  }

  updateClass(classId: string, classData: any) {
    return this.http.put(`${this.apiUrl}/${classId}`, classData);
  }
  setSelectedclass(classe:any){
    this.selectedClass = classe;
  }
  getSelectedClass(){
    return this.selectedClass;
  }
  setTrainee(trainees:any){
    this.selectedtrainee = trainees;
  }
  getTrainee(){
    return this.selectedtrainee;
  }
  getShowClass(id:number):Observable <any>{
    // this.getHeaders()
    const headers =this.getHeaders() ;
    // console.log(headers);
    return this.http.get(`${this.showClass}/${id}`, {headers});

  }
  geTraineeOnClass():Observable <any>{
    const headers =this.getHeaders() ;
    return this.http.get(`${this.showTrainee}`,{headers});
  }
  setReview(data:any):Observable <any>{
    // console.log(234234);
    const headers =this.getHeaders() ;
    return this.http.post(`${this.createReview}`,{...data},{headers});
  }

  getClass():Observable <any>{
    const headers =this.getHeaders() ;
    return this.http.get(`${this.getClassTrainer}`,{headers});
  }

}

