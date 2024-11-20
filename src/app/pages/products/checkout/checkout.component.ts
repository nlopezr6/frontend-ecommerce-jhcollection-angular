import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartProducts: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.items;
  }

  /** Getter */
  get total() {
    return this.cartService.total;
  }

  addOneItem(id: any) {
    console.log('Agrega un item al carrito con ID ' + id);
    this.cartService.addOneItemToCart(id);
    this.cartProducts = this.cartService.items;
  }

  substractOneItem(id: any) {
    console.log('Resta un item al carrito con ID ' + id);
    this.cartService.substractOneItemToCart(id);
    this.cartProducts = this.cartService.items;
  }

  removeItem(id: string) {
    console.log('Elimina un item del carrito con ID ' + id);
    this.cartService.removeToCart(id);
    this.cartProducts = this.cartService.items; // Actualiza la lista de productos después de eliminar
  }
}
