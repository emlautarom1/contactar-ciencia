import { Injectable, NgZone } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { collection, DocumentData, Firestore, getDocs, limit, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable, of, OperatorFunction, shareReplay, switchMap, tap } from 'rxjs';
import { Profile } from 'src/app/model/domain';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser$!: Observable<User | null>
  currentProfile$!: Observable<Profile | null>

  constructor(private auth: Auth, private store: Firestore, private ngZone: NgZone) {
    this.currentUser$ = authState(this.auth);
    this.currentProfile$ = this.currentUser$.pipe(
      switchMap(user => user ? this.fetchProfileRef(user.uid) : of(null)),
      map(snapshot => snapshot ? snapshot.data() as Profile : null),
      shareReplay(1),
    );
  }

  private fetchProfileRef(uid: string): Observable<QueryDocumentSnapshot<DocumentData>> {
    let c = collection(this.store, "profile");
    let q = query(c, where("uid", "==", uid), limit(1));
    return new Observable<QuerySnapshot<DocumentData>>(obs =>
      onSnapshot(q, obs)).pipe(
        runInZone(this.ngZone),
        map(forEachToArray),
        map(x => x[0]),
      );
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logOut() {
    await signOut(this.auth);
  }

  async updateProfile(profile: Profile) {
    let profilesRef = collection(this.store, "profile");
    let querySnapshot = await getDocs(query(profilesRef, where("uid", "==", profile.uid), limit(1)));
    let queryDocumentSnapshot = forEachToArray(querySnapshot);

    await updateDoc(queryDocumentSnapshot[0].ref, { ...profile });
  }
}

function forEachToArray<T>(arg: { forEach: (callback: (e: T) => void) => void }): T[] {
  let elements: T[] = []
  arg.forEach(e => { elements.push(e); });
  return elements;
}

export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const next = (value: T) => zone.run(() => observer.next(value));
      const error = (e: any) => zone.run(() => observer.error(e));
      const complete = () => zone.run(() => observer.complete());
      return source.subscribe({ next, error, complete });
    });
  };
}
