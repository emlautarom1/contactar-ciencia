import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    name: "Patricia Estela Verdes",
    picture: "assets/avatar/4.webp",
    contact: {
      phone: "266-404-2222",
      email: "peverdes@unsl.edu.ar",
      urls: ["http://twitter.com/peverdes"]
    },
    location: {
      display_name: "Merlo, San Luis",
      coordinates: { lat: -33.300, lng: -66.335 }
    },
    cience: "Agrarias, Ingenierías, Desarrollo Tecnológico y Social",
    specialization: "Ciencias Agrarias",
    skills: ["Alimentos", "Salud", "Química", "Ambiente"],
    cover: "El potencial productivo de los recursos vegetales nativos de la provincia de San Luis es valioso, ya sea por su potencial forrajero, ornamental, medicinal, industrial y/o alimenticio. El aumento de la población, la necesidad de mejorar la calidad de dieta de los habitantes y los crecientes requerimientos de biocombustibles y biomateriales, entre otros aspectos, llevan a una mayor demanda de productos agropecuarios.",
    work: Array(5).fill({ title: "Mi Proyecto", start_date: "01/2022", end_date: "08/2022", description: "Herramientas biotecnológicas para la domesticación, caracterización y desarrollo de germoplasma nativo con potencial ornamental, aromático y medicinal de la provincia de San Luis" })
  }

  constructor() { }
}
