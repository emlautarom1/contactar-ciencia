import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { Profile } from 'src/app/model/domain';
import { ProfileService } from 'src/app/service/profile.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile$: Observable<Profile | undefined> = this.route.paramMap.pipe(
    map(params => params.get('uid')!!),
    switchMap(uid => this.profile.findProfileByUid(uid)),
    catchError(() => this.router.navigate(["/404"]).then(_ => undefined))
  )

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profile: ProfileService,
  ) { }
}
