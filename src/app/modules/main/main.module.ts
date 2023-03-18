import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ProductService } from 'src/app/service/product.service';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from "../../pipes/search-product.pipe";

@NgModule({
    declarations: [MainComponent],
    providers: [ProductService],
    imports: [CommonModule, MainRoutingModule, FormsModule, SearchProductPipe]
})
export default class MainModule {}
