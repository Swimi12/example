import { Component, inject } from '@angular/core';
import {
  IGetItemResponse,
  ProductService,
} from 'src/app/service/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  list: IGetItemResponse[] = [];
  searchStr: string = '';
  loading: boolean = false;
  private readonly productService = inject(ProductService);

  constructor() {
    this.submit();
  }

  submit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('response: ', response);
        this.loading = true;
        this.list = response;
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }
}
