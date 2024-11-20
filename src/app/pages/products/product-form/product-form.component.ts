
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLink } from '@angular/router'; // Asegúrate de tener esto importado
import { CategoryService } from '../../../services/category.service';
import { CollectionService } from '../../../services/collection.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'] 
})
export class ProductFormComponent {
  productForm!: FormGroup;
  categories: any[] = [];
  collections: any [] = [];
  
  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService,private collectionService: CollectionService) { // Inyección correcta del Router
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
      category: new FormControl('non-category', [ Validators.required ]),
      line: new FormControl ('', [Validators.required]),
      urlImage: new FormControl('')
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.registerProduct(formData)
      .subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('product/list')
      });
    
      
    }
    this.productForm.reset()
  }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe ((data)=>{
      console.log(data)
      this.collections = data.data
      
    });

    this.categoryService.getCategory().subscribe((data) => {
      console.log(data)
      this.categories = data.data;
    })
    
  }
}
