import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-form-edit.component.html',
  styleUrl: './category-form-edit.component.css',
})
export class CategoryFormEditComponent {
  CategoryForm!: FormGroup;
  categories: any[] = [];
  collections: any[] = ['ColeccionV', 'ColeccionI', 'ColeccionP'];
  idselection: any;

  constructor(
    private CategoryService: CategoryService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    // Inyección correcta del Router
    this.CategoryForm = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.CategoryForm.valid) {
      console.log(this.CategoryForm.value);

      this.CategoryService.updateCategory(
        this.idselection,
        this.CategoryForm.value
      ).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('category/list');
      });
    }
    this.CategoryForm.reset();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data: any) => {
      console.log(data.id);
      this.idselection = data.id;
      this.categoryService.getCategoryById(data.id).subscribe((data) => {
        console.log(data);

        this.CategoryForm.setValue({
          categoria: data.data.categoria,
          descripcion: data.data.descripcion,
        });
      });
    });
  }
}
