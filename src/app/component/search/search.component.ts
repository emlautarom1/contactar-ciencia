import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sciences: any;

  constructor(private values: ValuesService) { }

  ngOnInit(): void {
    this.sciences = this.values.sciences;
  }

}
