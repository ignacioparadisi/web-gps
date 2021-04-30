import { Component, Input, OnInit, OnChanges, HostListener, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  @ViewChild('googleMap') googleMap: ElementRef;
  map: google.maps.Map;

  windowSize = {
    width: 500,
    height: 500
  }

  showError = false;
  isLoading = false;

  title = '';
  mapPoints: google.maps.LatLng[] = [];
  origin: any;
  destination: any;

  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private routeService: RouteService, private ref: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.fetchRoute();
  }

  fetchRoute() {
    if (!this.route) { return }
    this.showError = false;
    this.title = this.route.name;
    const origin = {
      lat: Number(this.route.points[0].latitude),
      lng: Number(this.route.points[0].longitude),
    };
    this.origin = origin;
    const destination = {
      lat: Number(this.route.points[this.route.points.length - 1].latitude),
      lng: Number(this.route.points[this.route.points.length - 1].longitude),
    };
    let points = this.route.points.slice(1, -1);
    const waypoints = points.map(point => {
      this.mapPoints.push(new google.maps.LatLng(point.latitude, point.longitude))
      return {
        location: new google.maps.LatLng(point.latitude, point.longitude),
        stopover: false
      }
    });

    console.log(origin);
    console.log(destination);
    console.log(waypoints);
    this.createMap(origin, destination, waypoints);
  }

  createMap(origin, destination, waypoints) {
    this.map = new google.maps.Map(this.googleMap.nativeElement, {
      center: origin
    })
    this.directionsDisplay.setMap(this.map);
    this.directionsService.route({
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
      if (String(status) == "OK") {
        this.directionsDisplay.setDirections(response);
        this.ref.detectChanges();
      } else {
        this.showError = true;
      }
    });
  }

}
