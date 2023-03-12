import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group({
    term: [""],
    science: [null as string | null],
    specialization: [null as string | null],
    location: [null as string | null]
  });
  validSciences = this.values.allSciences;
  validSpecializations$ = this.searchForm.controls.science.valueChanges.pipe(
    map(science => science ? this.values.specializationsFor(science) : [])
  );

  searchResults$ = this.route.queryParamMap.pipe(
    map(params => this.mergeParamMap(params, this.searchForm.getRawValue())),
    // TODO: This could create issues with crafted queryParams
    tap(terms => this.searchForm.patchValue(terms)),
    switchMap(terms => this.search.byTerms(terms))
  );

  constructor(
    private search: SearchService,
    private values: ValuesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.router.navigate(["/search"],
      {
        queryParams: this.searchForm.getRawValue(),
        queryParamsHandling: 'merge'
      }
    )
  }

  mergeParamMap<T extends Record<string, any>>(paramMap: ParamMap, currentValue: T) {
    let merged: { [key: string]: any } = {};
    for (let k of Object.keys(currentValue)) {
      merged[k] = paramMap.get(k) || currentValue[k]
    }
    return merged;
  }

}
