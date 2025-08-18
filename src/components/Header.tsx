import logoUrl from 'assets/logo.png';
import { StyledHeader, Logo } from 'style';

export const Header = () => (
  <StyledHeader>
    <Logo src={logoUrl} />
  </StyledHeader>
);
