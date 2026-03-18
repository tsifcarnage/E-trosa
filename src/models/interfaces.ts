// Lien
export interface Ilink {
  icon: React.ReactNode;
  to: string;
}

// sidebar
export interface SidebarProps {
  links: Ilink[];
}