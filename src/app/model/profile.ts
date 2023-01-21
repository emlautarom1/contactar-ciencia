export interface Profile {
  name: string,
  picture: string,
  contact: {
    phone: string,
    email: string,
    urls: string[]
  },
  location: {
    city: string,
    province: string
  },
  cience: string,
  specialization: string,
  skills: string[],
  cover: string,
  work: {
    title: string,
    start_date: string,
    end_date?: string,
    description: string
  }[]
}
