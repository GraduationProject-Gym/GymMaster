import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = '';
  private showClass = `${environment.domain}/showClass`;
  private selectedClass:any;

  constructor(private http: HttpClient) {}

  getClassById(classId: string){
    return this.http.get(`${this.apiUrl}/${classId}`);
  }

  updateClass(classId: string, classData: any) {
    return this.http.put(`${this.apiUrl}/${classId}`, classData);
  }
  getShowClass(id:number):Observable <any>{
    return this.http.post(`${this.showClass}`,{ id: id });
  }
  setSelectedclass(classe:any){
    this.selectedClass = classe;
  }
  getSelectedClass(){
    return this.selectedClass;
  }
  
}

