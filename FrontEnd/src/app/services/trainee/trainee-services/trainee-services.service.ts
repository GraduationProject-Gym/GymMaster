import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraineeServicesService {
  constructor() { }
  private selectedService:any;

  setSelectedService(service:any){
    this.selectedService = service;
  }

  getSelectedService(){
    this.selectedService;
  }
}
