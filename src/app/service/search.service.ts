import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Profile } from '../model/domain';
import { forEachToArray, groupByKey } from '../utils';

export interface SearchTerms {
  term: string,
  science: string | null,
  specialization: string | null,
  location: string,
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private store: Firestore,
  ) { }

  async findAllProfiles(): Promise<Profile[]> {
    let qs = await getDocs(query(collection(this.store, "profile")));
    let users = forEachToArray(qs).map(user => user.data() as Profile)
    return users;
  }

  async findAllProfilesByScience(): Promise<Map<string, Profile[]>> {
    let profiles = await this.findAllProfiles();
    return groupByKey(profiles, 'science');
  }

  async byTerms(terms: Partial<SearchTerms>): Promise<Profile[]> {
    // TODO: Filter by SearchTerms
    console.log("Searching...");

    let placeholder: Profile = {
      uid: "IAi43S5PogNKuCDYWGqfsYxXi273",
      name: "Patricia Estela Verdes",
      pictureURL: "https://firebasestorage.googleapis.com/v0/b/tu-entrevistadx.appspot.com/o/IAi43S5PogNKuCDYWGqfsYxXi273.jpeg?alt=media&token=c9b9139a-55ec-494f-88c7-8d801ed59984",
      contact: {
        phone: "266-404-2222",
        email: "peverdes@unsl.edu.ar",
        urls: ["http://twitter.com/peverdes"]
      },
      location: {
        city: "Merlo",
        province: "San Luis"
      },
      science: "Agrarias, Ingenierías, Desarrollo Tecnológico y Social",
      specialization: "Ciencias Agrarias",
      skills: ["Alimentos", "Salud", "Química", "Ambiente"],
      coverLetter: "El potencial productivo de los recursos vegetales nativos de la provincia de San Luis es valioso, ya sea por su potencial forrajero, ornamental, medicinal, industrial y/o alimenticio. El aumento de la población, la necesidad de mejorar la calidad de dieta de los habitantes y los crecientes requerimientos de biocombustibles y biomateriales, entre otros aspectos, llevan a una mayor demanda de productos agropecuarios.",
      workExperience: Array(5).fill({ title: "Mi Proyecto", start_date: "01/2022", end_date: "08/2022", description: "Herramientas biotecnológicas para la domesticación, caracterización y desarrollo de germoplasma nativo con potencial ornamental, aromático y medicinal de la provincia de San Luis" })
    }
    let results = Array(5).fill(placeholder);

    return results;
  }

}
