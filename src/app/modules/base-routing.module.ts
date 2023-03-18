import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'product/:id',
        loadComponent: () => import('./product/product.component'),
      },
      {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component'),
      },
      {
        path: 'form',
        loadComponent: () => import('./form/form.component'),
      },
      {
        path: '',
        loadChildren: () => import('./main/main.module'),
      },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
