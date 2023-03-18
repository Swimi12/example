import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IGetItemResponse,
  ProductService,
} from 'src/app/service/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService],
})
export default class ProductComponent implements OnDestroy {
  id: string | null = null;
  item: IGetItemResponse | undefined;
  private routeSubscription!: Subscription;
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.submit();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  submit() {
    if (this.id) {
      this.productService.getProduct({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }
}
