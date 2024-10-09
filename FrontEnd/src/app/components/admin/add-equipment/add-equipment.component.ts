import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';
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
  data: any;

  // constructor(private http: HttpClient, private router: Router) {}
  constructor(private adminService: AdminService,private router: Router) {
  }
  

  save(equipmentForm: NgForm) {
    if (equipmentForm.valid) {
    
      const data_equipment =  {
        name: this.name,
        used_weight: this.used_weight,
        number_of_equipments:this.number_of_equipments
      };

      this.adminService.addEquipment(data_equipment).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = this.adminService.getSelectedData();
          console.log('Equipment saved:', response);
          this.router.navigate(['admin-allEquipments'])
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

