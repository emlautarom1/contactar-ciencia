import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlStatus, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  });
  logInFailed = false;

  constructor(
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onLogIn() {
    if (!this.logInForm.valid) {
      return;
    }

    let { email, password } = this.logInForm.value;
    let user = this.session.authenticate(email ?? "", password ?? "");
    if (!user) {
      this.logInFailed = true;
    } else {
      this.session.logIn(user);
      this.router.navigate(["/"]);
    }
  }
}
