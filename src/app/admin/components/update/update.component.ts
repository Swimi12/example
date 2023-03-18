import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/types/input.types';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IGetItemResponse,
  ProductService,
} from 'src/app/service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export default class UpdateComponent implements OnDestroy {
  form!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  id!: string | null;
  item: IGetItemResponse | undefined;
  private routeSubscription!: Subscription;
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getItem();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getItem() {
    if (this.id) {
      this.loading = true;
      this.productService.getProduct({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
          this.loading = false;
          this.initForm();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.productService.updateProduct(this.form.value).subscribe({
        next: (response) => {
          console.log('response: ', response);
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

  // * Helpers for view
  readErrors(errors: ValidationErrors) {
    Object.keys(errors).forEach((k) => {
      // this.openSnackBarErrors(errors[k]);
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
    if (this.item) {
      this.form = this.fb.group({
        id: this.id,
        nameUa: [this.item.name.ua, Validators.required],
        nameEn: [this.item.name.en, Validators.required],
        price: [this.item.price, Validators.required],
        descriptionUa: [this.item.description.ua, Validators.required],
        descriptionEn: [this.item.description.en, Validators.required],
        amount: [this.item.amount, Validators.required],
      });
    }
  }
}
