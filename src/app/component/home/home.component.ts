import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sciences: string[];

  constructor(private values: ValuesService) {
    this.sciences = this.values.allSciences;
  }

  ngOnInit(): void { }

}
