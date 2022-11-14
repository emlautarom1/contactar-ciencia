import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profile!: any

  constructor(
    private values: ValuesService,
    public session: SessionService
  ) { }

  ngOnInit(): void {
    this.profile = this.session.profile;
  }

  get sciences() {
    return this.values.sciences.map(cience => cience.title);
  }

  get specializations() {
    return this.values.sciences[0].specializations;
  }
}
