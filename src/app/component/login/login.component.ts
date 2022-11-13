import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.session.logIn();
    this.router.navigate(["/"]);
  }

  logOut() {
    this.session.logOut();
    this.router.navigate(["/"]);
  }
}
