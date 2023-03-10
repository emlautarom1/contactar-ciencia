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
  sciencesCounts$: Observable<{ title: string; count: number; }[]>;

  constructor(
    private search: SearchService,
    private values: ValuesService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    let sciences = this.values.allSciences;
    this.sciencesCounts$ = this.search.profilesByScience$.pipe(
      startWith(new Map()),
      map(groups => sciences.map(science => {
        return {
          title: science,
          count: groups.get(science)?.length ?? 0
        }
      }))
    );
  }

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
