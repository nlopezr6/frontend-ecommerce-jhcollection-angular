  import { Component, ElementRef, ViewChild } from '@angular/core';
  import { ProductService } from '../../../services/product.service';

  @Component({
    selector: 'app-carrusel',
    standalone: true,
    imports: [],
    templateUrl: './carrusel.component.html',
    styleUrl: './carrusel.component.css'
  })
  export class CarruselComponent {
    prominentProducts: any [] = []
    @ViewChild('slidesContainer', { static: false }) slidesContainer!: ElementRef;
    @ViewChild('slide', { static: false }) slide!: ElementRef;
    @ViewChild('prevButton', { static: false }) prevButton!: ElementRef;
    @ViewChild('nextButton', { static: false }) nextButton!: ElementRef;

    constructor(private productService: ProductService ) { }

    loadData(){
      this.productService.getAllProducts().subscribe
      ((data) => {
        this.prominentProducts = data.data.filter ((product:any)=>{
          return product.prominent
        }) 
        console.log(this.prominentProducts)
      })
      
    }


  ngOnInit(): void {
    this.loadData ()
   }

  ngAfterViewInit(): void {
    this.nextButton.nativeElement.addEventListener('click', () => {
      const slideWidth = this.slide.nativeElement.clientWidth;
      this.slidesContainer.nativeElement.scrollLeft += slideWidth;
    });

    this.prevButton.nativeElement.addEventListener('click', () => {
      const slideWidth = this.slide.nativeElement.clientWidth;
      this.slidesContainer.nativeElement.scrollLeft -= slideWidth;
    });

    console.log('slidesContainer:', this.slidesContainer);
    console.log('slide:', this.slide);
    console.log('prevButton:', this.prevButton);
    console.log('nextButton:', this.nextButton);
  }

}
