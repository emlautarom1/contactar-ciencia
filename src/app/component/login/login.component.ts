import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });
  logInFailed = false;

  constructor(
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  async onLogIn() {
    try {
      let { email, password } = this.logInForm.getRawValue();
      // TODO: Show some progress bar
      await this.session.logIn(email, password)
      this.router.navigate(["/"]);
    } catch (error) {
      // TODO: Handle invalid credentials
      console.error("LogIn failed");
      this.logInFailed = true;
    }
  }
}
