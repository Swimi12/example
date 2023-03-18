import { Injectable } from '@angular/core';
import {
  INavigation,
  NavigationRouteType,
} from '../types/header-navigation.types';

@Injectable()
export class HeaderNavigationService {
  readonly navigationList: INavigation[] = [
    {
      link: 'Home',
      route: NavigationRouteType.HOME,
    },
    {
      link: 'Form',
      route: NavigationRouteType.FORM,
    },
    {
      link: 'Contacts',
      route: NavigationRouteType.CONTACTS,
    },
    {
      link: 'Shop',
      route: NavigationRouteType.SHOP,
    },
  ];
}
