import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: any [] = [];

  constructor(private CategoryService: CategoryService, private router: Router){}

  ngOnInit(){
   this.loadData ()
   
    
  }
  loadData (){
    this.CategoryService.getCategory ().
    subscribe ((data) =>{
      console.log(data);
      this.categories = data.data
    })
  }
  editar (id:any) {
    console.log('Edita categoria'+ id);
    this.router.navigateByUrl ('category/category-edit/'+ id)
    
  }
  eliminar (id: any){
    console.log('Elimina categoria'+ id);
    this.CategoryService.deleteCategory (id). subscribe ((data)=>{
      console.log(data);
      this.loadData ();
    })

  }

}
