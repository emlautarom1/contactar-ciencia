import { Injectable, NgZone } from '@angular/core';
import { collection, DocumentData, Firestore, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map, Observable, shareReplay } from 'rxjs';
import { Profile } from '../model/domain';
import { forEachToArray, groupByKey, runInZone } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private allUsers$ = this.allUsers().pipe(shareReplay(1));

  allProfiles$: Observable<Profile[]> = this.allUsers$.pipe(
    map(users => users.map(user => user.data() as Profile))
  );
  profilesByScience$: Observable<Map<string, Profile[]>> = this.allProfiles$.pipe(
    map(profiles => groupByKey(profiles, "science"))
  );

  constructor(
    private store: Firestore,
    private ngZone: NgZone,
  ) { }

  private allUsers(): Observable<QueryDocumentSnapshot<DocumentData>[]> {
    let allUsers = query(collection(this.store, "profile"));
    return new Observable<QuerySnapshot<DocumentData>>(obs =>
      onSnapshot(allUsers, obs)).pipe(
        runInZone(this.ngZone),
        map(forEachToArray),
      );
  }
}
