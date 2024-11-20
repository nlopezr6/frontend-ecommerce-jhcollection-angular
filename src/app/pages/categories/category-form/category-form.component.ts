import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  categoryForm!: FormGroup
  constructor (private categoryService:CategoryService,
    private router: Router
  ){
    this.categoryForm = new FormGroup({
      categoria: new FormControl('', [ Validators.required ]),
      descripcion: new FormControl('')
     
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      this.categoryService.registerCategory(formData)
      .subscribe((data) => {
        console.log(data);
         this.router.navigateByUrl('category/list')
      });
    
      
    }
    this.categoryForm.reset()
  }

}
