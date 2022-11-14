import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ciences: any[] = [];

  constructor(private values: ValuesService) { }

  ngOnInit(): void {
    this.ciences = this.values.sciences;
  }

}
