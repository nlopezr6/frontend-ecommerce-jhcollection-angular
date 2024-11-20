import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { CartService } from '../../../services/cart.service.service';

@Component({
  selector: 'app-buzos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HomeComponent],
  templateUrl: './buzos.component.html',
  styleUrl: './buzos.component.css'
})
export class BuzosComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  prominentProducts: any [] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ){}

  // ngOnInit() {
  //   this.productService.getAllProducts().subscribe(data => {
  //     this.products = data || [];
  //     this.filteredProducts = [...this.products];
  //     console.log(this.products);
  //   })
  // }
  loadData(){
    this.productService.getAllProducts().subscribe
    ((data) => {
      console.log(data)
      this.products = data.category
      this.prominentProducts = this.products.filter ((product:any)=>{
        return product.prominent
      })
    })
  }

  ngOnInit() {
    this.loadData()
    
  }


  filtrarPorCategoria(category: string): void {
    if(category === "todos") {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  addToCart(item: any){
    this.cartService.addToCart(item)
  }

}
