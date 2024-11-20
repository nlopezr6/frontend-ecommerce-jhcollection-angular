import { Component } from '@angular/core';
import { CollectionService } from '../../services/collection.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.css',
})
export class CollectionListComponent {
  colecciones: any;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.collectionService.getCollections().subscribe((data) => {
      console.log(data);
      this.colecciones = data.data;
    });
  }
  editar (id:any){
    this.router.navigateByUrl ('collection/collection-edit/'+id)
    console.log('editar',id)

  }
  eliminar (id: any){
    this.collectionService.deleteCollections(id).subscribe ((data)=>{
    console.log(data);
    })
    

  }
}
