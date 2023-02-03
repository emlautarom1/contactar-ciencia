import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm = this.fb.nonNullable.group({
    email: ['', Validators.minLength(4)],
    password: ['', Validators.minLength(8)],
  });
  logInError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  async onLogIn() {
    this.isLoading = true;
    try {
      if (!this.logInForm.valid) { throw new Error('Invalid form') }
      let { email, password } = this.logInForm.getRawValue();
      await this.session.logIn(email, password);
      this.router.navigate(["/"]);
    } catch (error) {
      this.logInError = 'Email o contraseña incorrectos';
    } finally {
      this.isLoading = false;
    }
  }
}
