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
    return this.values.ciences.map(cience => cience.title);
  }

  get specializations() {
    return this.values.ciences[0].specializations;
  }

  addUrl(url: string) {
    this.profile.urls = [url, ...this.profile.urls];
  }

  removeUrl(url: string) {
    this.profile.urls = this.profile.urls.filter((u: any) => u != url);
  }

  removeWork(work: any) {
    this.profile.work = this.profile.work.filter((w: any) => w != work);
  }
}
