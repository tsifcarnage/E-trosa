// Lien
export interface Ilink {
  icon: React.ReactNode;
  to: string;
  label: string;
  title?: string;
}

// sidebar
export interface SidebarProps {
  links: Ilink[];
}

// callToAction
export interface CallToActionProps {
  ctActions: Ilink[];
}
