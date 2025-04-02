import { Component, OnInit, OnDestroy, inject,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './app-personal-info/app-personal-info.component';
import { AppContactInfoComponent } from './app-contact-info/app-contact-info.component';
import { AppPermanentAddressComponent } from './app-permanent-address/app-permanent-address.component';


@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,PersonalInfoComponent,AppContactInfoComponent,AppPermanentAddressComponent ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  applicationForm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
    this.setupAddressSync();
    this.loadSavedData();
    this.setupFormSave();
    this.setupCheckboxListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicationForm']) {
      this.syncAddress();
    }
  }

  private setupCheckboxListener(): void {
    const sameAsCurrentControl = this.applicationForm.get('contactInfo.sameAsCurrent');
    sameAsCurrentControl?.valueChanges.subscribe(() => {
      this.syncAddress();
    });
  }

  syncAddress(): void {
    const sameAsCurrent = this.applicationForm.get('contactInfo.sameAsCurrent')?.value;
    const currentAddress = this.applicationForm.get('contactInfo.currentAddress')?.value;
    const permanentAddressGroup = this.applicationForm.get('permanentAddress');

    if (sameAsCurrent) {
      permanentAddressGroup?.patchValue(currentAddress);
      permanentAddressGroup?.disable();
    } else {
      permanentAddressGroup?.enable();
      permanentAddressGroup?.reset();
    }
  }

  private setupFormSave(): void {
    this.applicationForm.valueChanges.subscribe(() => {
      const formData = this.applicationForm.getRawValue();
      localStorage.setItem('applicationForm', JSON.stringify(formData));
  });
  }
  private loadSavedData():void   
  {
    const savedData = localStorage.getItem('applicationForm');
    if (savedData && this.applicationForm) {
      const rawData = JSON.parse(savedData);
      this.enableAllControls(this.applicationForm);
      this.applicationForm.patchValue(rawData);
  }
  }
  private enableAllControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.enableAllControls(control);
      } else {
        control?.enable({ emitEvent:false});
      }
    });
  }
  private initializeForm(): void {
    this.applicationForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        nationality: [''],
        fatherName: [''],
        motherName: ['']
      }),
      contactInfo: this.fb.group({
        currentAddress: this.fb.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required]
        }),
        primaryContact: [''],
        email: [''],
        sameAsCurrent: [false]
      }),
      permanentAddress: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      extracurricular: this.fb.group({
        hobbies: ['',Validators.required]
      })
    });
  }

  private setupAddressSync(): void {
    this.applicationForm.get('contactInfo.sameAsCurrent')?.valueChanges.subscribe(checked => {
      const permanentAddressGroup = this.applicationForm.get('permanentAddress');
      const currentAddress = this.applicationForm.get('contactInfo.currentAddress')?.value;
      
      if (checked && permanentAddressGroup) {
        permanentAddressGroup.patchValue(currentAddress);
        permanentAddressGroup.disable();
      } else if (permanentAddressGroup) {
        permanentAddressGroup.enable();
        permanentAddressGroup.reset(); 
      }
    });
  }

  onSubmit(): void {
    // Enable permanent address before validation
    this.applicationForm.get('permanentAddress')?.enable();
  
    // Mark all controls as touched to show validation errors
    this.applicationForm.markAllAsTouched();
  
    if (this.applicationForm.valid) {
      localStorage.setItem('applicationData', JSON.stringify(this.applicationForm.value));
      this.router.navigate(['/preview']);
    } else {
      const invalidFields = this.getInvalidFields();
      const fieldNames = this.mapFieldNames(invalidFields);
      alert(`Please complete these required fields:\n\n${fieldNames.join('\n')}`);
    }
  }

  private mapFieldNames(fields: string[]): string[] {
    const fieldMap: {[key: string]: string} = {
      'personalInfo.fullName': 'Full Name',
      'personalInfo.dob': 'Date of Birth',
      'personalInfo.gender': 'Gender',
      'contactInfo.currentAddress.address': 'Current Address - Street',
      'contactInfo.permanentAddress.address': 'Permanent Address - Street',
      'contactInfo.currentAddress.city': 'Current Address - City',
      'contactInfo.permanentAddress.city': 'Permanent Address - City',
      'contactInfo.currentAddress.state': 'Current Address - State',
      'contactInfo.permanentAddress.state': 'Permanent Address - State',
      'contactInfo.currentAddress.postalCode': 'Current Address - Postal Code',
      'contactInfo.permanentAddress.postalCode': 'Permanent Address - Postal Code',
      'contactInfo.currentAddress.country': 'Current Address - Country',
      'contactInfo.permanentAddress.country': 'CurrePermanentnt Address - Country',
      'extracurricular.hobbies': 'Hobbies'
    };
  
    return fields.map(field => fieldMap[field] || field);
  }

  ngOnDestroy(): void {
    console.log("Form Component Destroyed");
  }

  get personalInfo() {
    return this.applicationForm.get('personalInfo') as FormGroup;
  }
  
  get personalInfoGroup(): FormGroup {
    return this.applicationForm.get('personalInfo')! as FormGroup;
  }
  
  get contactInfoGroup(): FormGroup {
    return this.applicationForm.get('contactInfo')! as FormGroup;
  }
  
  get permanentAddressGroup(): FormGroup {
    return this.applicationForm.get('permanentAddress')! as FormGroup;
  }
  get extracurricularGroup(): FormGroup {
    return this.applicationForm.get('extracurricular')! as FormGroup;
  }

  get fullName() { return this.personalInfo.get('fullName'); }
  get dob() { return this.personalInfo.get('dob'); }
  get gender() { return this.personalInfo.get('gender'); }
  get nationality() { return this.personalInfo.get('nationality'); }
  get fatherName() { return this.personalInfo.get('fatherName'); }
  get motherName() { return this.personalInfo.get('motherName'); }

  getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    
    const traverseControls = (controls: any, path: string = '') => {
      Object.keys(controls).forEach(key => {
        const control = controls[key];
        const newPath = path ? `${path}.${key}` : key;
        
        if (control instanceof FormGroup) {
          traverseControls(control.controls, newPath);
        } else {
          // Only show fields with Validators.required that are empty
          if (control.hasError('required') && (control.value === null || control.value === '')) {
            invalidFields.push(newPath);
          }
        }
      });
    };
  
    traverseControls(this.applicationForm.controls);
    return invalidFields;
  }
}
