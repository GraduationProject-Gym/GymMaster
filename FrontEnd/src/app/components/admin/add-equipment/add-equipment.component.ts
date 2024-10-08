import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent {

  name: string = '';
  used_weight: number | null = null;
  number_of_equipments: number | null = null;
  serverErrors: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  
  save(equipmentForm: NgForm) {
    if (equipmentForm.valid) {
      const equipmentData = {
        name: this.name,
        used_weight: this.used_weight,
        number_of_equipments: this.number_of_equipments
      };

    
      this.http.post('/api/equipments', equipmentData).subscribe({
        next: (response) => {
          console.log('Equipment saved:', response);
          this.router.navigate(['admin-allEquipments']);
        },
        error: (error) => {
          if (error.status === 422) {
            this.serverErrors = error.error.errors;
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
    } else {
      console.log('Form is invalid, please fill in all required fields.');
    }
  }

  cancel() {
    this.name = '';
    this.used_weight = null;
    this.number_of_equipments = null;
    this.serverErrors = [];
  }
}

