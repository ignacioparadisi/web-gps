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

  title = '';
  waypoints: any[] = [];
  origin: any;
  destination: any;

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
    this.title = this.route.name;
    this.origin = {
      lat: Number(this.route.points[0].latitude),
      lng: Number(this.route.points[0].longitude),
    };
    this.destination = {
      lat: Number(this.route.points[this.route.points.length - 1].latitude),
      lng: Number(this.route.points[this.route.points.length - 1].longitude),
    };
    let points = this.route.points.slice(1, -1);
    this.waypoints = points.map(point => {
      return {
        location: {
          lat: Number(point.latitude),
          lng: Number(point.longitude)
        }
      }
    });

    console.log(this.origin);
    console.log(this.destination);
    console.log(this.waypoints)
    // this.routeService.getRoute(this.route.id).subscribe(route => {
    //   this.isLoading = false;
    //   console.log(route);
    //   this.title = route.name;
    //   this.origin = {
    //     lat: Number(route.points[0].latitude),
    //     lng: Number(route.points[0].longitude),
    //   };
    //   this.destination = {
    //     lat: Number(route.points[route.points.length - 1].latitude),
    //     lng: Number(route.points[route.points.length - 1].longitude),
    //   };
    //   let points = route.points.slice(1, -1);
    //   this.waypoints = points.map(point => {
    //     return {
    //       location: {
    //         lat: Number(point.latitude),
    //         lng: Number(point.longitude)
    //       }
    //     }
    //   });

    //   console.log(this.origin);
    //   console.log(this.destination);
    //   console.log(this.waypoints)
    // }, error => {
    //   this.isLoading = false;
    //   this.showError = true;
    //   console.log(error);
    // })
  }

}
