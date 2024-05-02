import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,CommonModule,MatTableModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

products: any[] = [];
constructor(private apollo:Apollo){}

ngOnInit() {
  this.apollo
    .watchQuery({
      query: gql`
        {
          products {
            id
            name
            quantity
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
       this.products = result.data.products;
      console.log(result);
    });
  }
}
