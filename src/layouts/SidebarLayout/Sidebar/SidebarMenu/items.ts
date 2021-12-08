import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AgricultureTwoToneIcon from '@mui/icons-material/AgricultureTwoTone';
import AltRouteTwoToneIcon from '@mui/icons-material/AltRouteTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';


export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: TableChartTwoToneIcon
      },
      {
        name: 'Networks',
        icon: AccountTreeTwoToneIcon,
        link: '/networks'
      },
      {
        name: 'Tokens',
        icon: MonetizationOnTwoToneIcon,
        link: '/tokens'
      },
      {
        name: 'Routers',
        icon: AltRouteTwoToneIcon,
        link: '/routers'
      },
      {
        name: 'Farms',
        icon: AgricultureTwoToneIcon,
        link: '/farms'
      },
      {
        name: 'Compounders',
        icon: SmartToyTwoToneIcon,
        link: '/compounders'
      },
    ]
  },
];

export default menuItems;
