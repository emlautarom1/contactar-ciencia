import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  simpleSearch = this.fb.nonNullable.group({
    term: ["", [Validators.required]]
  });
  sciencesCounts$ = this.search.profilesByScience$.pipe(
    startWith(new Map()),
    map(groups => this.values.allSciences.map(science => {
      return {
        title: science,
        count: groups.get(science)?.length ?? 0
      }
    }))
  );

  constructor(
    private search: SearchService,
    private values: ValuesService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onSimpleSearch() {
    if (this.simpleSearch.invalid) { return };

    let { term } = this.simpleSearch.getRawValue();
    this.router.navigate(
      ["/search"],
      { queryParams: { term } }
    )
  }

}
