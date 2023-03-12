import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(8)]],
    phoneNumber: ["", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[\d\+\-\s_()]+/)
    ]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  signUpError = null as string | null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private ps: ProfileService,
    private session: SessionService,
    private router: Router,
  ) { }

  ngOnInit() { }

  async onSubmit() {
    if (this.signupForm.invalid) { return }

    this.isLoading = true;
    try {
      let { name, phoneNumber, email, password } = this.signupForm.getRawValue();
      await this.ps.createProfile(name, phoneNumber, email, password);
      await this.session.logIn(email, password);
      this.router.navigate(["/"]);
    } catch (error) {
      this.signUpError = (error as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}
