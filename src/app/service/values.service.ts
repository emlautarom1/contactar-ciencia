import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  constructor() { }

  specializationsFor(science: string): string[] {
    return this.allSpecializations[this.allSciences.indexOf(science)] || [];
  }

  allSciences = [
    "Agrarias, Ingenierías, Desarrollo Tecnológico y Social",
    "Biológía y de la Salud",
    "Exactas y Naturales",
    "Sociales y Humanidades"
  ]

  allSpecializations = [
    [
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
    ],
    [
      "Ciencias Médicas",
      "Biología",
      "Bioquímica y Biología Molecular",
      "Veterinaria",
      "Salud"
    ],
    [
      "Ciencias de la Tierra, del Agua y de la Atmósfera",
      "Matemática",
      "Física",
      "Astronomía",
      "Ciencias Químicas"
    ],
    [
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
  ];

}
