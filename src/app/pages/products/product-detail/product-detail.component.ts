import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartService } from '../../../services/cart.service.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product : any;

  constructor( 
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private cartService: CartService
    
  ) {}

  get order(){
    return this.cartService.currentOrder
  }

  ngOnInit() {
    
    // this.productService.getProductById(['id']).subscribe((product) => {
      this.activateRoute.params.subscribe((data) => {
        console.log(data);
        this.productService.getProductById(data['id']).subscribe((data) => {
          console.log(data);
          this.product = data.data;
        });
      }) 
    //   console.log(product);
    // })
  }

  addToCart(item: any){
    this.cartService.addToCart(item)
  }

  addOneItem(id: any){
    this.cartService.addOneItemToCart(id)
  }

  removeOneItem(id:any){
    this.cartService.substractOneItemToCart(id)
  }

  }

