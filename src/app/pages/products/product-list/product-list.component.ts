import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: any [] = [];

  constructor(private productService: ProductService, private router: Router){}

  ngOnInit(){
    this.loadData();
    
  }
  loadData (){
    this.productService.getAllProducts ().
    subscribe ((data) =>{
      console.log(data);
      this.products = data.data
    })
  }
  editar (id:any) {
    console.log('Edita producto'+ id);
    this.router.navigateByUrl ('product/product-edit/'+ id)
    
  }
  eliminar (id: any){
    console.log('Elimina producto'+ id);
    this.productService.deleteProduct (id). subscribe ((data)=>{
      console.log(data);
      this.loadData ();
    })

  }

}

