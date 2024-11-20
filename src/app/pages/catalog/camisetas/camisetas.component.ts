import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../../app/services/product.service';
import { HomeComponent } from "../../home/home.component";

@Component({
  selector: 'app-camisetas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HomeComponent],
  templateUrl: './camisetas.component.html',
  styleUrls: ['./camisetas.component.css']
})
export class CamisetasComponent {
  products: Product[] = []; // Todos los productos
  filteredProducts: Product[] = []; // Productos filtrados

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Obtener todos los productos desde el servicio
    this.productService.getAllProducts().subscribe(data => {
      this.products = data || []; // Asigna un arreglo vacío si data es undefined
      this.filteredProducts = [...this.products]; // Inicializa los productos filtrados con todos los productos
      console.log(this.products); // Muestra los productos en la consola
    });
  }

  // Función para filtrar productos por categoría
  filtrarPorCategoria(category: string): void {
    if (category === 'todos') {
      this.filteredProducts = [...this.products]; // Si es "todos", mostramos todos los productos
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category); // Filtramos por categoría
    }
  }
}