export interface NavItem {
  label: string
  icon: string
  to: string
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/',
  },
  {
    label: 'Work',
    icon: 'pi pi-briefcase',
    to: '/work',
  },
  {
    label: 'About',
    icon: 'pi pi-user',
    to: '/about',
  },
]
