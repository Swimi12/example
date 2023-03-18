import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';

import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../shared/auth.guard';
import { ProductService } from '../service/product.service';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@NgModule({
  declarations: [AdminComponent],
  providers: [AuthService, AuthGuard, ProductService],
  imports: [CommonModule, AdminRoutingModule, AdminHeaderComponent],
})
export default class AdminModule {}
