import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail.component';
import { DetailsComponent } from './details.component';
import { DashboardComponent } from './dashboard.component'
import { MasterTableComponent } from './mastertable.component'
import { KeycloakComponent } from './keycloak.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'table',
    component: MasterTableComponent
  },
  {
    path: 'keycloak',
    component: KeycloakComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
