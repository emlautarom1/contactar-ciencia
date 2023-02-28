import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Profile, WorkExperience } from 'src/app/model/domain';
import { PictureService } from 'src/app/service/picture.service';
import { SessionService } from 'src/app/service/session.service';
import { ValuesService } from 'src/app/service/values.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup<{
    name: FormControl<string>;
    pictureURL: FormControl<string>;
    contact: FormGroup<{
      phone: FormControl<string>;
      email: FormControl<string>;
      urls: FormControl<string[]>;
    }>;
    location: FormGroup<{
      city: FormControl<string>;
      province: FormControl<string>;
    }>;
    science: FormControl<string>;
    specialization: FormControl<string>;
    skills: FormControl<string>;
    coverLetter: FormControl<string>;
    workExperience: FormControl<WorkExperience[]>;
  }>;
  newPicture!: FormGroup<{ file: FormControl<File | null>; }>
  newURL!: FormGroup<{ url: FormControl<string>; }>;
  newWorkExperience!: FormGroup<{
    title: FormControl<string>;
    start_date: FormControl<string>;
    end_date: FormControl<string>;
    description: FormControl<string>;
  }>;

  picturePreview!: SafeResourceUrl;
  validSpecializations$!: Observable<string[]>;
  userId!: string;

  isLoading: boolean = false;
  savedChanges: boolean = false;

  constructor(
    public session: SessionService,
    public pictures: PictureService,
    public sanitizer: DomSanitizer,
    public values: ValuesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.picturePreview = "assets/avatar/placeholder.png";

    let newWorkExperience = this.fb.nonNullable.group({
      title: ["", Validators.maxLength(50)],
      start_date: [""],
      end_date: [""],
      description: [""],
    })
    this.newWorkExperience = newWorkExperience;

    let newURL = this.fb.nonNullable.group({
      url: [""]
    });
    this.newURL = newURL;

    let newPicture = this.fb.group({
      file: [null as File | null]
    });
    this.newPicture = newPicture;

    let profileForm = this.fb.nonNullable.group({
      name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      pictureURL: [""],
      contact: this.fb.nonNullable.group({
        phone: ["", [Validators.required, Validators.maxLength(50)]],
        email: ["", [Validators.required, Validators.maxLength(50)]],
        urls: [[] as string[], [Validators.maxLength(10)]]
      }),
      location: this.fb.nonNullable.group({
        city: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        province: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
      }),
      science: ["", [Validators.required, this.values.isValidScienceValidator]],
      specialization: ["", [Validators.required, this.values.isValidSpecializationValidator]],
      skills: ["", [Validators.required, this.skillsValidator({ minCount: 4, maxCount: 8, skill: { minLength: 4, maxLength: 20 } })]],
      coverLetter: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      workExperience: [[] as WorkExperience[], [Validators.maxLength(10)]]
    });
    this.profileForm = profileForm;

    this.validSpecializations$ = profileForm.controls.science.valueChanges.pipe(
      map(science => science ? this.values.specializationsFor(science) : [])
    );

    firstValueFrom(this.session.currentProfile$).then(profile => {
      if (!profile) { throw Error("Profile is null") };
      this.userId = profile.uid;
      this.picturePreview = profile.pictureURL;
      this.profileForm.patchValue({ ...profile, skills: profile.skills.join(', ') });
    });
  }

  onPictureEvent(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length < 1) { return }

    let file = files[0]
    this.newPicture.patchValue({ file });
    this.picturePreview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
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

  async onSave() {
    if (!this.profileForm.valid || this.isLoading) { return }

    this.isLoading = true;

    let newPicture = this.newPicture.controls.file.getRawValue();
    if (newPicture) {
      let pictureURL = await this.pictures.uploadPicture(this.userId, newPicture);
      this.profileForm.patchValue({ pictureURL });
    }

    let value = this.profileForm.getRawValue();
    let updatedProfile: Profile = {
      ...value,
      uid: this.userId,
      skills: value.skills.split(',').map(s => s.trim())
    };

    await this.session.updateProfile(updatedProfile);

    this.profileForm.markAsPristine();
    this.newURL.reset();
    this.newWorkExperience.reset();

    this.isLoading = false;
    this.savedChanges = true;
    setTimeout(() => this.savedChanges = false, 2000);
  }

  skillsValidator(args: { minCount?: number, maxCount?: 8, skill?: { minLength?: number, maxLength?: number } }) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || (control.value instanceof String)) {
        return { skills: "Skills are not a valid String" };
      }
      let skills = (control.value as string).split(',').map(skill => skill.trim());

      if (args.minCount && skills.length < args.minCount) {
        return { skills: `Required at least ${args.minCount} skills` }
      }

      if (args.maxCount && skills.length > args.maxCount) {
        return { skills: `Accepted at most ${args.minCount} skills` }
      }

      const minLength = args.skill?.minLength
      if (minLength && skills.some(s => s.length < minLength)) {
        return { skills: `Skill length is less than ${minLength}` }
      }

      const maxLength = args.skill?.maxLength
      if (maxLength && skills.some(s => s.length > maxLength)) {
        return { skills: `Skill length is greater than than ${maxLength}` }
      }

      return null;
    }
  }
}
