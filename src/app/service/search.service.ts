import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import Fuse from 'fuse.js';
import { Profile } from 'src/app/model/domain';
import { forEachToArray, groupByKey } from 'src/app/utils';

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

  async byTerms(st: Partial<SearchTerms>): Promise<Profile[]> {
    let profiles = await this.findAllProfiles();

    const limit = 20;
    const fuseOpts = {
      threshold: 0.4,
      keys: [
        "name",
        "skills",
        {
          name: "location",
          getFn: (profile: Profile) => `${profile.location.city} ${profile.location.province}`
        },
        "science",
        "specialization"
      ]
    };
    const fuse = new Fuse(profiles, fuseOpts);

    let byTerm: Fuse.Expression[] = st.term
      ? [{
        $or: [
          { name: st.term },
          { skills: st.term }
        ]
      }]
      : []

    let byLocation = st.location
      ? [{ location: st.location }]
      : []

    let byScience = st.science
      ? [{ science: st.science }]
      : []

    let bySpecialization = st.specialization
      ? [{ specialization: st.specialization }]
      : []

    let searchExpr = [byTerm, byLocation, byScience, bySpecialization].flat()

    if (searchExpr.length > 0) {
      return fuse
        .search({ $and: searchExpr }, { limit })
        .map(res => res.item)
    } else {
      return profiles.slice(0, limit)
    }
  }

}
