// Lien
export interface Ilink {
  icon: React.ReactNode;
  to: string;
  label: string;
  title?: string;
}

// sidebar
export interface ISidebarProps {
  links: Ilink[];
}

// callToAction
export interface ICallToActionProps {
  ctActions: Ilink[];
}

//colorCard
export interface ICardGrad {
  title: string;
  label: number | string;
  unit?: string;
  color: string;
  grad: string;
}

export interface ICardGradProps {
  cards: ICardGrad[];
}
