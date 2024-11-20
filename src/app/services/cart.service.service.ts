import { Injectable } from '@angular/core';
import { Items } from '../interfaces/items';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  item! : Items;
  private shoppingCart: any = [] ;
  private localStorageKey: any = 'cart'; 
  total : number = 0;
  orderNumber: number = 0;

  constructor () {
    this.loadCartFromLocalStorage();
    this.totalPrice();
    console.log( this.shoppingCart );
    console.log(this.orderNumber)
  }

  /** Getter */
  get items() {
    return this.shoppingCart;
  }

  get currentOrder(){
    return this.orderNumber
  }

  getOrderByItemId(id: any){
     // Buscar el producto en el carrito usando su id
    const productFound = this.shoppingCart.find((productItem: any) => 
      productItem.info._id === id
    );
    this.orderNumber = productFound?.order || 0 
  }

  addToCart(product: Product) {
    // Buscar el producto en el carrito usando su id
    const productFound = this.shoppingCart.find((productItem: any) => 
      productItem.info._id === product._id
    );
  
    if (!productFound) {
      // Si no se encuentra en el carrito, se crea un nuevo item con order = 1
      this.item = {
        info: product,
        order: 1,
        total: product.price // Total inicial basado en la cantidad de 1
      };
      this.shoppingCart.push(this.item);
    } else if ( productFound.order < product.quantity ) {
      // Si el producto ya está en el carrito y no se ha alcanzado el límite, incrementar 'order'
      productFound.order += 1;
      productFound.total = productFound.order * product.price;
    } else {
      console.error('Cantidad excedida');
    }
  
    // Guardar el carrito actualizado en localStorage
    this.saveCartToLocalStorage();
    this.totalPrice();
  }
  
  removeToCart( id: any ) {
    this.shoppingCart = this.shoppingCart.filter( ( item: any ) => {
      return item.info._id !== id;
    });

    console.log( this.shoppingCart );

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  addOneItemToCart( id: any ) {
    console.log( id );

    this.shoppingCart = this.shoppingCart.map( ( item: any ) => {
      // Verifico el producto con ID que voy a modificar
      if( item.info._id === id ) {
        // Verificando que la orden no sea CERO & que haya un Stock disponible
        if( item.order !== 0 && item.info.quantity ) {
          item.order += 1;
          item.total = item.info.price * item.order;
          this.orderNumber = item.order
        }
      }

      return item;
    });

    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  substractOneItemToCart( id: any ) {
    console.log( id );

    this.shoppingCart = this.shoppingCart.map( ( item: any ) => {
      // Verifico el producto con ID que voy a modificar
      if( item.info._id === id ) {
        // Verificando que la orden no sea CERO & que haya un Stock disponible
        if( item.order !== 0 && item.info.quantity ) {
          item.order -= 1;
          item.total = item.info.price * item.order;
          this.orderNumber = item.order
        }
      }

      return item;
    })
    .filter( ( item: any ) => { 
      return item.order > 0;
    } );

    
    this.saveCartToLocalStorage();
    this.totalPrice();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem( 
      this.localStorageKey, 
      JSON.stringify( this.shoppingCart ) 
    );
  }

  private loadCartFromLocalStorage() {

    if( localStorage.getItem( this.localStorageKey ) ) {
      this.shoppingCart = JSON.parse( localStorage.getItem( this.localStorageKey ) ! )
    }
    else {
      this.shoppingCart = []
    }
  }

  totalPrice() {
    const prices = this.shoppingCart.map( ( item: any ) => {
      return item.total;
    });

    console.log( prices );

    this.total = prices.reduce( ( acc: number, current: number ) => {
      return acc + current;
    }, 0 );

  }
}


  


