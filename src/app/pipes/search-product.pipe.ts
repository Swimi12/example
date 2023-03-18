import { Pipe, PipeTransform } from '@angular/core';
import { IGetItemResponse } from '../service/product.service';

@Pipe({
  name: 'searchProduct',
  standalone: true,
})
export class SearchProductPipe implements PipeTransform {
  transform(products: IGetItemResponse[], search = ''): IGetItemResponse[] {
    if (!search.trim()) {
      return products;
    }
    return products.filter((product) => {
      return product.name.en.toLowerCase().includes(search.toLowerCase());
    });
  }
}
