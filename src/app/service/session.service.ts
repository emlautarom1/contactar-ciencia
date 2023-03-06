import { Injectable, NgZone } from '@angular/core';
import { Auth, AuthErrorCodes, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { collection, DocumentData, Firestore, limit, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, where } from '@angular/fire/firestore';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Profile } from 'src/app/model/domain';
import { forEachToArray, runInZone } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser$!: Observable<User | null>
  currentProfile$!: Observable<Profile | null>

  constructor(
    private auth: Auth,
    private store: Firestore,
    private ngZone: NgZone
  ) {
    this.currentUser$ = authState(this.auth);
    this.currentProfile$ = this.currentUser$.pipe(
      switchMap(user => user ? this.fetchProfileRef(user.uid) : of(null)),
      map(snapshot => snapshot ? snapshot.data() as Profile : null),
      shareReplay(1),
    );
  }

  async logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      switch (error?.code) {
        case AuthErrorCodes.USER_DELETED: throw new Error("Email inválido");
        case AuthErrorCodes.INVALID_PASSWORD: throw new Error("Contraseña inválida");
        default: throw new Error("Error al iniciar sesión");
      }
    };
  }

  async logOut() {
    await signOut(this.auth);
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
}
