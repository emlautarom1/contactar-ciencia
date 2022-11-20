import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/model/profile';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _currentUser$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  profile: Profile = {
    name: "Patricia Estela Verdes",
    picture: "assets/avatar/4.webp",
    contact: {
      phone: "266-404-2222",
      email: "peverdes@unsl.edu.ar",
      urls: ["http://twitter.com/peverdes"]
    },
    location: {
      name: "San Luis",
      coordinates: { lat: -33.300, lng: -66.335 }
    },
    cience: "Agrarias, Ingenierías, Desarrollo Tecnológico y Social",
    specialization: "Ciencias Agrarias",
    skills: ["Alimentos", "Salud", "Química", "Ambiente"],
    cover: "El potencial productivo de los recursos vegetales nativos de la provincia de San Luis es valioso, ya sea por su potencial forrajero, ornamental, medicinal, industrial y/o alimenticio. El aumento de la población, la necesidad de mejorar la calidad de dieta de los habitantes y los crecientes requerimientos de biocombustibles y biomateriales, entre otros aspectos, llevan a una mayor demanda de productos agropecuarios.",
    work: Array(3).fill({ title: "Mi Proyecto", start_date: "01/2022", end_date: "08/2022", description: "Herramientas biotecnológicas para la domesticación, caracterización y desarrollo de germoplasma nativo con potencial ornamental, aromático y medicinal de la provincia de San Luis" })
  }


  constructor() { }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }

  logIn() {
    this._currentUser$.next(this.profile);
  }

  logOut() {
    this._currentUser$.next(undefined);
  }
}
