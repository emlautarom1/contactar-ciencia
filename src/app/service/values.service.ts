import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  constructor() { }

  sciences = [
    {
      title: "Agrarias, Ingenierías, Desarrollo Tecnológico y Social",
      specializations: [
        "Ciencias Agrarias",
        "Ingeniería Civil",
        "Eléctrica",
        "Mecánica e Ingenierías Relacionadas",
        "Hábitat y Diseño",
        "Informática y Comunicaciones",
        "Ingeniería de Procesos",
        "Ingeniería y Tecnología de Materiales",
        "Ambiente y Sustentabilidad",
        "Ingeniería de Alimentos y Biotecnología"
      ]
    },
    {
      title: "Biológía y de la Salud", specializations: [
        "Ciencias Médicas",
        "Biología",
        "Bioquímica y Biología Molecular",
        "Veterinaria",
        "Salud"
      ]
    },
    {
      title: "Exactas y Naturales", specializations: [
        "Ciencias de la Tierra, del Agua y de la Atmósfera",
        "Matemática",
        "Física",
        "Astronomía",
        "Ciencias Químicas"
      ]
    },
    {
      title: "Sociales y Humanidades", specializations: [
        "Derecho, Ciencias Políticas y Relaciones Internacionales",
        "Literatura, Lingüística y Semiótica",
        "Filosofía",
        "Historia y Geografía",
        "Sociología, Comunicación Social y Demografía",
        "Economía, Ciencias de la Gestión y de la Administración Pública",
        "Psicología y Ciencias de la Educación",
        "Arqueología y Antropología Biológica",
        "Ciencias Antropológicas"
      ]
    }
  ]
}
