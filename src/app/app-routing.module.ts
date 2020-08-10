import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'routes',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
