import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';


@NgModule({
  declarations: [RoutesComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ]
})
export class RoutesModule { }
