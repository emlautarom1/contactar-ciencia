import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  get currentUser$() {
    return this.session.currentUser$;
  }

  logOut() {
    this.session.logOut();
    this.router.navigate(["/"])
  }
}
