import { Injectable } from '@angular/core'
import { Details } from './details'

import { Http, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ComunnicationError } from './ComunnicationError';
import { KeycloakService } from './keycloak.service'


const DetailArray: Details[] = [{ detail1: "Narcisa", detail2: "Ćeman-Hadžiomerović", selected: false },
{ detail1: "Mirza", detail2: "Hadžiomerović", selected: false },
{ detail1: "Ahmed", detail2: "Hadžiomerović", selected: false },
{ detail1: "Zejd", detail2: "Hadžiomerović", selected: false },
{ detail1: "Iman", detail2: "Hadžiomerović-?", selected: false },
{ detail1: "Mejrema", detail2: "Hadžiomerović", selected: false },
{ detail1: "Mirsad", detail2: "Hadžiomerović", selected: false },
{ detail1: "Hadija", detail2: "Ćeman", selected: false },
{ detail1: "Desto", detail2: "Ćeman", selected: false }];



@Injectable()
export class DetailService {
    /*
    getHeroesSlowly(): Promise<Hero[]> {
  return new Promise(resolve => {
    // Simulate server latency with 2 second delay
    setTimeout(() => resolve(this.getHeroes()), 2000);
  });
}
*/

    constructor(private http: Http, private keycloakservice: KeycloakService) { }


    private handleError(error: any): Promise<any> {
        console.error("Exception: ", error);
        //alert(error);
        throw new ComunnicationError();
        //return Promise.reject(error.message || error);
    }

    getDetailsFast(): Promise<Details[]> {
        return Promise.resolve(DetailArray);
    }


    getOnWait(resolve) {
        setTimeout(() => resolve(Promise.resolve(DetailArray)), 3000)
    }

    getDetailsSlow(): Promise<Details[]> {
        return new Promise(this.getOnWait);

        //return new Promise(resolve => { setTimeout(() => resolve(this.getDetailsFast()), 3000); });
    }


    getDetails(): Promise<Details[]> {

        /*this.http.get('/database/products', options)
    .map(function (res) { return res.json(); })
    .subscribe(function (prods) { return _this.products = prods; }, function (error) { return console.log(error); });*/

        let __this: any = this;

        return this.keycloakservice.getToken()
            .then(function (token) {
                var headers = new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                });
                var options = new RequestOptions({ headers: headers });

                return __this.http.get("http://localhost:8090/details", options)
                    .toPromise()
                    .then(
                    response => {
                        return response.json() as Details[];
                    })
                    .catch();
            })
            .catch(this.handleError);

    }

    getDetail(id: string): Promise<Details> {


        return this.http.get("http://localhost:8090/detail/" + id)
            .toPromise()
            .then(response => response.json() as Details)
            .catch(this.handleError);


        //return this.getDetails().then(details => details.find(detail => detail.detail1 === id));
        //return Promise.resolve(DetailArray.find(detail => detail.detail1 === id));
        //return Promise.resolve(DetailArray[0]);
    }

    getTop(count: number): Promise<Details[]> {

        /*return this.http.get("http://localhost:8090/details/" + String(count))
            .toPromise()
            .then(response => response.json() as Details[])
            .catch(
            (error) => {
                alert(error);
                this.handleError;
                return null;
            }
            );*/

        let __this: any = this;

        return this.keycloakservice.getToken()
            .then(function (token) {
                var headers = new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                });
                var options = new RequestOptions({ headers: headers });

                return __this.http.get("http://localhost:8090/details/" + String(count), options)
                    .toPromise()
                    .then(
                    response => {
                        return response.json() as Details[];
                    })
                    .catch();
            })
            .catch(this.handleError);

    }
}


