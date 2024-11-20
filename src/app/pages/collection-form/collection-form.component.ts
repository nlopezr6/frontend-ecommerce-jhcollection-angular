import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-collection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.css'
})
export class CollectionFormComponent {
  collectionForm!: FormGroup
  constructor (
    private collectionService:CollectionService,
    private router: Router
  ){
    this.collectionForm = new FormGroup({
      coleccion: new FormControl('', [ Validators.required ]),
      descripcion: new FormControl('')
     
    });
  }

  onSubmit() {
    if (this.collectionForm.valid) {
      const formData = this.collectionForm.value;
      console.log(formData)
      this.collectionService.registerCollection(formData).subscribe ((data)=>{
        console.log(data);
      this.router.navigateByUrl ('collection/list')
      });
     
      
    }
    this.collectionForm.reset()
  }

}



