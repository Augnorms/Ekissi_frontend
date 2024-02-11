export interface HeaderProps {
  logo?: string;
  label?: string;
  navlist?: string[];
  loginoutlabel?: boolean;
  loggedUserId?: string;
  handlechangeLogout?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handlechangeDigital?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
