import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group({
    term: [""],
    science: [null as string | null],
    specialization: [null as string | null],
    location: [""]
  });
  validSciences = this.values.allSciences;
  validSpecializations$ = this.searchForm.controls.science.valueChanges.pipe(
    map(science => science ? this.values.specializationsFor(science) : [])
  );

  constructor(
    private route: ActivatedRoute,
    private values: ValuesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(console.log)
  }

}
