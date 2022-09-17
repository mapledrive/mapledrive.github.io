import React from 'react';
import logoUrl from 'logo.png';
import { StyledHeader, Logo } from 'style';

export const Header = () => (
  <StyledHeader>
    <Logo src={logoUrl} />
  </StyledHeader>
);
