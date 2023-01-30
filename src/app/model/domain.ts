export interface Contact {
  phone: string,
  email: string,
  urls: string[]
}

export interface Location {
  city: string,
  province: string
}

export interface WorkExperience {
  title: string,
  start_date: string,
  end_date: string,
  description: string
}

export interface Profile {
  uid: string,
  name: string,
  pictureURL: string,
  contact: Contact,
  location: Location,
  science: string,
  specialization: string,
  skills: string[],
  coverLetter: string,
  workExperience: WorkExperience[];
}
