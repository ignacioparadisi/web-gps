import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Route } from 'src/classes/route';
import { RouteService } from 'src/services/route.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input()
  route: Route

  showError = false;
  isLoading = false;

  constructor(private routeService: RouteService) { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.fetchRoute();
  }

  fetchRoute() {
    if (!this.route) { return }
    this.isLoading = true;
    this.showError = false;
    this.routeService.getRoute(this.route.id).subscribe(route => {
      this.isLoading = false;
      console.log(route);
    }, error => {
      this.isLoading = false;
      this.showError = true;
      console.log(error);
    })
  }

}
