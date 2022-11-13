import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private session: SessionService) { }

  get currentUser$() {
    return this.session.currentUser$;
  }

  logOut() {
    this.session.logOut();
  }
}
