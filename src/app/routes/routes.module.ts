import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { MapComponent } from '../map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';


@NgModule({
  declarations: [RoutesComponent, MapComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfv3J_DFl8qNO-xgRgBGpDxas132sRE-Q'
    }),
    AgmDirectionModule
  ]
})
export class RoutesModule { }
