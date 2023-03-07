import { Injectable } from '@angular/core';
import { Auth, AuthErrorCodes, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, limit, query, updateDoc, where } from '@angular/fire/firestore';
import { Profile } from 'src/app/model/domain';
import { forEachToArray } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private auth: Auth,
    private store: Firestore
  ) { }

  async createProfile(name: string, phoneNumber: string, email: string, password: string) {
    try {
      let { user: { uid } } = await createUserWithEmailAndPassword(this.auth, email, password);
      let initialProfile = this.buildInitialProfile(uid, name, phoneNumber, email);

      await addDoc(collection(this.store, "profile"), initialProfile);
    } catch (error: any) {
      switch (error?.code) {
        case AuthErrorCodes.EMAIL_EXISTS: throw new Error("El email ya está en uso");
        case AuthErrorCodes.WEAK_PASSWORD: throw new Error("Contraseña muy débil");
        default: throw new Error("Error al registrarse");
      }
    };
  }

  async updateProfile(profile: Profile) {
    let querySnapshot = await getDocs(
      query(collection(this.store, "profile"),
        where("uid", "==", profile.uid), limit(1))
    );
    let queryDocumentSnapshot = forEachToArray(querySnapshot);

    await updateDoc(queryDocumentSnapshot[0].ref, { ...profile });
  }

  private buildInitialProfile(uid: string, name: string, phoneNumber: string, email: string): Profile {
    return {
      uid,
      name,
      pictureURL: "assets/avatar/placeholder.png",
      contact: { phone: phoneNumber, email, urls: [] },
      location: { city: "", province: "" },
      science: "",
      specialization: "",
      skills: [],
      coverLetter: "",
      workExperience: []
    }
  }
}
