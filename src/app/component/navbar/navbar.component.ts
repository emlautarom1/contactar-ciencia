import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentProfile$ = this.session.currentProfile$;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  logOut() {
    this.session.logOut();
    this.router.navigate(["/"])
  }
}
