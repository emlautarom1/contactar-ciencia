import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  experienceForm!: FormControl<{ title: string; start_date: string; end_date: string; description: string; }[]>;
  newExperienceForm!: FormGroup<{ title: FormControl<string>; start_date: FormControl<string>; end_date: FormControl<string>; description: FormControl<string>; }>;

  constructor(
    public session: SessionService,
    private fb: FormBuilder,
    private values: ValuesService,
  ) { }

  async ngOnInit() {
    let initial = this.session.currentUser;
    if (!initial) { throw Error("Null user") }

    this.workFormOptions = this.values.sciences;
    this.picturePreview = initial.pictureURL;

    this.aboutForm = this.fb.group({
      name: [initial.name],
      city: [initial.location.city],
      province: [initial.location.province],
      cover: [initial.coverLetter],
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

    this.experienceForm = this.fb.nonNullable.control([...initial.workExperience]);
    this.newExperienceForm = this.fb.nonNullable.group({
      title: [""],
      start_date: [""],
      end_date: [""],
      description: [""],
    });
  }

  onNewExperience() {
    // TODO:
    // - string->Date
    // - Nullable end_date
    let newExperience = this.newExperienceForm.getRawValue();
    let oldExperience = this.experienceForm.getRawValue()
    let updatedExperience = [newExperience, ...oldExperience];
    this.experienceForm.patchValue(updatedExperience);
    this.newExperienceForm.reset();
  }

  removeExperienceAt(index: number) {
    let experience = [...this.experienceForm.getRawValue()]
    experience.splice(index, 1);
    this.experienceForm.patchValue(experience);
  }

  onNewUrl() {
    let newUrl = this.newUrlForm.getRawValue();
    let oldUrls = this.contactForm.controls.urls.getRawValue()
    let updatedUrls = [newUrl, ...oldUrls];
    this.contactForm.controls.urls.patchValue(updatedUrls);
    this.newUrlForm.reset();
  }

  removeUrlAt(index: number) {
    let urls = [...this.contactForm.controls.urls.getRawValue()]
    urls.splice(index, 1);
    this.contactForm.controls.urls.patchValue(urls);
  }
}
