import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
const CREATE_PRODUCT_MUTATION = gql`
  mutation add($prod: ProductInput){ 
    createproduct(product: $prod) {
      id
      name
      quantity
    }
  }
`;

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  id: string="";
  name: string="";
  quantity: string="";
constructor(private apollo:Apollo){}

createProduct(){
  const prod:any={id:parseInt(this.id),name:this.name,quantity:parseInt(this.quantity)};
  this.apollo.mutate({
    mutation: CREATE_PRODUCT_MUTATION,
    variables: {
     prod:prod
    }
  }).subscribe(response => {
    location.reload();
  }, error => {
   console.log(error);
  });
}
}
