import { Component } from '@angular/core';
import { ComunnicationError } from './ComunnicationError';
import {ErrorHandler} from '@angular/core';
import { ErrorComponent } from './error.component'
import { KeycloakService } from './keycloak.service'


let generalErrorDescRoot: string = "a";


export class CustomErrorHandler extends ErrorHandler {

    constructor(){
        super(false);
    }

    public handleError(error: any): void {
        if(error.originalError instanceof ComunnicationError){
            generalErrorDescRoot = "Doslo je do unauh greske!";
            alert(error);
        } else {
            generalErrorDescRoot = "Doslo je do unauh greske!";
            alert(error);
            super.handleError(error);
        }

        //this.appComponent.setError("Nekakav error!");
    }
}



@Component({
    selector: 'app-root',
    template: `
        <h1>{{title}}</h1>
        <!--<app-error [errorDesc]="generalErrorDesc"></app-error>-->
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/details" routerLinkActive="active">Details</a>
            <a routerLink="/table" routerLinkActive="active">Table</a>
            <a routerLink="/keycloak" routerLinkActive="active">Keycloak</a>            
        </nav>
        <ul>
            <li><button type="button" (click)="logout()">Sign Out</button></li>
            <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
            <li><a routerLink="/details" routerLinkActive="active">Details</a></li>  
        </ul>

        <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css']
})




export class AppComponent {

    constructor(private kc: KeycloakService) {}

    generalErrorDesc = "Nista";

    logout() {
        this.kc.logout();
      }

    public setError(error: string)
    {
        this.generalErrorDesc = error;
    }

    title = 'Tour of details';
}