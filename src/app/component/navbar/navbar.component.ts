import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/model/domain';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentProfile$: Observable<Profile | null>;

  constructor(
    private session: SessionService,
    private router: Router
  ) {
    this.currentProfile$ = this.session.currentProfile$;
  }

  logOut() {
    this.session.logOut();
    this.router.navigate(["/"])
  }
}
