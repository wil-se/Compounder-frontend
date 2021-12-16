import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AgricultureTwoToneIcon from '@mui/icons-material/AgricultureTwoTone';
import AltRouteTwoToneIcon from '@mui/icons-material/AltRouteTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import WavesTwoToneIcon from '@mui/icons-material/WavesTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';


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
        name: 'User',
        icon: AccountCircleTwoToneIcon,
        link: '/profile',
        items: [
          {
            name: 'Details',
            link: '/profile/details'
          },
          {
            name: 'Settings',
            link: '/profile/settings'
          }
        ]
      },
      {
        name: 'Compounders',
        icon: SmartToyTwoToneIcon,
        link: '/compounders',
        items: [
          {
            name: 'Settings',
            link: '/compounders/settings'
          },
          {
            name: 'Instances',
            link: '/compounders/instances'
          }
        ]
      },
      {
        name: 'Pools',
        icon: WavesTwoToneIcon,
        link: '/pools'
      },
      {
        name: 'Farms',
        icon: AgricultureTwoToneIcon,
        link: '/farms'
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
        name: 'Networks',
        icon: AccountTreeTwoToneIcon,
        link: '/networks'
      },
    ]
  },

];

export default menuItems;
