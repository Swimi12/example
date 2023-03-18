import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IGetItemResponse,
  ProductService,
} from 'src/app/service/product.service';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from 'src/app/pipes/search-product.pipe';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, SearchProductPipe],
})
export default class AdminMainComponent {
  list: IGetItemResponse[] = [];
  message: string = '';
  searchStr: string = '';
  loading: boolean = false;
  private readonly productService = inject(ProductService);

  constructor() {
    this.submit();
  }

  submit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.loading = true;
        this.list = response;
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }

  deleteItem(id: string) {
    if (id) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 2000);
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }
}
