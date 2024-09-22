import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getClassById(classId: string){
    return this.http.get(`${this.apiUrl}/${classId}`);
  }

  updateClass(classId: string, classData: any) {
    return this.http.put(`${this.apiUrl}/${classId}`, classData);
  }
}

