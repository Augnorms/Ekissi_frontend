export interface HeaderProps {
  logo?: string;
  label?: string;
  navlist?: string[];
  loginoutlabel?: boolean;
  handlechange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
