import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  aboutForm: any;
  picturePreview: any;

  // TODO: Rewrite the science->specialization system
  workForm: any;
  workFormOptions: any;

  contactForm!: FormGroup<{ phone: FormControl<string>; urls: FormControl<string[]>; }>;
  newUrlForm!: FormControl<string>;

  experienceForm: any;
  newExperienceForm: any;

  constructor(
    public session: SessionService,
    private fb: FormBuilder,
    private values: ValuesService,
  ) { }

  ngOnInit(): void {
    let initial = this.session.profile;

    this.workFormOptions = this.values.sciences;
    this.picturePreview = initial.picture

    this.aboutForm = this.fb.group({
      name: [initial.name],
      city: [initial.location.city],
      province: [initial.location.province],
      cover: [initial.cover],
      // TODO: Handle image upload
      picture: [null],
    });

    this.workForm = this.fb.group({
      science: [null],
      specialization: [null],
      skills: [""],
    });

    this.contactForm = this.fb.nonNullable.group({
      phone: [initial.contact.phone],
      urls: [[...initial.contact.urls]]
    });
    this.newUrlForm = this.fb.nonNullable.control("");

    this.experienceForm = this.fb.control([...initial.work]);
    this.newExperienceForm = this.fb.nonNullable.group({
      title: [""],
      startDate: [""],
      endDate: [""],
      description: [""],
    });
  }

  onNewUrl() {
    let newUrl = this.newUrlForm.value;
    let oldUrls = this.contactForm.controls.urls.value
    let updatedUrls = [...oldUrls, newUrl];
    this.contactForm.controls.urls.patchValue(updatedUrls);
    this.newUrlForm.reset();
  }

  removeUrlAt(index: number) {
    let urls = [...this.contactForm.controls.urls.value]
    urls.splice(index, 1);
    this.contactForm.controls.urls.patchValue(urls);
  }
}
