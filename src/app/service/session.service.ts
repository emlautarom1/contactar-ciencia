import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, Firestore, getDocs, limit, query, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/model/domain';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _currentUser$ = new BehaviorSubject<Profile | null>(null);

  constructor(private auth: Auth, private store: Firestore) { }

  get currentUser$(): Observable<Profile | null> {
    return this._currentUser$.asObservable();
  }

  get currentUser(): Profile | null {
    return this._currentUser$.value
  }

  async logIn(email: string, password: string): Promise<Profile> {
    let credentials = await signInWithEmailAndPassword(this.auth, email, password);
    let profilesRef = collection(this.store, "profile");
    let querySnapshot = await getDocs(query(profilesRef, where("uid", "==", credentials.user.uid), limit(1)));
    let profiles: Profile[] = []
    querySnapshot.forEach(doc => profiles.push(doc.data() as Profile));
    let loggedProfile = profiles[0];
    this._currentUser$.next(loggedProfile);
    return loggedProfile;
  }

  async logOut() {
    await signOut(this.auth);
    this._currentUser$.next(null)
  }
}
