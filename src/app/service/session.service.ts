import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { collection, Firestore, getDocs, limit, query, where } from '@angular/fire/firestore';
import { from, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Profile } from 'src/app/model/domain';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser$: Observable<User | null>
  currentProfile$: Observable<Profile | null>

  constructor(private auth: Auth, private store: Firestore) {
    this.currentUser$ = authState(this.auth);
    this.currentProfile$ = this.currentUser$.pipe(
      switchMap(user => user ? from(this.fetchProfileByUserId(user.uid)) : of(null)),
      shareReplay(1)
    );
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logOut() {
    await signOut(this.auth);
  }

  async fetchProfileByUserId(uid: string): Promise<Profile | null> {
    let profilesRef = collection(this.store, "profile");
    let querySnapshot = await getDocs(query(profilesRef, where("uid", "==", uid), limit(1)));
    let profiles: Profile[] = [];
    querySnapshot.forEach(doc => profiles.push(doc.data() as Profile));

    return profiles[0];
  }
}
