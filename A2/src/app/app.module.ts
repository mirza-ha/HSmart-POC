import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, CustomErrorHandler } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail.component';
import { DetailsComponent } from './details.component';
import { DashboardComponent } from './dashboard.component'

import { DetailService } from './detail.service';

import { AppRoutingModule } from './app-routing.module'

import { HttpModule }    from '@angular/http';

import {ErrorHandler} from '@angular/core';
//import { CustomErrorHandler } from './CustomErrorHandler'
import { ErrorComponent } from './error.component'

import { MasterTableComponent } from './mastertable.component'
import { TableCell1Component } from './tablecell1.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSlideToggleModule,MatCheckboxModule} from '@angular/material';

import { KeycloakService } from './keycloak.service';
import { KeycloakComponent } from './keycloak.component';



@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    DetailsComponent,
    DashboardComponent,
    MasterTableComponent,
    TableCell1Component,
    ErrorComponent,
    KeycloakComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule, MatSlideToggleModule,MatCheckboxModule
  ],
  providers: [
    KeycloakService,
    DetailService,
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
