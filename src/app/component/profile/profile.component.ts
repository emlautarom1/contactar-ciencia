import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$ = this.route.paramMap.pipe(
    map(params => params.get('uid')!!),
    switchMap(uid => this.profile.findProfileByUid(uid)),
    catchError(() => this.router.navigate(["/404"]).then(_ => undefined))
  )

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profile: ProfileService,
  ) { }

  ngOnInit(): void {
  }

}
