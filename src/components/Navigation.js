import React from 'react';

import { StyledNavigation, Cell, StyledNavLink } from 'style';

export function Navigation() {
  return (
    <StyledNavigation>
      <Cell>
        <StyledNavLink to='/' end>Home</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/currency'>Currency</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/pdf'>Pdf</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/news'>News</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/github'>Github</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/information'>Information</StyledNavLink>
      </Cell>
      <Cell>
        <StyledNavLink to='/parse'>Parse</StyledNavLink>
      </Cell>
    </StyledNavigation>
  );
}
