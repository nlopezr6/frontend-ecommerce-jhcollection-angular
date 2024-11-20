import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../../services/collection.service';

@Component({
  selector: 'app-product-form-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.css'
})
export class ProductFormEditComponent {
  productForm!: FormGroup;
  categories: any[] = [];
  collections: any [] = [];
  idselection: any;

  
  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService, private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute ) { // Inyección correcta del Router
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
      category: new FormControl('non-category', [ Validators.required ]),
      line: new FormControl ('', [Validators.required]),
      urlImage: new FormControl(''),
      prominent: new FormControl (false)
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
    
    console.log(this.productForm.value)

    this.productService.updateProduct(
      this.idselection, this.productForm.value
    ).subscribe ((data)=>{
      console.log(data)
      this.router.navigateByUrl ('product/list')
    })
                
    }
    this.productForm.reset()
  }

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe ((data)=>{
      console.log(data)
      this.collections= data.data

    })
    this.categoryService.getCategory().subscribe((data) => {
      console.log(data)
      this.categories = data.data;
    })
    
    this.activatedRoute.params. subscribe ((data: any)=>{
        console.log(data.id);
        this.idselection = data.id;
        this.productService.getProductById(data.id).subscribe((data) => {
          console.log(data);

          this.productForm.setValue({
            name: data.data.name,
            description: data.data.description,
            quantity: data.data.quantity,
            price: data.data.price,
            category: data.data.category,
            line: data.data.line,
            urlImage: data.data.urlImage,
            prominent: data.data.prominent
          });
        });
      })
    
  
    
  }
}
