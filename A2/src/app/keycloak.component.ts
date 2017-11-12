import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'keycloak',
  template: `
    <div id="content-area" class="col-md-9" role="main">
      <div id="content">
        <h1>A2 test</h1>
        <h2><span>Products</span></h2>
        <button type="button" (click)="logout()">Sign Out</button>
        <button type="button" (click)="reloadData()">Reload</button>
        <table class="table" [hidden]="!products.length">
          <thead>
          <tr>
            <th>Product Listing</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let p of products">
            <td>{{p}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
`
})
export class KeycloakComponent {
  products: string[] = [];

  constructor(private http: Http, private kc: KeycloakService) {}

  logout() {
    this.kc.logout();
  }

  reloadData() {
    //angular dont have http interceptor yet
    this.kc.getToken()
      .then(token => {
        let headers = new Headers({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        });

        let options = new RequestOptions({ headers });

        this.http.get('http://localhost:8080/database/products', options)
          .map(res => res.json())
          .subscribe(prods => this.products = prods,
            error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}