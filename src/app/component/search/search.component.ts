import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, shareReplay, Subscription, switchMap } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
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

  searchTerms$ = this.route.queryParamMap.pipe(
    map(params => this.mergeParamMap(params, this.searchForm.getRawValue())),
    shareReplay(1)
  );
  searchResults$ = this.searchTerms$.pipe(
    switchMap(terms => this.search.byTerms(terms))
  );

  _searchTermsSyncSub!: Subscription;

  constructor(
    private search: SearchService,
    private values: ValuesService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._searchTermsSyncSub = this.searchTerms$.subscribe(terms => {
      this.changeDetector.detectChanges();
      this.searchForm.patchValue(terms);
    });
  }

  ngOnDestroy(): void {
    this._searchTermsSyncSub.unsubscribe();
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
