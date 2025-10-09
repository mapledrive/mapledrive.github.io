import React, { useMemo } from 'react';
import { StyledBottom } from 'style';

export const Bottom = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <StyledBottom>
      ©2019-{currentYear} Maple Drive. All rights reserved.
    </StyledBottom>
  );
};
