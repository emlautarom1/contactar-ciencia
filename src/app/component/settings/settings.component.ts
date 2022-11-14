import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  urls = ["http://twitter.com/peverdes"];
  work = Array(2).fill({ title: "Mi Proyecto", start_date: "01/2022", end_date: "08/2022", description: "Herramientas biotecnológicas para la domesticación, caracterización y desarrollo de germoplasma nativo con potencial ornamental, aromático y medicinal de la provincia de San Luis" })

  constructor(private values: ValuesService) { }

  ngOnInit(): void {
  }

  get sciences() {
    return this.values.ciences.map(cience => cience.title);
  }

  get specializations() {
    return this.values.ciences[0].specializations;
  }

  addUrl(url: string) {
    this.urls = [url, ...this.urls];
  }

  removeUrl(url: string) {
    this.urls = this.urls.filter(u => u != url);
  }

  removeWork(work: any) {
    this.work = this.work.filter(w => w != work);
  }
}
