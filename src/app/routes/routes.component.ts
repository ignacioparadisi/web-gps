import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher }  from '@angular/cdk/layout';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 3}, (_, i) => `Ruta ${i + 1}`);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
