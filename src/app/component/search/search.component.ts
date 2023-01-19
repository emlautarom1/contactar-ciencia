import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormOptions: any;
  searchForm: any;

  constructor(
    private values: ValuesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchFormOptions = [...this.values.sciences]
    this.searchForm = this.fb.group({
      science: [null],
      specialization: [null],
    });
  }

}
