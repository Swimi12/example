import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/types/input.types';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export default class CreateComponent {
  form!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  errorMes: string = '';
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  constructor() {
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.productService.createProduct(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.loading = false;
          this.initForm();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
          this.loading = false;
          this.form.enable();
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
      nameUa: ['', Validators.required],
      nameEn: ['', Validators.required],
      price: ['', Validators.required],
      descriptionUa: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
}
