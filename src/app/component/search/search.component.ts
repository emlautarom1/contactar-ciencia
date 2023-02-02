import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup<{
    science: FormControl<string | null>;
    specialization: FormControl<string | null>;
  }>;
  validSciences!: string[];
  validSpecializations$!: Observable<string[]>;

  constructor(
    private values: ValuesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      science: [null as string | null],
      specialization: [null as string | null],
    });
    this.validSciences = this.values.allSciences;
    this.validSpecializations$ = this.searchForm.controls.science.valueChanges.pipe(
      map(science => science ? this.values.specializationsFor(science) : [])
    );
  }

}
