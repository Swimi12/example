import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface IAddItemRequestData {
  name: { ua: string; en: string };
  price: number;
  amount: number;
  description: { ua: string; en: string };
}

interface ItemResponse {
  succes: boolean;
  message: string;
}

export interface IGetItemResponse extends IAddItemRequestData {
  _id: string;
}

interface ItemRequestData {
  id: string;
}

@Injectable()
export class ProductService {
  api: string = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);

  createProduct(data: IAddItemRequestData) {
    return this.http.post<ItemResponse>(`${this.api}/items/additems`, data);
  }

  getProducts() {
    return this.http.get<IGetItemResponse[]>(`${this.api}/items/additems`);
  }

  getProduct(id: ItemRequestData) {
    console.log('id: ', id);
    return this.http.post<IGetItemResponse>(`${this.api}/items/getItem`, id);
  }

  deleteProduct(id: string) {
    return this.http.delete<ItemResponse>(`${this.api}/items/deleteItem/` + id);
  }

  updateProduct(data: IGetItemResponse) {
    return this.http.put<ItemResponse>(`${this.api}/items/updateItem`, data);
  }
}
