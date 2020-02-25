import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  role?: string;
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Main Items',
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
    },
    {
      name: 'STATISTICS',
      type: 'dropDown',
      tooltip: 'Statistics',
      icon: 'bar_chart',
      state: 'statistics',
      sub: [
        {
          type: 'link',
          name: 'TLD',
          state: 'tld',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'TEMPLATEGROUP',
          state: 'template_group',
          icon: 'bar_chart',
        },
      ],
    },
    {
      name: 'COMPOSER',
      type: 'link',
      tooltip: 'Composer',
      icon: 'build',
      state: 'composer',
    },
    {
      name: 'CAMPAIGNS',
      type: 'link',
      tooltip: 'Campaigns',
      icon: 'star',
      state: 'campaigns',
    },
    {
      name: 'DIDPOOLS',
      type: 'link',
      tooltip: 'DID Pools',
      icon: 'map',
      state: 'did_pools',
    },
    {
      name: 'MESSAGETEMPLATEGROUPS',
      type: 'link',
      tooltip: 'Message Template Group',
      icon: 'group_work',
      state: 'message_template_group',
    },
    {
      name: 'MESSAGETEMPLATES',
      type: 'link',
      tooltip: 'Message Template',
      icon: 'message',
      state: 'message_template',
    },
    {
      name: 'LEAD',
      type: 'dropDown',
      tooltip: 'Lead',
      icon: 'collections',
      state: 'lead',
      sub: [
        {
          type: 'link',
          name: 'NUMBERLOOKUP',
          state: 'number_lookup',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'LEADINFO',
          state: 'lead_info',
          icon: 'bar_chart',
        },
        {
          name: 'LEADMINING',
          type: 'link',
          icon: 'laptop_chromebook',
          state: 'mining',
        },
        {
          name: 'FILES',
          type: 'link',
          icon: 'cloud_queue',
          state: 'files',
        },
      ],
    },
    {
      name: 'SEEDNUMBERS',
      type: 'link',
      tooltip: 'Seed Number',
      icon: 'smartphone',
      state: 'seed_number',
    },
    {
      name: 'USERMANAGEMENT',
      type: 'link',
      tooltip: 'User Management',
      icon: 'group',
      state: 'users',
      role: 'admin',
    },
    {
      name: 'BILLING',
      type: 'link',
      tooltip: 'Billing',
      icon: 'attach_money',
      state: 'billing'
    },
  ];

  separatorMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
    },
    {
      name: 'STATISTICS',
      type: 'dropDown',
      tooltip: 'Statistics',
      icon: 'bar_chart',
      state: 'statistics',
      sub: [
        {
          type: 'link',
          name: 'TLD',
          state: 'tld',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'Template Group',
          state: 'template_group',
          icon: 'bar_chart',
        },
      ],
    },
    {
      name: 'COMPOSER',
      type: 'link',
      tooltip: 'Composer',
      icon: 'build',
      state: 'composer',
    },
    {
      name: 'CAMPAIGNS',
      type: 'link',
      tooltip: 'Campaigns',
      icon: 'star',
      state: 'campaigns',
    },
    {
      name: 'DIDPOOLS',
      type: 'link',
      tooltip: 'DID Pools',
      icon: 'map',
      state: 'did_pools',
    },
    {
      name: 'MESSAGETEMPLATEGROUPS',
      type: 'link',
      tooltip: 'Message Template Group',
      icon: 'group_work',
      state: 'message_template_group',
    },
    {
      name: 'MESSAGETEMPLATES',
      type: 'link',
      tooltip: 'Message Template',
      icon: 'message',
      state: 'message_template',
    },
    {
      name: 'LEAD',
      type: 'dropDown',
      tooltip: 'Lead',
      icon: 'collections',
      state: 'lead',
      sub: [
        {
          type: 'link',
          name: 'NUMBERLOOKUP',
          state: 'number_lookup',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'LEADINFO',
          state: 'lead_info',
          icon: 'bar_chart',
        },
        {
          name: 'LEADMINING',
          type: 'link',
          icon: 'laptop_chromebook',
          state: 'mining',
        },
        {
          name: 'FILES',
          type: 'link',
          icon: 'cloud_queue',
          state: 'files',
        },
      ],
    },
    {
      name: 'SEEDNUMBERS',
      type: 'link',
      tooltip: 'Seed Number',
      icon: 'smartphone',
      state: 'seed_numbers',
    },
    {
      name: 'USERMANAGEMENT',
      type: 'link',
      tooltip: 'User Management',
      icon: 'group',
      state: 'users',
      role: 'admin',
    },
    {
      name: 'BILLING',
      type: 'link',
      tooltip: 'Billing',
      icon: 'attach_money',
      state: 'billing',
      role: 'admin',
    },
  ];

  plainMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
    },
    {
      name: 'STATISTICS',
      type: 'dropDown',
      tooltip: 'Statistics',
      icon: 'bar_chart',
      state: 'statistics',
      sub: [
        {
          type: 'link',
          name: 'TLD',
          state: 'tld',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'Template Group',
          state: 'template_group',
          icon: 'bar_chart',
        },
      ],
    },
    {
      name: 'COMPOSER',
      type: 'link',
      tooltip: 'Composer',
      icon: 'build',
      state: 'composer',
    },
    {
      name: 'CAMPAIGNS',
      type: 'link',
      tooltip: 'Campaigns',
      icon: 'star',
      state: 'campaigns',
    },
    {
      name: 'DIDPOOLS',
      type: 'link',
      tooltip: 'DID Pools',
      icon: 'map',
      state: 'did_pools',
    },
    {
      name: 'MESSAGETEMPLATEGROUPS',
      type: 'link',
      tooltip: 'Message Template Group',
      icon: 'group_work',
      state: 'message_template_group',
    },
    {
      name: 'MESSAGETEMPLATES',
      type: 'link',
      tooltip: 'Message Template',
      icon: 'message',
      state: 'message_template',
    },
    {
      name: 'LEAD',
      type: 'dropDown',
      tooltip: 'Lead',
      icon: 'collections',
      state: 'lead',
      sub: [
        {
          type: 'link',
          name: 'NUMBERLOOKUP',
          state: 'number_lookup',
          icon: 'bar_chart',
        },
        {
          type: 'link',
          name: 'LEADINFO',
          state: 'lead_info',
          icon: 'bar_chart',
        },
        {
          name: 'LEADMINING',
          type: 'link',
          icon: 'laptop_chromebook',
          state: 'mining',
        },
        {
          name: 'FILES',
          type: 'link',
          icon: 'cloud_queue',
          state: 'files',
        },
      ],
    },
    {
      name: 'SEEDNUMBERS',
      type: 'link',
      tooltip: 'Seed Number',
      icon: 'smartphone',
      state: 'seed_numbers',
    },
    {
      name: 'USERMANAGEMENT',
      type: 'link',
      tooltip: 'User Management',
      icon: 'group',
      state: 'users',
      role: 'admin',
    },
    {
      name: 'BILLING',
      type: 'link',
      tooltip: 'Billing',
      icon: 'attach_money',
      state: 'billing',
      role: 'admin',
    },
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() {}

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}
