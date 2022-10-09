import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { catchError, map, of, shareReplay } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  apiStatus$: any;
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true
  };

  constructor(httpClient: HttpClient, private geocoder: MapGeocoder) {
    const apiKey = "";
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    this.apiStatus$ = httpClient.jsonp(url, 'callback')
      .pipe(
        map(() => true),
        catchError((err) => {
          console.log(err);
          return of(false);
        }),
        shareReplay()
      );
  }

}
