import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, limit, query, updateDoc, where } from '@angular/fire/firestore';
import { Profile } from 'src/app/model/domain';
import { forEachToArray } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private store: Firestore
  ) { }

  async updateProfile(profile: Profile) {
    let profilesRef = collection(this.store, "profile");
    let querySnapshot = await getDocs(query(profilesRef, where("uid", "==", profile.uid), limit(1)));
    let queryDocumentSnapshot = forEachToArray(querySnapshot);

    await updateDoc(queryDocumentSnapshot[0].ref, { ...profile });
  }
}
