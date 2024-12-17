import { NavItem } from './nav-item/nav-item';

export const admin: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Users & Employees',
    iconName: 'solar:users-group-rounded-outline',
    route: '/users',
  },
  {
    displayName: 'Profile',
    iconName: 'solar:settings-outline',
    route: '/profile',
  },
  {
    navCap: 'Sales And Purches',
    divider: true
  },
  {
    displayName: 'POS',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/sales/pos',
  },
  {
    displayName: 'General Sales',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/sales/general-sales',
  },
  {
    displayName: 'Online Sales',
    iconName: 'solar:ticket-sale-broken',
    route: '/sales/online-sales',
  },
  {
    displayName: 'Returns',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/sales/return',
  },
  {
    displayName: 'Purchase',
    iconName: 'solar:file-text-line-duotone',
    route: '/sales/purchase-list',
  },
  {
    displayName: 'Stock',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/sales/stock',
  },
  {
    displayName: 'Damages',
    iconName: 'solar:file-text-line-duotone',
    route: '/sales/damage',
  },

  {
    navCap: 'Product Information',
    divider: true
  },

  {
    displayName: 'Products',
    iconName: 'solar:box-outline',
    route: '/product/product-lists',
  },
  {
    displayName: 'Categories & Brands',
    iconName: 'solar:clipboard-list-linear',
    route: '/product/category-brands',
  },


  {
    navCap: 'People',
    divider: true
  },
  {
    displayName: 'Customer',
    iconName: 'solar:login-3-line-duotone',
    route: '/relation/customer',
  },
  {
    displayName: 'Suplier',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/relation/supplier',
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

];
export const employee: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },

  {
    displayName: 'Profile',
    iconName: 'solar:settings-outline',
    route: '/profile',
  },
  {
    navCap: 'Sales And Purches',
    divider: true
  },
  {
    displayName: 'POS',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/sales/pos',
  },
  {
    displayName: 'Sales',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/sales/general-sales',
  },
  {
    displayName: 'Returns',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
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
  }

];
