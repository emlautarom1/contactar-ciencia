import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { SearchService } from 'src/app/service/search.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sciencesCounts$: Observable<{ title: string; count: number; }[]>;

  constructor(
    private search: SearchService,
    private values: ValuesService
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

}
