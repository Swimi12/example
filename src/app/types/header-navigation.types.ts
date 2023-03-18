export interface INavigation {
  link: string;
  route: NavigationRouteType;
}

export enum NavigationRouteType {
  FORM = 'form',
  HOME = '',
  CONTACTS = 'contacts',
  SHOP = 'shop',
}
