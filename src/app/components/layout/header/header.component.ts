import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  products: Product[] = []; // Todos los productos
  filteredProducts: Product[] = []; // Productos filtrados

  constructor(private authService: AuthService,private router: Router) {}

  get userData(): User | null {
    return this.authService.userData;
  }


  logout (){
    this.authService.logoutUser ()
    this.router.navigateByUrl ('login')
  }

  filtrarPorCategoria(category: string): void {
    if (category === 'todos') {
      this.filteredProducts = [...this.products]; // Si es "todos", mostramos todos los productos
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category); // Filtramos por categoría
    }
  }
}

