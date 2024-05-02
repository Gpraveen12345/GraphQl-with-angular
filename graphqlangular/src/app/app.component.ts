import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductComponent,ProductCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'graphqlangular';

  
}
