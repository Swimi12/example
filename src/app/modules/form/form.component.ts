import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/types/input.types';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export default class FormComponent {
  InputTypes = InputTypes;
  form!: FormGroup;
  loading: boolean = false;
  private readonly fb = inject(FormBuilder);

  constructor() {
    this.initForm();
  }

  get phones(): FormArray {
    return this.form.controls['phones'] as FormArray;
  }

  addPhone() {
    (<FormArray>this.form.controls['phones']).push(
      new FormControl('+380', Validators.required)
    );
  }

  deletePhone(i: number) {
    this.phones.removeAt(i);
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      console.log('this.form.value: ', this.form.value);
    }
  }

  // * Helpers for view
  readErrors(errors: ValidationErrors) {
    Object.keys(errors).forEach((k) => {
      this.form.controls[k.toLowerCase()].setErrors(errors[k]);
    });
    this.loading = false;
    this.form.enable();
  }

  isControlValid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  restrictedEmails(control: FormControl): { [key: string]: boolean } | null {
    if (['v@mail.ru'].includes(control.value)) {
      return { restrictedEmails: true };
    }
    return null;
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          this.patternValidator(/\d/, {
            hasNumber: true,
          }),
          this.patternValidator(/[a-z, A-Z]/, {
            hasWord: true,
          }),
          this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            hasSpecialCharacters: true,
          }),
        ]),
      ],
      phones: this.fb.array(['+380']),
    });
  }
}
