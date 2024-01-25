import * as Image from "assets/images";

export interface IMenu {
  icon: any;
  text: string;
  route: string;
}

export const publicMenu : IMenu[] = [
  {
    icon: Image.dashboardIcon,
    text: 'Dashboard',
    route: '/dashboard'    
  }
]

export const adminMenu : IMenu[] = [
  {
    icon: Image.bookingIcon,
    text: 'Booking',
    route: '/admin/booking'    
  },
  {
    icon: Image.iconPackage,
    text: 'Packages',
    route: '/admin/packages'    
  },
  {
    icon: Image.locationIcon,
    text: 'Venue',
    route: '/admin/venue'    
  },
  {
    icon: Image.iconCatering,
    text: 'Catering',
    route: '/admin/catering'    
  },
  {
    icon: Image.iconPhotography,
    text: 'Photography',
    route: '/admin/photography'    
  },
  {
    icon: Image.iconDecoration,
    text: 'Decoration',
    route: '/admin/decoration'    
  },
  {
    icon: Image.rolesIcon,
    text: 'User',
    route: '/admin/users'    
  },
]
