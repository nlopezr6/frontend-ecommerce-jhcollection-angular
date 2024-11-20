import { Component } from '@angular/core';
import { CollectionService } from '../../services/collection.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-form-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './collection-form-edit.component.html',
  styleUrl: './collection-form-edit.component.css'
})
export class CollectionFormEditComponent {
  collectionForm!: FormGroup
  SelectId!: string
  constructor (
    private collectionService:CollectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
      this.collectionService.updateCollection (this.SelectId,formData).subscribe ((data)=>{
        console.log(data);
      this.router.navigateByUrl ('collection/list')
      });
     
      
    }
    this.collectionForm.reset()
  }
  ngOnInit (){
    this.activatedRoute.params.subscribe((data)=>{
      console.log(data)
    this.SelectId=data ['id']
    this.collectionService.getCollectionById(data ['id']).subscribe ((data)=>{
      console.log(data)
    this.collectionForm.setValue({
      coleccion: data.data.coleccion,
      descripcion: data.data.descripcion
    })
    })

    })

  }
}
