import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavigation } from 'src/app/types/header-navigation.types';
import { HeaderNavigationService } from './../../../service/header-navigation.service';
import { RouterModule } from '@angular/router';
import { BurgerComponent } from '../burger/burger.component';
import { StyleDirective } from 'src/app/directive/style.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, BurgerComponent, StyleDirective],
  providers:[HeaderNavigationService]
})
export class HeaderComponent implements OnDestroy {
  navigationList: INavigation[] = [];
  isShowNavigation: boolean = false;
  isMobileMode: boolean = false;
  private readonly navigationService = inject(HeaderNavigationService);

  constructor() {
    this.navigationList = this.navigationService.navigationList;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.resize());
      this.isMobileMode = window.innerWidth < 1024;
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resize);
    }
  }

  private resize() {
    if (typeof window !== 'undefined') {
      this.isMobileMode = window.innerWidth < 1024;
      if (!this.isMobileMode) {
        this.isShowNavigation = false;
      }
    }
  }
}
