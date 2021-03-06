import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  private baseURL = "http://localhost:8080/api/v5/cart";
  private baseURL2 = "http://localhost:8080/api/v6/cartdetail";

  constructor(private httpClient: HttpClient) { }

  httpHeaders = new HttpHeaders();

  /* createCart(cart: Cart): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, cart);
  } */

  createCart(id: number) {
    return this.httpClient.post(`${this.baseURL}/${id}`, { headers: this.httpHeaders, observe: 'response'});
  }

  getCartByCustomerId(id: number) {
    return this.httpClient.get<Cart>(`${this.baseURL}/${id}`, { headers: this.httpHeaders, observe: 'response'});
  }

  addToCartDetail(cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.post(`${this.baseURL2}`, cartDetail);
  }

  getCartDetailProductList(cartId: number): Observable<CartDetail[]>{
    return this.httpClient.get<CartDetail[]>(`${this.baseURL2}/${cartId}`);
  }

  getCartDetailByCartIdAndProductId(cartId: number, productId: number) {
    return this.httpClient.get<CartDetail>(`${this.baseURL2}/${cartId}/${productId}`, { headers: this.httpHeaders, observe: 'response'});
  }

  updateCartDetailProduct(id: number, cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.put(`${this.baseURL2}/${id}`, cartDetail);
  }

  deleteCartDetailProduct(cartId: number, productId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL2}/${cartId}/${productId}`);
  }
}
