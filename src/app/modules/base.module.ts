import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [CommonModule, BaseRoutingModule, HeaderComponent],
})
export default class BaseModule {}
