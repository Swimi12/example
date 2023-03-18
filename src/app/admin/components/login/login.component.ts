import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/types/input.types';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  form!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  errorMes: string = '';
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.auth.login(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.initForm();
          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (errorResponse) => {
          this.form.enable();
          this.readErrors(errorResponse.error.errors);
        },
      });
    }
  }

  readErrors(errors: ValidationErrors) {
    Object.keys(errors).forEach((k) => {
      this.errorMes = errors[k];
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

  private initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }
}
