import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Users',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Profile',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Sales And Purches',
    divider: true
  },
  {
    displayName: 'Sale Product',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Sales',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Returns',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Purchase',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Stock',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Damages',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  
  {
    navCap: 'Product Information',
    divider: true
  },
  {
    displayName: 'Units',
    iconName: 'solar:login-3-line-duotone',
    route: '',
  },
  {
    displayName: 'Products',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    displayName: 'Product Categories',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    displayName: 'Product Stock',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    navCap: 'People',
    divider: true
  },
  {
    displayName: 'Customer Name',
    iconName: 'solar:login-3-line-duotone',
    route: '',
  },
  {
    displayName: 'Suplier Name',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    navCap: 'Reports',
    divider: true
  },
  {
    displayName: 'Daily Report',
    iconName: 'solar:login-3-line-duotone',
    route: '',
  },
  {
    displayName: 'Profit loss report',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    displayName: 'Current Month Report',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    displayName: 'Current Year Report',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    displayName: 'Purchase Report',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '',
  },
  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },
];
