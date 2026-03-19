// Lien
export interface Ilink {
  icon: React.ReactNode;
  to: string;
  label: string;
}

// sidebar
export interface SidebarProps {
  links: Ilink[];
}
