import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  aboutForm: any;
  picturePreview: any;

  // TODO: Rewrite the science->specialization system
  workForm: any;
  workFormOptions: any;

  constructor(
    public session: SessionService,
    private fb: FormBuilder,
    private values: ValuesService,
  ) { }

  ngOnInit(): void {
    let initial = this.session.profile;

    this.workFormOptions = this.values.sciences;
    this.picturePreview = initial.picture

    this.aboutForm = this.fb.group({
      name: [initial.name],
      city: [initial.location.city],
      province: [initial.location.province],
      cover: [initial.cover],
      // TODO: Handle image upload
      picture: [null],
    });

    this.workForm = this.fb.group({
      science: [null],
      specialization: [null],
      skills: [""],
    });
  }
}
