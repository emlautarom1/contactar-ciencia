import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });
  requestSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ps: ProfileService,
  ) { }

  ngOnInit(): void { }

  async requestPasswordReset() {
    if (this.emailForm.invalid) { return }
    try {
      let { email } = this.emailForm.getRawValue();
      await this.ps.resetPassword(email);
      this.requestSent = true;
    } catch (error) {
      console.log(error);
    }
  }
}
