import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom, map, Observable } from 'rxjs';
import { WorkExperience } from 'src/app/model/domain';
import { SessionService } from 'src/app/service/session.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup<{
    name: FormControl<string | null>;
    pictureURL: FormControl<string | null>;
    contact: FormGroup<{
      phone: FormControl<string | null>;
      email: FormControl<string | null>;
      urls: FormControl<string[] | null>;
    }>;
    location: FormGroup<{
      city: FormControl<string | null>;
      province: FormControl<string | null>;
    }>;
    science: FormControl<string | null>;
    specialization: FormControl<string | null>;
    skills: FormControl<string | null>;
    coverLetter: FormControl<string | null>;
    workExperience: FormControl<WorkExperience[] | null>;
  }>;
  newURL!: FormGroup<{ url: FormControl<string>; }>;
  newWorkExperience!: FormGroup<{
    title: FormControl<string>;
    start_date: FormControl<string>;
    end_date: FormControl<string>;
    description: FormControl<string>;
  }>;

  picturePreview!: string;
  validSpecializations$!: Observable<string[]>;

  constructor(
    public session: SessionService,
    private fb: FormBuilder,
    public values: ValuesService,
  ) { }

  ngOnInit() {
    this.picturePreview = "assets/avatar/4.webp";

    let newWorkExperience = this.fb.nonNullable.group({
      title: [""],
      start_date: [""],
      end_date: [""],
      description: [""],
    })
    this.newWorkExperience = newWorkExperience;

    let newURL = this.fb.nonNullable.group({
      url: [""]
    });
    this.newURL = newURL;

    let profileForm = this.fb.group({
      name: [""],
      pictureURL: [""],
      contact: this.fb.group({
        phone: [""],
        email: [""],
        urls: [[] as string[]]
      }),
      location: this.fb.group({
        city: [""],
        province: [""]
      }),
      science: [""],
      specialization: [""],
      skills: [""],
      coverLetter: [""],
      workExperience: [[] as WorkExperience[]]
    });
    this.profileForm = profileForm;

    this.validSpecializations$ = profileForm.controls.science.valueChanges.pipe(
      map(science => science ? this.values.specializationsFor(science) : [])
    );

    firstValueFrom(this.session.currentProfile$).then(profile => {
      if (!profile) { throw Error("Profile is null") };
      this.profileForm.patchValue({ ...profile, skills: profile.skills.join(', ') });
    })
  }

  onNewWorkExperience() {
    let newExperience = this.newWorkExperience.getRawValue();
    let oldExperience = this.profileForm.controls.workExperience.getRawValue() || [];
    let workExperience = [newExperience, ...oldExperience];
    this.profileForm.patchValue({ workExperience })

    this.newWorkExperience.reset();
  }

  removeWorkExperienceAt(index: number) {
    let workExperience = [...this.profileForm.controls.workExperience.getRawValue() || []]
    workExperience.splice(index, 1);
    this.profileForm.patchValue({ workExperience });
  }

  onNewURL() {
    let newURL = this.newURL.getRawValue().url;
    let oldURLs = this.profileForm.controls.contact.controls.urls.getRawValue() || [];
    let urls = [newURL, ...oldURLs];
    this.profileForm.controls.contact.patchValue({ urls });

    this.newURL.reset();
  }

  removeUrlAt(index: number) {
    let urls = [...this.profileForm.controls.contact.controls.urls.getRawValue() || []];
    urls.splice(index, 1);
    this.profileForm.controls.contact.patchValue({ urls });
  }

  onSave() {
    // Validate changes
    // Handle profile changes in Firebase
  }
}
