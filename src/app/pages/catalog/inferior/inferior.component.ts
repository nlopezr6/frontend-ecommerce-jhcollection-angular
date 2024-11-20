import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-inferior',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HomeComponent],
  templateUrl: './inferior.component.html',
  styleUrl: './inferior.component.css'
})
export class InferiorComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor (private productService: ProductService){}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || [];
      this.filteredProducts = [...this.products];
      console.log(this.products);
    })
  }

  filtrarPorCategoria( category: string): void {
    if (category === "todos"){
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

}
