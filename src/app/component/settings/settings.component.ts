import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  aboutForm: any;

  constructor(
    public session: SessionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    let initial = this.session.profile;

    this.aboutForm = this.fb.group({
      name: [initial.name],
      city: [initial.location.city],
      province: [initial.location.province],
      cover: [initial.cover],
      // TODO: Handle image upload
      picture: [initial.picture],
    });

  }
}
