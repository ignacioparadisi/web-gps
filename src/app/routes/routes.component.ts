import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher }  from '@angular/cdk/layout';
import { AuthGuard } from 'src/resources/auth-guard';
import { Router } from '@angular/router';
import { RouteService } from 'src/services/route.service';
import { Route } from 'src/classes/route';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  selectedRoute: Route = null;
  isLoading = false;
  showError = false;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  routes = [];

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private router: Router, 
    private routeService: RouteService,
    private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log(`User: ${AuthGuard.getUser()}`);
    this.fetchRoutes();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  public goToAccount() {
    const dialogRef = this.dialog.open(AccountComponent, {
      maxWidth: '700px'
    });
  }

  public logout() {
    AuthGuard.removeUser();
    this.router.navigate(['/login']);
  }

  public fetchRoutes() {
    this.showError = false;
    this.isLoading = true;
    this.routeService.getRoutesForUser().subscribe(routes => {
      this.isLoading = false;
      this.routes = routes;
    }, error => {
      this.isLoading = false;
      this.showError = true;
    });
  }

  public didSelectRoute(route: Route) {
    this.selectedRoute = route;
  }

}
